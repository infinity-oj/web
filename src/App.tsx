import { useEffect, useRef, useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
// import Terminal from './components/Terminal/Terminal'
import { XTerm } from 'xterm-for-react'
import Xterm from 'xterm-for-react/dist/src/XTerm'
import { Resizable } from 're-resizable'
import TermianlComponent from './components/Terminal/Terminal'

function App() {
  const ref = useRef<Xterm>(null)
  const [input, setInput] = useState("")

  useEffect(() => {

    // Once the terminal is loaded write a new line to it.
    ref.current?.terminal.writeln('Hello, World!')
    // Add the starting text to the terminal
    ref.current?.terminal.writeln(
      "Please enter any string then press enter:\r\n"
    );
    ref.current?.terminal.write("echo> ");
  }, [])

  return (
    <div className="App">
      {/* <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p> */}

      <TermianlComponent></TermianlComponent>
    </div >
  )
}

export default App
