import { useEffect, useState } from "react";
export default function Persistent({ initialName = "rajesh" }) {
  const [name, setName] = useState(
    () => window.localStorage.getItem("name") || initialName
  );

  useEffect(() => {
    window.localStorage.setItem("name", name);
  }, [name]);
  return (
    <>
      <form>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      </form>
      <h2>{name}</h2>
    </>
  );
}
