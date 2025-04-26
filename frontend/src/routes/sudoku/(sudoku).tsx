import { createSignal } from "solid-js";

export default function Home() {
  const [result, setResult] = createSignal("");

  const runSudoku = async () => {
    const res = await fetch("/api/run-sudoku");
    const text = await res.text();
    setResult(text);
  };

  return (
    <div>
      <h1>TinyTerribleSudoku Runner</h1>
      <button onClick={runSudoku}>Run Sudoku</button>
      <pre>{result()}</pre>
    </div>
  );
}