import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signupService } from "../../services/auth.services";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const redirect = useNavigate();

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleSignup = async (e) => {
    e.preventDefault();
    // ... signup logic here

    // Contact BE
    const newUser = {
      email,
      password,
    };

    try {
      await signupService(newUser);
      redirect("/login");
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
      <h1>Sign Up</h1>

      <form onSubmit={handleSignup}>
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

        <button type="submit">Signup</button>
      </form>
    </div>
  );
}

export default Signup;
