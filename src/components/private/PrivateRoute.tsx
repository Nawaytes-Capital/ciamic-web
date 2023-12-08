import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { RootState } from "../../redux/store";

export default function PrivateRouteDashboard(props: React.PropsWithChildren) {
  const authState = useSelector((state: RootState) => state.auth);
  if (!authState.authenticated) {
    return <Navigate to='/dashboard' />;
  }
  if (!authState.role?.includes("admin_chatbot")) {
    return <Navigate to='/dashboard' />;
  }

  return <>{props.children}</>;
}
