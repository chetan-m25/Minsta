import "../style/form.scss";
import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const { handleLogin } = useAuth();

  const [emailOrUsername, setEmailOrUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setIsLoggingIn(true);
    const result = await handleLogin(emailOrUsername, password);
    setIsLoggingIn(false);
    if (result.success) {
      navigate("/");
    } else {
      setErrorMessage(result.message);
    }
  };

  return (
    <main>
      <div className="form-container">
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          {errorMessage && (
            <p className="form-error" role="alert">
              {errorMessage}
            </p>
          )}
          <input
            value={emailOrUsername}
            onInput={(e) => setEmailOrUsername(e.target.value)}
            type="text"
            name="emailOrUsername"
            id="emailOrUsername"
            placeholder="Email or username"
            autoComplete="username"
            disabled={isLoggingIn}
          />
          <input
            value={password}
            onInput={(e) => setPassword(e.target.value)}
            type="password"
            name="password"
            id="password"
            placeholder="Enter password"
            autoComplete="current-password"
            disabled={isLoggingIn}
          />
          <button
            type="submit"
            className="button primary-button"
            disabled={isLoggingIn}
          >
            {isLoggingIn ? "Logging..." : "Login"}
          </button>
          <p>
            Don't have an account ? <Link to={"/register"}>Create One</Link>
          </p>
        </form>
      </div>
    </main>
  );
};

export default Login;
