import { useState } from "react";
import { loginUser } from "../api/auth.api";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submit = async () => {
    try {
      const data = await loginUser(email, password);
      localStorage.setItem("token", data.access_token);
      alert("Login successful");
    } catch {
      alert("Login failed");
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <input placeholder="Email" onChange={e => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
      <button onClick={submit}>Login</button>
    </div>
  );
}
