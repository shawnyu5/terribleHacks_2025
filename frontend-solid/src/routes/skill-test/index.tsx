import { createSignal } from "solid-js";

export default function SolveIntegral() {
  const [userAnswer, setUserAnswer] = createSignal("");
  const [result, setResult] = createSignal("");

  const correctAnswer = "0"; // <-- you set what the correct answer is here!

  const handleSubmit = () => {
    if (userAnswer().trim() === correctAnswer) {
      setResult("✅ Correct!");
    } else {
      setResult("❌ Try again!");
    }
  };

  return (
    <div class="text-center p-4">
      <div class="text-2xl font-bold mb-4">Solve this integral</div>

      <img src="/skill_test.png" alt="Integral Time :)" class="mx-auto mb-4" />

      <input
        type="text"
        value={userAnswer()}
        onInput={(e) => setUserAnswer(e.currentTarget.value)}
        placeholder="Enter your answer"
        class="border border-gray-300 rounded p-2 mb-4"
      />
      <br />

      <button
        onClick={handleSubmit}
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Submit
      </button>

      {result() && <div class="mt-4 text-xl">{result()}</div>}
    </div>
  );
}
