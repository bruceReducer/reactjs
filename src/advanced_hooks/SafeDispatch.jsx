import React, { useCallback, useEffect, useReducer, useRef } from "react";
import { countReducer } from "./DispatchReducer";

function useSafeDispatch(dispatch) {
  const mountedRef = useRef(false);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  });
  const newDispatch = useCallback(
    (...args) => {
      if (mountedRef.current) {
        dispatch(...args);
      }
    },
    [dispatch]
  );
  return newDispatch;
}

function SafeDispatch() {
  const [state, unsafeDispatch] = useReducer(countReducer, {
    count: 0,
  });
  const dispatch = useSafeDispatch(unsafeDispatch);
  return (
    <button onClick={() => dispatch({ type: "INCREMENT", step: 1 })}>
      {state.count}
    </button>
  );
}

export default SafeDispatch;
