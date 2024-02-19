import React from "react";
import {TodoApp} from "./components/Todo"
import {LoginForm} from "./LoginForm"
import "./App.css";
import { Provider } from "react-redux";
import {store} from "./store";

function App() {
  return (
    
  <div className="App">
    <Provider store={store}>
    <TodoApp/>
    {/* <LoginForm/> */}
    </Provider>
  </div>
  )
}

export default App;