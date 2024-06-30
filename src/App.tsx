import { useAppSelector} from "./store/store";
import Layout from "./components/layout/Layout";
import Auth from "./components/layout/Auth";
import { useEffect } from "react";

export default function App() {
  const userState = useAppSelector((state) => state.authReducer);  
  useEffect(() => {
    console.log(userState.user);
  }, [userState.user]);
  return (

  <>
    {userState.user!==null? (
        <Layout/>
       ) : (
        <Auth />
      )} 
  </>
  )
}
