import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/auth.context";
import { loginService } from "../../services/auth.services";

function Login() {
  const { authenticateUser } = useContext(AuthContext);
  const redirect = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleLogin = async (e) => {
    e.preventDefault();
    // ... login logic here

    const userCredentials = {
      email,
      password,
    };

    try {
      const response = await loginService(userCredentials);

      //! STORE TOKEN on LocalStorage (Will expireIn, not deleted)
      localStorage.setItem("authToken", response.data.authToken);
      //* Will go to CONTEXT
      authenticateUser();
      console.log("FROM LOGIN: token was validated");
    } catch (error) {
      //* DETERMINE ERROR STATUS (status), ACT ACCORDINGLY (errorMessage)
      if (error.response.status === 400) {
        setErrorMessage(error.response.data.errorMessage); // TELL USER HOW SO SOLVE IT
      } else {
        redirect("/error");
      }
    }
  };

  return (
    <div>
      <h1>Log In</h1>

      <form onSubmit={handleLogin}>
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={email}
          onChange={handleEmailChange}
        />

        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={handlePasswordChange}
        />

        <br />
        <br />
        {errorMessage && <p>{errorMessage}</p>}

        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
