import { useState } from "react";
import api from "../services/api";

export default function AddAgentForm({ onAgentAdded }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/agents", { name, email, mobile, password });
      alert("Agent added");
      onAgentAdded();
      setName("");
      setEmail("");
      setMobile("");
      setPassword("");
    } catch (err) {
      alert("Failed to add agent");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input placeholder="Name" value={name} onChange={e => setName(e.target.value)} required />
      <input placeholder="Email" type="email" value={email} onChange={e => setEmail(e.target.value)} required />
      <input placeholder="Mobile (+countrycode)" value={mobile} onChange={e => setMobile(e.target.value)} required />
      <input placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} required />
      <button type="submit">Add Agent</button>
    </form>
  );
}