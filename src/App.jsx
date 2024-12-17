import DispatchReducer from "./advanced_hooks/DispatchReducer";
import "./App.css";
import Reducer from "./advanced_hooks/Reducer";
import CustomHook from "./hooks/CustomHook";
import Persistent from "./hooks/Persistent";
import TicTacToe from "./TicTacToe";
import Context from "./advanced_hooks/Context";
import SafeDispatch from "./advanced_hooks/SafeDispatch";
import ContextModuleFunctions from "./advanced_patterns/ContextModuleFunctions";

function App() {
  return (
    <>
      {/* <div className="card"> */}
      {/* <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button> */}
      {/* </div> */}
      {/* <Persistent /> */}
      {/* <CustomHook /> */}
      {/* <TicTacToe /> */}
      {/* <Reducer /> */}
      {/* <DispatchReducer /> */}
      {/* <Context /> */}
      {/* <SafeDispatch /> */}
      <ContextModuleFunctions />
    </>
  );
}

export default App;
