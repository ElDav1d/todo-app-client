import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";

function IsPrivate(props) {
  const { isLoggedIn } = useContext(AuthContext);

  if (isLoggedIn) {
    //* ONLY REENDERIZING CHILDREN IF ACTIVE SESSION
    return props.children;
  } else {
    //! useNavigate cannot eb applied outside component base (= out of useEffect or try/catch)
    return <Navigate to="/login" />;
  }
}

export default IsPrivate;
