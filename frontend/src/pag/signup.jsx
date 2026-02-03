import React, { useState } from "react";
import styles from "./signup.module.css";

const Signup = ({ onSignupSuccess }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!name || !email || !password || !confirm) {
      setError("Please fill all fields");
      return;
    }
    if (password !== confirm) {
      setError("Passwords do not match");
      return;
    }
    // Call backend signup endpoint
    try {
      const res = await fetch("http://localhost:4000/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.message || "Signup failed");
        return;
      }
      console.log("Signup response", data);
      alert("Signup successful");
      setName("");
      setEmail("");
      setPassword("");
      setConfirm("");
      if (onSignupSuccess) onSignupSuccess();
    } catch (err) {
      console.error("Signup request error", err);
      setError("Network error");
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Create account</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div>
          <label>Name</label>
          <input
            className={styles.input}
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            type="text"
          />
        </div>
        <div>
          <label>Email</label>
          <input
            className={styles.input}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            type="email"
          />
        </div>
        <div style={{ marginBottom: 8 }}>
          <label>Password</label>
          <input
            className={styles.input}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            type="password"
          />
        </div>
        <div>
          <label>Confirm password</label>
          <input
            className={styles.input}
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            placeholder="Confirm password"
            type="password"
          />
        </div>
        {error && <div className={styles.error}>{error}</div>}
        <button type="submit" className={styles.button}>
          Sign up
        </button>
      </form>
    </div>
  );
};

export default Signup;
