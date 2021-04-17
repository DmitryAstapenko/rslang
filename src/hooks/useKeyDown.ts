/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from "react";

const useKeyDown = (key: string, callBack: (e: any) => void): void => {
  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      if (event.code === key) {
        event.preventDefault();
        callBack(event);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  });
};
export default useKeyDown;
