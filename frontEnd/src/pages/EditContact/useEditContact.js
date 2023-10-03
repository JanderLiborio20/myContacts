import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useSafeAsyncAction from "../../hooks/useSafeAsyncAction";
import ContactsService from "../../services/ContactsService";
import toast from "../../utils/toast";

export function useEditContact() {
  const [isLoading, setIsLoading] = useState(true);
  const [contactName, setContactName] = useState("");
  const contactFormRef = useRef(null);

  const { id } = useParams();
  const navigate = useNavigate();
  const safeAsyncAction = useSafeAsyncAction();

  useEffect(() => {
    const controler = new AbortController();

    async function loadContact() {
      try {
        const contact = await ContactsService.getContactById(
          id,
          controler.signal
        );

        safeAsyncAction(() => {
          setContactName(contact?.name);

          contactFormRef.current.setFieldsValues(contact);

          setIsLoading(false);
        });
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") {
          return;
        }

        safeAsyncAction(() => {
          navigate("/", { replace: true });

          toast({
            type: "danger",
            text: "Ocorreu um erro ao buscar contato!",
          });
        });
      }
    }

    loadContact();

    return () => {
      controler.abort();
    };
  }, [id, navigate, safeAsyncAction]);

  async function handleSubmit(contact) {
    try {
      const contactData = await ContactsService.updateContact(id, contact);

      setContactName(contactData?.name);

      toast({
        type: "success",
        text: "Contato editado com sucesso!",
      });
    } catch {
      toast({
        type: "danger",
        text: "Ocorreu um erro ao editar o contato!",
      });
    }
  }
  return {
    isLoading,
    contactName,
    contactFormRef,
    handleSubmit,
  };
}
