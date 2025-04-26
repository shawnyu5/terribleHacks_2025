import { useNavigate } from "@solidjs/router";
import { onMount, onCleanup } from "solid-js";

export default function KeyListener() {
   const navigate = useNavigate()
  onMount(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      console.log("You pressed:", event.key);

      if (event.key === "f20") {
        console.log("Enter was pressed!");
        navigate("/logged-in")
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
      <h1>Press any key!</h1>
    </div>
  );
}
