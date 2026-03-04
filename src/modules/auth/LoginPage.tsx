import { useState } from "react";
import { useAppStore } from "../../app/store";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const login = useAppStore((state) => state.login);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const success = await login(email, password);
    if (!success) {
      setError("Invalid credentials or user not active.");
      return;
    }
    navigate("/dashboard");
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        placeholder="Enter your Email"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
          if (error) setError("");
        }}
        required
      />
      {/* {email} */}
      <input
        type="password"
        placeholder="Enter Password"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
          if (error) setError("");
        }}
        required
      />
      {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}
      {/* {password} */}
      <button type="submit">Submit</button>
    </form>
  );
}

export default LoginPage;
