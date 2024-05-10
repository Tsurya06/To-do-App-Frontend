import { useEffect } from "react";
import "./App.css";
import { useAppSelector} from "./store/store";
import Layout from "./components/layout/Layout";
import Auth from "./components/layout/Auth";

function App() {
  const userState = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (
      userState.user &&
      userState.user.user &&
      userState.user.user.id !== ''
    ) {
      // checkAuthentication({ id: userState.user.user.id });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    
  <div className="App">
    {/* {userState.user &&
      userState.user.user &&
      userState.user.user.id !== '' ? ( */}
        <Layout/>
      {/* ) : (
        <Auth />
      )} */}
  </div>
  )
}

export default App;