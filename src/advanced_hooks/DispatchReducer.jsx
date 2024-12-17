import React, { useReducer } from "react";
function countReducer(state, action) {
  switch (action.type) {
    case "INCREMENT":
      return { ...state, count: state.count + action.step };
    case "DECREMENT":
      return { ...state, count: state.count - action.step };
    default:
      throw new Error("incorrent case");
  }
}
function DispatchReducer({ initialCount = 0, step = 1 }) {
  const [state, dispatch] = useReducer(countReducer, {
    count: initialCount,
  });
  const { count } = state;
  return (
    <div>
      <button onClick={() => dispatch({ type: "INCREMENT", step: step })}>+</button>

      {count}
      <button onClick={() => dispatch({ type: "DECREMENT", step: step })}>-</button>
    </div>
  );
}

export default DispatchReducer;
export { countReducer };
