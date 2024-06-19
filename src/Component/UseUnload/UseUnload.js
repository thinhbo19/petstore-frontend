// useUnload.js
import { useEffect } from "react";

const useUnload = (fn) => {
  useEffect(() => {
    const handleBeforeUnload = (event) => {
      const returnValue = fn(event);
      if (returnValue) {
        event.preventDefault();
        event.returnValue = returnValue;
      }
      return returnValue;
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [fn]);
};

export default useUnload;
