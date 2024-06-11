import { useAppSelector} from "./store/store";
import Layout from "./components/layout/Layout";
import Auth from "./components/layout/Auth";

export default function App() {
  const userState = useAppSelector((state) => state.authReducer);  
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
