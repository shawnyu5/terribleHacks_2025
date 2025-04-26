import { useNavigate } from "@solidjs/router";
import { createSignal, Match, Switch } from "solid-js";

function Square(props: { value: string | null; onClick: () => void }) {
   return (
      <button
         class="square"
         onClick={props.onClick}
         style="width: 60px; height: 60px; font-size: 24px; font-weight: bold; margin: 5px;"
      >
         {props.value}
      </button>
   );
}

function Board(props: {
   squares: (string | null)[];
   onClick: (i: number) => void;
}) {
   return (
      <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 5px;">
         {props.squares.map((square, idx) => (
            <Square value={square} onClick={() => props.onClick(idx)} />
         ))}
      </div>
   );
}

enum GameResult {
   xWins,
   xLooses,
}
export default function Game() {
   const [squares, setSquares] = createSignal<(string | null)[]>(
      Array(9).fill(null),
   );
   const [xIsNext, setXIsNext] = createSignal(true);
   const [status, setStatus] = createSignal("Next player: X");
   const [gameResult, setGameResult] = createSignal<GameResult | null>(null);
   const [gameOver, setGameOver] = createSignal(false);
   const navigate = useNavigate()

   function handleClick(i: number) {
      if (gameOver() || squares()[i] || !xIsNext()) {
         return;
      }
      const nextSquares = [...squares()];
      nextSquares[i] = "X";
      setSquares(nextSquares);
      const winner = calculateWinner(nextSquares);

      if (winner) {
         setStatus("🎉 You win!");
         setGameOver(true);
         navigate("/rfid")
         return;
      }

      if (!nextSquares.includes(null)) {
         setStatus("😐 Draw!");
         setGameOver(true);
         return;
      }

      setXIsNext(false);
      setStatus("Next player: O");

      setTimeout(() => {
         if (!gameOver()) {
            makeAIMove();
         }
      }, 500);
   }

   function makeAIMove() {
      if (gameOver()) return;

      const currentSquares = squares();
      const emptyIndices = currentSquares
         .map((val, idx) => (val === null ? idx : null))
         .filter((val) => val !== null) as number[];

      if (emptyIndices.length === 0) return;

      const randomIndex =
         emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
      const nextSquares = [...currentSquares];
      nextSquares[randomIndex] = "O";
      setSquares(nextSquares);

      const winner = calculateWinner(nextSquares);

      if (winner) {
         setStatus("😢 You lost!");
         setGameOver(true);
         return;
      }

      if (!nextSquares.includes(null)) {
         setStatus("😐 Draw!");
         setGameOver(true);
         return;
      }

      setXIsNext(true);
      setStatus("Next player: X");
   }

   function restartGame() {
      setSquares(Array(9).fill(null));
      setXIsNext(true);
      setStatus("Next player: X");
      setGameOver(false);
   }

   return (
      <div
         class="game"
         style="display: flex; flex-direction: column; align-items: center; margin-top: 50px;"
      >
         <div
            class="status"
            style="margin-bottom: 20px; font-size: 24px; font-weight: bold;"
         >
            {status()}
         </div>

         <Board squares={squares()} onClick={handleClick} />

         <Switch>
            <Match when={gameResult() == GameResult.xWins}>
               <p>X wins, go to next page</p>
            </Match>
            <Match when={gameResult() == GameResult.xLooses}>
               <p>X looses, play again...</p>
            </Match>
            <Match when={gameResult() == null}>
               <p></p>
            </Match>
         </Switch>
      </div>
   );
}

function calculateWinner(squares: (string | null)[]) {
   const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
   ];
   for (const [a, b, c] of lines) {
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
         return squares[a];
      }
   }
   return null;
}
