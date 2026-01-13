import { useUser } from "../../store/useUser";
import { Navigate } from "react-router-dom";

export default function Guard({ children }) {
  const { user } = useUser();

  return (
   <>
   {user ? <>{children}</> : <Navigate to="/login"/>}
   </>
  )
}
