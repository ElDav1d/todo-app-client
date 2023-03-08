import { createContext, useEffect, useState } from "react";
import { verifyService } from "../services/auth.services";

const AuthContext = createContext();

function AuthWrapper(props) {
  // auth STATES
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loggedUser, setLoggedUser] = useState(null);
  const [isFecthing, setIsFetching] = useState(true);

  // auth functions
  const authenticateUser = async () => {
    try {
      const response = await verifyService();
      console.log("CONTEXT: token is valid");

      setIsFetching(true);
      setIsLoggedIn(true);
      setLoggedUser(response.data); // ! FROM BE = req.payload
      setIsFetching(false);
    } catch (error) {
      console.log("CONTEXT: invalid token");
      setIsLoggedIn(false);
      setLoggedUser(null);
      setIsFetching(false);
    }
  };

  useEffect(() => {
    //! AUTH USER WHEN VISITING FOR THE FIRST TIME
    //* componentDidMount()
    authenticateUser();
  }, []);

  if (isFecthing) {
    return (
      <div>
        <h1>...user is being authenticated</h1>
      </div>
    );
  }

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
