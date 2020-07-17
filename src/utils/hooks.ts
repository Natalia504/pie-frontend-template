import { useEffect } from "react";

export const useMount = (
  mountFunction: () => void,
  cleanupFunction?: () => void
): void => {
  useEffect(() => {
    mountFunction();
    return cleanupFunction && cleanupFunction();
  }, []); /* eslint-disable-line react-hooks/exhaustive-deps */
};
