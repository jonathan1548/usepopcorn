import { useEffect, useState } from "react";

export function useLocalStorageState(initialState,Key) {
    const [value, setValue] = useState(function () {
    const stored = localStorage.getItem(Key);
    return stored ? JSON.parse(stored) : initialState;
  });

    useEffect(
    function () {
      localStorage.setItem(Key, JSON.stringify(value));
    },
    [value, Key]
  );
  return [value, setValue];
}