/* eslint-disable object-curly-newline */
/* eslint-disable operator-linebreak */
import { createRef, useCallback, useEffect, useRef, useState } from "react";

export default function useAnimatedList(initialValue = []) {
  const [items, setItems] = useState([]);
  const [pendingRemovalItemsId, setPendingRemovalItemsId] =
    useState(initialValue);

  const animatedRefs = useRef(new Map());
  const animationEndListeners = useRef(new Map());

  const handleRemoveItem = useCallback((id) => {
    setPendingRemovalItemsId((prevState) => [...prevState, id]);
  }, []);

  const handleAnimationEnd = useCallback((id) => {
    const removeListener = animationEndListeners.current.get(id);
    removeListener();

    animationEndListeners.current.delete(id);
    animatedRefs.current.delete(id);

    setItems((prevState) => prevState.filter((item) => item.id !== id));
    setPendingRemovalItemsId((prevState) =>
      prevState.filter((itemId) => itemId !== id)
    );
  }, []);

  useEffect(() => {
    pendingRemovalItemsId.forEach((itemId) => {
      const animatedRef = animatedRefs.current.get(itemId);
      const alreadyHasListener = animationEndListeners.current.has(itemId);
      const animatedElement = animatedRef?.current;

      if (animatedElement && !alreadyHasListener) {
        const onAnimationEnd = () => handleAnimationEnd(itemId);
        const removeListener = () => {
          animatedElement.removeEventListener("animationend", onAnimationEnd);
        };

        animatedElement.addEventListener("animationend", onAnimationEnd);

        animationEndListeners.current.set(itemId, removeListener);
      }
    });
  }, [pendingRemovalItemsId, handleAnimationEnd]);

  useEffect(() => {
    const removeEventListener = animationEndListeners.current;

    return () => {
      removeEventListener.forEach((removeListener) => removeListener());
    };
  }, []);

  const getAnimatedRef = useCallback((itemId) => {
    let animatedRef = animatedRefs.current.get(itemId);

    if (!animatedRef) {
      animatedRef = createRef();

      animatedRefs.current.set(itemId, animatedRef);
    }

    return animatedRef;
  }, []);

  const renderList = useCallback(
    (renderItem) =>
      items.map((item) => {
        const isLeaving = pendingRemovalItemsId.includes(item.id);

        const animatedRef = getAnimatedRef(item.id);

        return renderItem(item, { isLeaving, animatedRef });
      }),
    [getAnimatedRef, items, pendingRemovalItemsId]
  );

  return {
    items,
    setItems,
    handleRemoveItem,
    renderList,
  };
}
