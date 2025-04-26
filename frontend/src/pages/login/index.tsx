"use client";

import { useState } from "react";
import ErrorMessage from "@/components/ErrorMessage";
import { useRouter } from "next/navigation";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Email:", email);
    console.log("Password:", password);

    if (email == "terrible@hacks.com" && password == "password") {
      setErrorMessage("");
      console.log("Success!");
      router.push("/oauth");
    } else {
      setErrorMessage("Invalid user login");
    }
  };

  return (
    <div id="login-form">
      <ErrorMessage message={errorMessage} />
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Log In</button>
      </form>
    </div>
  );
}
