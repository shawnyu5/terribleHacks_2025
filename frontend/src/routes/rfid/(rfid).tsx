import { useNavigate } from "@solidjs/router";
import { onMount, onCleanup } from "solid-js";

export default function KeyListener() {
   const navigate = useNavigate()
  onMount(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      console.log("You pressed:", event.key);

      if (event.key === "F20") {
        console.log("Enter was pressed!");
        navigate("/tips")
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    // Cleanup the event listener when component unmounts
    onCleanup(() => {
      window.removeEventListener("keydown", handleKeyDown);
    });
  });

  return (
<div>
      <h1>Please present your Credit Card</h1>
      <img src="/card.png" alt="Card" width="150" height="100" style={{ display: "block", margin: "1.5rem auto 0 auto" }} />
      </div>
  );
}
