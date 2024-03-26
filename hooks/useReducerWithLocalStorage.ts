import { useReducer } from "react";
import useLocalStorage from "./useLocalStorage";
import { AuthAction, AuthState } from "../src/interfaces/Auth"

export default function useReducerWithLocalStorage({ initializer, key, reducer }: { initializer: Object, key: string, reducer: Function }) {
  const [localStorageState, setLocalStorageState] = useLocalStorage(
    key,
    initializer
  );

  return useReducer(
    (state: AuthState, action: AuthAction): AuthState => {
      const newState = reducer(state, action);
      setLocalStorageState(newState);
      return newState;
    },
    { ...localStorageState }
  );
}