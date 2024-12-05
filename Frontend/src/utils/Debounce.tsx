import { useState, useEffect, useRef, useCallback } from "react";
const useDebounce = (value: string, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  const handler = useRef(null);
  const debouncedSet = useCallback(
    (newValue: string) => {
      if (handler.current) {
        clearTimeout(handler.current);
      }
      //@ts-ignore
      handler.current = setTimeout(() => {
        setDebouncedValue(newValue);
      }, delay);
    },
    [delay]
  );
  useEffect(() => {
    debouncedSet(value);
    return () => {
      if (handler.current) {
        clearTimeout(handler.current);
      }
    };
  }, [value, debouncedSet]);
  return debouncedValue;
};

export default useDebounce;
