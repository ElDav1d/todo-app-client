import { NavLink } from "react-router-dom";

function Navbar() {
  const toggleStyles = (navInfo) => {
    return navInfo.isActive === true ? activeStyles : inActiveStyles;
  };

  const activeStyles = {
    textDecoration: "underline",
  };

  const inActiveStyles = {
    textDecoration: "none",
  };

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
      <NavLink to="/todos" end={true} style={toggleStyles}>
        Ver Lista
      </NavLink>
    </div>
  );
}

export default Navbar;
