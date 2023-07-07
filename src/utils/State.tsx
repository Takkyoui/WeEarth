import { createContext, useEffect, useReducer } from "react";

type User = {
  name: string;
  _id: string;
  token: string;
  image: string;
};

type State = {
  user: User | null;
};

type Action =
  | { type: "SET_USER"; payload: User }
  | { type: "CLEAR_USER" }
  | { type: "UPDATE_USER"; payload: any };

type Dispatch = (action: Action) => void;

const initialState: State = {
  user: localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user")!)
    : null,
};

const defaultDispatch: React.Dispatch<Action> = () => initialState;

const StateContext = createContext<{ state: State; dispatch: Dispatch }>({
  state: initialState,
  dispatch: defaultDispatch,
});

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_USER":
      return { user: action.payload };
    case "CLEAR_USER":
      return { user: null };
    case "UPDATE_USER":
      return { user: action.payload };
    default:
      return state;
  }
};

const StateProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <StateContext.Provider value={{ state, dispatch }}>
      {children}
    </StateContext.Provider>
  );
};

export { StateContext, StateProvider };
