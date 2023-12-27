import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutApp } from "./redux/features/auth/authSlice";
import { AppDispatch, RootState } from "./redux/store";

interface PrivateRouteProps {
  children: React.ReactNode;
  role: string;
  unautorizedPath?: string;
}
export default function PrivateRoute(props: PrivateRouteProps) {
  const dispatch = useDispatch<AppDispatch>();
  const authState = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!authState.authenticated) {
      // Redirect if not authenticated
      navigate(props.unautorizedPath ? props.unautorizedPath : "/");
    }
  }, [authState.authenticated, props.unautorizedPath, navigate]);

  useEffect(() => {
    if (props.role === "admin_chatbot checking") {
      if (!authState.role?.includes("admin_chatbot")) {
        // Logout and redirect if not admin_chatbot
        dispatch(logoutApp());
        navigate(props.unautorizedPath ? props.unautorizedPath : "/");
      }
    } else if (props.role === "user") {
      if (!authState.role?.includes("user")) {
        // Logout and redirect if not user
        dispatch(logoutApp());
        navigate(props.unautorizedPath ? props.unautorizedPath : "/");
      }
    }
  }, [authState.role, props.role, dispatch, props.unautorizedPath, navigate]);

  // Render the children only if authenticated and role checks pass
  return authState.authenticated ? <>{props.children}</> : null;
}
