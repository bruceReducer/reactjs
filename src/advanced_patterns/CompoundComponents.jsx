import React, { useState } from "react";
import "../toggle.css";
function Switch(props) {
  const { on, className = "", onClick } = props;
  const btnClassName = ["first", "toggle-btn", on ? "toggle-btn-on" : "toggle-btn-off"]
    .filter(Boolean)
    .join(" ");

  return (
    <div>
      <input type="checkbox" onChange={onClick} />
      <span className={btnClassName} {...props} />
    </div>
  );
}

function ToggleOff({ on, children }) {
  return on ? null : children;
}
function ToggleButton({ on, toggle, ...props }) {
  return <Switch on={on} onClick={toggle} {...props} />;
}
function ToggleOn({ on, children }) {
  return on ? children : null;
}
function Toggle({ children }) {
  const [on, setOn] = useState(false);
  const toggle = () => setOn(!on);

  return React.Children.map(children, (child) =>
    React.cloneElement(child, { on, toggle })
  );
}
export default function CompoundComponents() {
  return (
    <div>
      <Toggle>
        <ToggleButton />
        <ToggleOn>We're live</ToggleOn>
        <ToggleOff>We're down</ToggleOff>
      </Toggle>
    </div>
  );
}
