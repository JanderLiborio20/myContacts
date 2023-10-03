import { useCallback, useEffect, useImperativeHandle, useState } from "react";
import useSafeAsyncState from "../../hooks/useSafeAsyncState";

import useErrors from "../../hooks/useErrors";
import CategoriesService from "../../services/CategoriesService";
import formatPhone from "../../utils/formatPhone";
import isEmailValid from "../../utils/isEmailValid";

export function useContactForm(onSubmit, ref) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [categories, setCategories] = useSafeAsyncState([]);
  const [isLoadingCategories, setIsLoadingCategories] = useSafeAsyncState(true);
  const [isSubmittin, setIsSubmittin] = useState(false);

  const { errors, setError, removeError, getErrorMessageByField } = useErrors();

  const isFormVAlid = name && errors.length === 0;

  const loadCategories = useCallback(
    async (signal) => {
      try {
        const categoriesList = await CategoriesService.listCategories(signal);

        setCategories(categoriesList);
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") {
          return;
        }
      } finally {
        setIsLoadingCategories(false);
      }
    },
    [setCategories, setIsLoadingCategories]
  );

  useEffect(() => {
    const controler = new AbortController();

    loadCategories(controler.signal);

    return () => {
      controler.abort();
    };
  }, [loadCategories]);

  useImperativeHandle(
    ref,
    () => ({
      setFieldsValues: (contact) => {
        setName(contact?.name);
        setEmail(contact?.email ?? "");
        setPhone(formatPhone(contact?.phone ?? ""));
        setCategoryId(contact?.category.id ?? "");
      },

      resetFields: () => {
        setName("");
        setEmail("");
        setPhone("");
        setCategoryId("");
      },
    }),
    []
  );

  function handeleNameChange(event) {
    setName(event.target.value);

    if (!event.target.value) {
      setError({
        field: "name",
        message: "Nome é obrigatório",
      });
    } else {
      removeError("name");
    }
  }

  function handleEmailChange(event) {
    setEmail(event.target.value);

    if (event.target.value && !isEmailValid(event.target.value)) {
      setError({
        field: "email",
        message: "E-mail inválido",
      });
    } else {
      removeError("email");
    }
  }

  function handlePhoneChange(event) {
    setPhone(formatPhone(event.target.value));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setIsSubmittin(true);

    await onSubmit({
      name,
      email,
      phone,
      categoryId,
    });

    setIsSubmittin(false);
  }

  return {
    handleSubmit,
    getErrorMessageByField,
    handeleNameChange,
    handleEmailChange,
    handlePhoneChange,
    setCategoryId,
    name,
    email,
    isSubmittin,
    categories,
    isFormVAlid,
    phone,
    isLoadingCategories,
    categoryId,
  };
}
