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
    <main className="auth-page">
      {" "}
      <div className="form-container">
        <div className="form-header">
          <h1>Welcome Back!</h1>
          <p>Login to your account</p>
        </div>

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
            placeholder="Email or username"
            autoComplete="username"
            disabled={isLoggingIn}
          />

          <input
            value={password}
            onInput={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Enter password"
            autoComplete="current-password"
            disabled={isLoggingIn}
          />

          <button type="submit" disabled={isLoggingIn}>
            {isLoggingIn ? "Logging..." : "Sign In"}
          </button>

          <p className="redirect-text">
            Don't have an account? <Link to="/register">Create One</Link>
          </p>
        </form>
      </div>
    </main>
  );
};

export default Login;
