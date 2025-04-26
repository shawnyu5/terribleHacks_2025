import { useNavigate } from "@solidjs/router";
import { createSignal, Match, Show, Switch } from "solid-js";

enum TestResult {
   correct,
   incorrect,
}
export default function SolveIntegral() {
   const [userAnswer, setUserAnswer] = createSignal("");
   const [result, setResult] = createSignal<TestResult | null>(null);
   const navigate = useNavigate();

   const correctAnswer = "0"; // <-- you set what the correct answer is here!

   const handleSubmit = () => {
      if (userAnswer().trim() === correctAnswer) {
         setResult(TestResult.correct);
         // setResult("✅ Correct!");
      } else {
         setResult(TestResult.incorrect);
         // setResult("❌ Try again!");
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

         <Switch>
            <Match when={result() == TestResult.correct}>
               <p>✅ Correct!</p>
               <button
                  onClick={() => {
                     navigate("/captcha");
                  }}
               >
                  Login
               </button>
            </Match>
            <Match when={result() == null}>
               <p></p>
            </Match>
            <Match when={result() == TestResult.incorrect}>
               <p>❌ Try again!</p>
            </Match>
         </Switch>
      </div>
   );
}
