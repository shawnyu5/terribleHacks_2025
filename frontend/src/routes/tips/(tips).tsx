import { createSignal, Show } from "solid-js";
import { useNavigate } from "@solidjs/router";

export default function Tips() {
  const [selectedTip, setSelectedTip] = createSignal<number | null>(null);
  const navigate = useNavigate();

  const handleTip = (percent: number) => {
    setSelectedTip(percent);
    // if (percent === 20) {
    //   setTimeout(() => {
    //     navigate("/vote");
    //   }, 2000);
    // }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        background: "#f6f8fa",
        textAlign: "center",
      }}
    >
      <h1 style={{ marginBottom: "2rem" }}>Add a Tip</h1>
      <div style={{ display: "flex", gap: "1.5rem", marginBottom: "2rem" }}>
        {[10, 15, 20].map((percent) => (
          <button
            type="button"
            style={{
              background: selectedTip() === percent ? "#335d92" : "#fff",
              color: selectedTip() === percent ? "#fff" : "#335d92",
              border: "2px solid #335d92",
              borderRadius: "10px",
              fontSize: "1.5rem",
              fontWeight: 600,
              padding: "1rem 2.5rem",
              cursor: "pointer",
              transition: "background 0.2s, color 0.2s",
            }}
            onClick={() => setSelectedTip(percent)}
            disabled={selectedTip() === 20}
          >
            {percent}%
          </button>
        ))}
      </div>
      {(selectedTip() === 10 || selectedTip() === 15) && (
        <div style={{ marginTop: "1.5rem" }}>
          <input
            type="text"
            placeholder="Do you hate service workers?"
            style={{
              padding: "0.8rem 1.2rem",
              border: "1.5px solid #d1d5db",
              borderRadius: "8px",
              fontSize: "1.1rem",
              width: "260px",
              textAlign: "center",
            }}
          />
        </div>
      )}
      {selectedTip() === 20 && (
        <div style={{ marginTop: "2rem" }}>
          <div style={{ fontSize: "3rem" }}>😊</div>
          <div
            style={{
              fontSize: "1.5rem",
              marginTop: "0.5rem",
              color: "#335d92",
              fontWeight: 600,
            }}
          >
            Thank You
          </div>
        </div>
      )}
      <Show when={selectedTip() == 20}>
        <button
          onClick={() => {
            navigate("/vote");
          }}
        >
          Login
        </button>
      </Show>
    </div>
  );
}
