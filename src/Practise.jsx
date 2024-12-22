import React, { useReducer, useState, useRef } from "react";
import "./toggle.css";
function callAll(...fns) {
  return (...args) => {
    console.log(...args.map((a) => console.log(a)));

    fns.forEach((fn) => fn(...args));
  };
}
function toggleReducer(state, { type, initialState }) {
  switch (type) {
    case "toggle": {
      return { on: !state.on };
    }
    case "reset":
      console.log("resetting");

      return initialState;
    default:
      throw new Error("invalid type");
  }
}
function useToggle({ initialOn = false, reducer = toggleReducer }) {
  const { current: initialState } = useRef({ on: initialOn });
  const [state, dispatch] = useReducer(reducer, initialState);
  console.log(state);

  const { on } = state;
  const toggle = () => dispatch({ type: "toggle" });
  const reset = () => dispatch({ type: "reset", initialState });
  function getTogglerProps({ onClick, ...props } = {}) {
    return {
      onClick: callAll(onClick, toggle),
      ...props,
    };
  }
  return { toggle, on, reset, getTogglerProps };
}
function Toggle() {
  return <Switch />;
}
function Switch() {
  const [timesClicked, setTimesClicked] = useState(0);
  const clickedTooMuch = timesClicked > 3;
  function statetoggleReducer(state, action) {
    switch (action.type) {
      case "toggle":
        if (clickedTooMuch) {
          return {};
        } else {
          return { on: !state.on };
        }

      case "reset":
        console.log("resetting");
        return { on: false };
      default:
        throw new Error("invalid type");
    }
  }
  const { on, toggle, reset, getTogglerProps } = useToggle({
    reducer: statetoggleReducer,
  });
  const classes = [
    "toggle-input",
    "toggle-btn",
    on ? "toggle-btn-on" : "toggle-btn-off",
  ]
    .filter(Boolean)
    .join(" ");
  console.log(reset);

  return (
    <div>
      <div>
        <span
          {...getTogglerProps({
            onClick: () => setTimesClicked(timesClicked + 1),
            disabled: clickedTooMuch,
            // on: on,
          })}
          className={classes}
        />
      </div>
      <button
        onClick={() => {
          reset();
          setTimesClicked(0);
        }}
      >
        Reset
      </button>
      <div style={{ height: "10px" }}>
        {clickedTooMuch && <h4>Clicked too much!</h4>}
      </div>
    </div>
  );
}
export default function Practise() {
  return (
    <div>
      <Toggle />
    </div>
  );
}
