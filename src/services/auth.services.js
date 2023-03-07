//* ALL FUNCTIONS FOR SAME CRUD (Auth)
import service from "./config.services";

const signupService = (newUser) => {
  return service.post("/auth/signup", newUser);
};

const loginService = (userCredentials) => {
  return service.post("/auth/login", userCredentials);
};

const verifyService = () => {
  //* ensure to pass TOKEN
  return service.get("/auth/verify");
};

export { signupService, loginService, verifyService };
