import logo from "./logo.svg";
import "./App.css";
import { decrement, increment, selectCount } from "./redux";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";

function App() {
  const count = useSelector(selectCount);
  const dispatch = useDispatch();
  return (
    <div className="App">
      <button
        className="bg"
        aria-label="Increment value"
        onClick={() => dispatch(increment())}
      >
        +
      </button>

      <span>{count}</span>

      <button
        className="text-red"
        aria-label="Decrement value"
        onClick={() => dispatch(decrement())}
      >
        -
      </button>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
