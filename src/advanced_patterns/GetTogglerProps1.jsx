import React, { createContext, useContext, useState } from "react";
const allowedTypes = [ToggleOn, ToggleBtn];

const ToggleCtx = createContext();
function Toggle({ children }) {
  return <ToggleCtx.Provider value={{}}>{children}</ToggleCtx.Provider>;
}
const useToggle = () => {
  const [on, setOn] = useState(false);
  const toggle = () => setOn(!on);
  const ctx = useContext(ToggleCtx);
  const getTogglerProps = ({ onClick, ...props } = {}) => {
    return {
      onClick: () => {
        toggle();
        onClick && onClick();
      },
      ...props,
    };
  };
  return {
    on,
    toggle,
    getTogglerProps,
  };
};
function ToggleBtn() {
  const { on, toggle, togglerProps } = useToggle();
  return <Switch on={on} onClick={toggle} {...togglerProps} />;
}
function Switch({ className = "" }) {
  const { on, togglerProps, toggle, getTogglerProps } = useToggle(ToggleCtx);
  const classes = [className, "toggle-btn", on ? "toggle-btn-on" : ""]
    .filter(Boolean)
    .join(" ");
  return (
    <div>
      {/* <input type="checkbox" checked={on} onClick={onClick} /> */}
      <span className={classes} onClick={toggle} {...togglerProps} />
      <div>
        <button
          {...getTogglerProps({
            onClick: console.log("onclick"),
          })}
        >
          switch!
        </button>
      </div>
    </div>
  );
}
function ToggleOn({ children }) {
  const { on } = useToggle(ToggleCtx);
  return on ? children : null;
}

export default function Practise() {
  return (
    <div>
      <Toggle>
        <ToggleBtn />
        <span>Hello</span>
        <ToggleOn>Yes this works!</ToggleOn>
      </Toggle>
    </div>
  );
}
