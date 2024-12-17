import React, { createContext, useContext, useReducer } from "react";
import { countReducer } from "./DispatchReducer";
const CounterCtx = createContext();

function CounterProvider(props) {
  const [state, dispatch] = useReducer(countReducer, { count: 0 });
  const inc = (step) => dispatch({ type: "INCREMENT", step });
  const value = { state, inc };
  return <CounterCtx.Provider value={value} {...props} />;
}
const useCount = () => {
  const context = useContext(CounterCtx);
  if (!context) throw new Error("things are out of Context!!");
  return context;
};
export default function Context() {
  return (
    <CounterProvider>
      <DisplayCounter />
      <CounterButtons />
    </CounterProvider>
  );
}
function DisplayCounter() {
  const { state } = useCount();
  return <h1>{state.count}</h1>;
}
function CounterButtons() {
  const { inc } = useCount();
  return <button onClick={() => inc(1)}>+</button>;
}
