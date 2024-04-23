import React, { useEffect } from "react";
import {TodoApp} from "./pages/todo/Todo"
import {LoginForm} from "./LoginForm"
import "./App.css";
import { Provider } from "react-redux";
import {store, useAppSelector} from "./store/store";

function App() {
  // const userState = useAppSelector((state) => state.auth);

  // useEffect(() => {
  //   if (
  //     userState.user &&
  //     userState.user.user &&
  //     userState.user.user.id !== ''
  //   ) {
  //     checkAuthentication({ id: userState.user.user.id });
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);
  return (
    
  <div className="App">
    <TodoApp/>
    {/* {userState.user &&
      userState.user.user &&
      userState.user.user.id !== '' ? (
        <TodoApp/>
      ) : (
        <Auth />
      )} */}
  </div>
  )
}

export default App;