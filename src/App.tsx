import { useEffect } from "react";
import "./App.css";
import { useAppSelector} from "./store/store";
import Layout from "./components/layout/Layout";
import Auth from "./components/layout/Auth";

function App() {
  const userState = useAppSelector((state) => state.authReducer);
  useEffect(() => {console.log("userState",userState)}, [userState]);
  
  return (
    
  <>
    {userState.user?.success? (
        <Layout/>
       ) : (
        <Auth />
      )} 
  </>
  )
}

export default App;