import "../style/form.scss";
import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const { handleRegister } = useAuth();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (password.length < 5) {
      setErrorMessage("Password must be at least 5 characters");
      return;
    }

    if (password.length > 15) {
      setErrorMessage("Password must not exceed 15 characters");
      return;
    }

    const result = await handleRegister(username, email, password);
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
          <h1>Create Account</h1>
          <p>Join Minsta today</p>
        </div>

        <form onSubmit={handleSubmit}>
          {errorMessage && (
            <p className="form-error" role="alert">
              {errorMessage}
            </p>
          )}

          <input
            value={username}
            onInput={(e) => setUsername(e.target.value)}
            type="text"
            placeholder="Username"
            autoComplete="username"
          />

          <input
            value={email}
            onInput={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Email address"
            autoComplete="email"
          />

          <input
            value={password}
            onInput={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password (5-15 characters)"
            autoComplete="new-password"
          />

          <button type="submit">Create Account</button>

          <p className="redirect-text">
            Already have an account? <Link to="/login">Login now</Link>
          </p>
        </form>
      </div>
    </main>
  );
};

export default Register;
