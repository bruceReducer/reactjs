import { useEffect, useRef, useState } from "react";

function useSyncWithLocalStorage(
  key,
  defaultValue = "",
  { serialize = JSON.stringify, deserialize = JSON.parse } = {}
) {
  const [state, setState] = useState(() => {
    const value = window.localStorage.getItem(key);
    if (value) {
      return deserialize(value);
    }
    return typeof defaultValue === "function" ? defaultValue() : defaultValue;
  });

  const prevRef = useRef(key);

  useEffect(() => {
    if (prevRef === prevRef.current) {
      window.localStorage.remove(prevRef);
    }
    prevRef.current = key;
    window.localStorage.setItem(key, serialize(state));
  }, [key, state]);
  return [state, setState];
}

export default function CustomHook() {
  const [name, setName] = useSyncWithLocalStorage("name", "raj");
  return (
    <>
      <form>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      </form>
      <h2>{name}</h2>
    </>
  );
}
