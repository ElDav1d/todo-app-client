import { createContext, useState } from "react";
import { verifyService } from "../services/auth.services";

const AuthContext = createContext();

function AuthWrapper(props) {
  // auth STATES
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loggedUser, setLoggedUser] = useState(null);

  // auth functions
  const authenticateUser = async () => {
    try {
      const response = await verifyService();
      console.log("CONTEXT: token is valid");
      setIsLoggedIn(true);
      setLoggedUser(response.data); // ! FROM BE = req.payload
    } catch (error) {
      console.log("CONTEXT: invalid token");
      setIsLoggedIn(false);
      setLoggedUser(null);
    }
  };
  const passedContext = {
    isLoggedIn,
    loggedUser,
    authenticateUser,
  };

  return (
    <AuthContext.Provider value={passedContext}>
      {props.children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthWrapper };
