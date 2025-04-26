import { useNavigate } from "@solidjs/router";

export default function Dab() {
  const navigate = useNavigate();
  return (
    <div id="sketch">
      <script src="https://cdn.jsdelivr.net/npm/p5@1.11.5/lib/p5.js"></script>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.11.3/addons/p5.sound.min.js"></script>
      <script src="/sketch.js"></script>

      <button
        onClick={() => {
          navigate("/game");
        }}
      >
        Login
      </button>
    </div>
  );
}
