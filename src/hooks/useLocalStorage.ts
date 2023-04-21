import React, { useEffect } from "react";

export function useLocalStorage<T>(
  key: string,
  value: T,
  handleLoad: (data: T) => void,
  deps: React.DependencyList
) {
  useEffect((): void => {
    try {
      const dataFromLocalStorage = localStorage.getItem(key);

      if (dataFromLocalStorage) {
        const parsedDataFromLocalStorage = JSON.parse(dataFromLocalStorage);
        if (parsedDataFromLocalStorage) {
          handleLoad(parsedDataFromLocalStorage);
        }
      }
    } catch (e) {
      console.warn(`Error reading localStorage value ${key}: `, e);
    }
  }, []);

  useEffect(() => {
    if (value) {
      localStorage.setItem(key, JSON.stringify(value));
    }
  }, deps);
}
