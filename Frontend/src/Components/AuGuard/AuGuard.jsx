import { useUser } from "../../store/useUser";
import { Navigate } from "react-router-dom";

export default function AuGuard({ children }) {
  const { user } = useUser();

  return (
    <>
      {user ? <Navigate to="/" /> : children}
    </>
  );
}