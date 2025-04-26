import { createSignal, For, createEffect } from "solid-js";

export default function MiniCaptcha() {
   const [images, setImages] = createSignal<
      { id: number; hasTree: boolean; selected: boolean }[]
   >([]);
   const [error, setError] = createSignal("");
   const [verified, setVerified] = createSignal(false);

   createEffect(() => {
      // Generate 9 squares randomly, some with trees
      const newImages = Array.from({ length: 9 }, (_, idx) => ({
         id: idx,
         hasTree: Math.random() < 0.4, // 40% chance of having a "tree"
         selected: false,
      }));
      setImages(newImages);
   });

   function toggleSelect(id: number) {
      setImages((prev) =>
         prev.map((img) =>
            img.id === id ? { ...img, selected: !img.selected } : img,
         ),
      );
   }

   function handleVerify() {
      const imgs = images();
      const selectedTrees = imgs.filter(
         (img) => img.hasTree && img.selected,
      ).length;
      const missedTrees = imgs.filter(
         (img) => img.hasTree && !img.selected,
      ).length;
      const wrongSelections = imgs.filter(
         (img) => !img.hasTree && img.selected,
      ).length;

      if (selectedTrees > 0 && missedTrees === 0 && wrongSelections === 0) {
         setVerified(true);
         setError("");
      } else {
         setError("❌ Incorrect selection. Try again!");
         setVerified(false);
      }
   }

   function handleSubmit() {
      if (!verified()) {
         setError("Please verify you are human!");
      } else {
         alert("✅ Captcha passed. Form submitted!");
      }
   }

   return (
      <div class="max-w-md mx-auto p-4">
         <h1 class="text-2xl font-bold mb-4">Captcha Challenge</h1>
         <p class="mb-2">Select all squares with trees 🌳</p>

         <div class="grid grid-cols-3 gap-2 mb-4">
            <For each={images()}>
               {(img) => (
                  <div
                     class={`border-2 rounded p-2 cursor-pointer text-center ${img.selected ? "border-blue-500 bg-blue-100" : "border-gray-300"}`}
                     onClick={() => toggleSelect(img.id)}
                  >
                     {img.hasTree ? "🌳" : "🏠"}
                     {img.selected && (
                        <span class="text-green-500 text-xl ml-2">✔️</span>
                     )}
                  </div>
               )}
            </For>
         </div>

         {error() && <div class="text-red-500 mb-2">{error()}</div>}

         <div class="flex gap-2">
            <button
               onClick={handleVerify}
               class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
               Verify
            </button>
            <button
               onClick={handleSubmit}
               class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            >
               Submit
            </button>
         </div>
      </div>
   );
}
