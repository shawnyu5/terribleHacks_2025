import { createSignal } from "solid-js";
import { useNavigate } from "@solidjs/router";
import ErrorMessage from "~/components/ErrorMessage";

export default function Login() {
  const [email, setEmail] = createSignal("");
  const [password, setPassword] = createSignal("");
  const [errorMessage, setErrorMessage] = createSignal("");
  const navigate = useNavigate();

  const handleSubmit = (e: Event) => {
    e.preventDefault();
    console.log("Email:", email());
    console.log("Password:", password());

    if (email() === "terrible@hacks.com" && password() === "password") {
      setErrorMessage("");
      console.log("Success!");
      navigate("/oauth");
    } else {
      setErrorMessage("Invalid user login");
    }
  };

  return (
    <div id="login-form">
      {
        <ErrorMessage message={errorMessage()} />
      }
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email()}
          onInput={(e) => setEmail(e.currentTarget.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password()}
          onInput={(e) => setPassword(e.currentTarget.value)}
          required
        />
        <button type="submit">Log In</button>
      </form>
    </div>
  );
}
