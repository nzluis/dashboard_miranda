import { useReducer } from "react";
import useLocalStorage from "./useLocalStorage";

export default function useReducerWithLocalStorage({ initializer, key, reducer }) {
  const [localStorageState, setLocalStorageState] = useLocalStorage(
    key,
    initializer
  );

  return useReducer(
    (state, action) => {
      const newState = reducer(state, action);
      setLocalStorageState(newState);
      return newState;
    },
    { ...localStorageState }
  );
}