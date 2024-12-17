import React, { useReducer } from "react";

const countReducer = (state, newState) => {
  //   return newState(state);
  //   return { ...state, ...newState };
  return {
    ...state,
    ...(typeof newState === "function" ? newState(state) : newState),
  };
};
function Reducer({ step = 1, initialCount = 0 }) {
  const [state, setState] = useReducer(countReducer, { count: initialCount });
  const { count } = state;
  return (
    <div>
      <h1>{count}</h1>
      <button
        onClick={() =>
          //   setState((curr) => {
          //     count: curr.count + step;
          //   })
          setState((curr) => ({
            count: curr.count + step,
          }))
        }
      >
        {count}
      </button>
    </div>
  );
}
// const stateReducer = (state, step) => {
//   return state + step;
// };
// function Reducer({ step = 1, initialCount = 0 }) {
//   const [count, changeCount] = useReducer(stateReducer, initialCount);
//   return (
//     <div>
//       <h1>{count}</h1>
//       <button onClick={() => changeCount(step)}>{count}</button>
//     </div>
//   );
// }

export default Reducer;
