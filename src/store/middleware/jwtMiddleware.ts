
import Cookies from "js-cookie";

export const jwtMiddleware = () => (next: any) => (action: any) => {
    if (action.type === "auth/login/fulfilled") {
    Cookies.set("accessToken", action.payload.access, { expires: 1 });
  }
  if (action.type === "auth/logoutUser/fulfilled") {
    Cookies.remove("accessToken");
  }
  next(action);
};
