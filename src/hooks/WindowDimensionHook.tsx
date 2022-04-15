import { useState, useEffect } from "react";

export const useWindowDimensions = () => {
  const hasWindow = typeof window !== "undefined";

  const getWindowDimensions = () => {
    const width = hasWindow ? window.innerWidth : 0;
    const height = hasWindow ? window.innerHeight : 0;
    return {
      width,
      height
    };
  };

  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

  useEffect(() => {
    if (hasWindow) {
      window.addEventListener("resize", () => {
        setWindowDimensions(getWindowDimensions());
      });
      return () =>
        window.removeEventListener("resize", () => {
          setWindowDimensions(getWindowDimensions());
        });
    }
  }, [hasWindow]);

  return windowDimensions;
};