import { createSignal } from "solid-js";

const quiz = {
   image: "/geoguesser/mongolia_ulaanbaatar_city.jpg",
   correctAnswer: "Paris", // <-- correct answer
   choices: ["Paris", "New York", "Tokyo", "Rome"], // <-- choices shown
};

export default function SimpleGeoGuessr() {
   const [feedback, setFeedback] = createSignal("");

   function handleGuess(guess: string) {
      if (guess === quiz.correctAnswer) {
         setFeedback("✅ Correct!");
      } else {
         setFeedback(`❌ Wrong! It was ${quiz.correctAnswer}.`);
      }
   }

   return (
      <div class="text-center p-4">
         <h1 class="text-2xl font-bold mb-4">Where is this place?</h1>

         <img
            src={quiz.image}
            alt="Guess the location"
            class="w-96 mx-auto mb-4 rounded"
         />

         <div class="flex flex-wrap justify-center gap-4 mb-4">
            {quiz.choices.map((choice) => (
               <button
                  onClick={() => handleGuess(choice)}
                  class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
               >
                  {choice}
               </button>
            ))}
         </div>

         {feedback() && <div class="mt-4 text-xl font-semibold">{feedback()}</div>}
      </div>
   );
}
