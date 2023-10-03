/* eslint-disable operator-linebreak */
import { useEffect } from "react";
import useAnimatedList from "../../../hooks/useAnimatedList";
import { toastEventManager } from "../../../utils/toast";
import ToastMessage from "../ToastMessage";
import { Container } from "./styles";

export function ToastContainer() {
  const { handleRemoveItem, setItems, renderList } = useAnimatedList();

  useEffect(() => {
    function handleAddToast({ type, text, duration }) {
      setItems((prevState) => [
        ...prevState,
        { id: Math.random(), type, text, duration },
      ]);
    }

    toastEventManager.on("addtoast", handleAddToast);

    return () => {
      toastEventManager.removeListener("addtoast", handleAddToast);
    };
  }, [setItems]);

  return (
    <Container>
      {renderList((message, { isLeaving, animatedRef }) => (
        <ToastMessage
          key={message.id}
          message={message}
          onRemoveMessage={handleRemoveItem}
          isLeaving={isLeaving}
          animatedRef={animatedRef}
        />
      ))}
    </Container>
  );
}
