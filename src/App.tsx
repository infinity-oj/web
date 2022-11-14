import "./App.css";
import TermianlComponent from "./components/Terminal/Terminal";
import useBearStore from "./store/store";

function BearCounter() {
  const bears = useBearStore((state) => state.bears);
  return <h1>{bears} around here ...</h1>;
}

function App() {
  return (
    <div className="App">
      <BearCounter></BearCounter>
      <TermianlComponent></TermianlComponent>
    </div>
  );
}

export default App;
