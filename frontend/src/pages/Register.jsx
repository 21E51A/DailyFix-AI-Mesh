import { useState } from "react";
import { registerUser } from "../api/users.api";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const submit = async () => {
    try {
      await registerUser(form);
      alert("User registered successfully");
    } catch (err) {
      console.error(err);
      alert("Registration failed");
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <input placeholder="Name" onChange={e => setForm({...form, name: e.target.value})} />
      <input placeholder="Email" onChange={e => setForm({...form, email: e.target.value})} />
      <input type="password" placeholder="Password" onChange={e => setForm({...form, password: e.target.value})} />
      <button onClick={submit}>Register</button>
    </div>
  );
}
