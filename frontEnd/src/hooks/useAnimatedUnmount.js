import { useEffect, useRef, useState } from "react";

export default function useAnimatedUnmount(visible) {
  const [shouldRender, setShouldRender] = useState(visible);

  const animatedElementRed = useRef(null);

  useEffect(() => {
    if (visible) {
      setShouldRender(true);
    }

    function handleAnimationEnd() {
      setShouldRender(false);
    }

    const elementRef = animatedElementRed.current;

    if (!visible && elementRef) {
      elementRef.addEventListener("animationend", handleAnimationEnd);
    }

    return () => {
      if (elementRef) {
        elementRef.removeEventListener("animationend", handleAnimationEnd);
      }
    };
  }, [visible]);

  return {
    shouldRender,
    animatedElementRed,
  };
}
