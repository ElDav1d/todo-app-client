import { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";

function Navbar() {
  const redirect = useNavigate();
  const { isLoggedIn, authenticateUser } = useContext(AuthContext);
  const toggleStyles = (navInfo) => {
    return navInfo.isActive === true ? activeStyles : inActiveStyles;
  };

  const activeStyles = {
    textDecoration: "underline",
  };

  const inActiveStyles = {
    textDecoration: "none",
  };

  const handleLogout = () => {
    // remove token from LocalStorage
    localStorage.removeItem("authToken");
    // change context state
    authenticateUser();
    // redirect user
    redirect("/");
  };

  if (isLoggedIn) {
    return (
      <div>
        <NavLink to="/" style={toggleStyles}>
          Home
        </NavLink>
        <NavLink to="/todos" end={true} style={toggleStyles}>
          Ver Lista
        </NavLink>
        <span onClick={handleLogout}>LOGOUT</span>
      </div>
    );
  } else {
    return (
      <div>
        <NavLink to="/" style={toggleStyles}>
          Home
        </NavLink>
        <NavLink to="/signup" style={toggleStyles}>
          Registro
        </NavLink>
        <NavLink to="/login" style={toggleStyles}>
          Acceso
        </NavLink>
      </div>
    );
  }
}

export default Navbar;
