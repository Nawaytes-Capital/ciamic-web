import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { Navigate } from "react-router-dom";
import { isAuthenticated } from "../../redux/features/auth/authSlice";

export default function PrivateRouteDashboard(props: React.PropsWithChildren) {
  const authState = useSelector((state: RootState) => state.auth);
  console.log("isAuthenticated()", isAuthenticated());
  console.log(authState);
  if (!authState.authenticated) {
    return <Navigate to='/dashboard' />;
  }
  console.log(
    'authState.role?.includes("admin_chatbot")',
    authState.role?.includes("admin_chatbot")
  );
  if (!authState.role?.includes("admin_chatbot")) {
    return <Navigate to='/dashboard' />;
  }

  return <>{props.children}</>;
}
