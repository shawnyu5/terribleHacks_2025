import { createSignal, For, Show } from "solid-js";

function Square(props: { value: string | null; onSquareClick: () => void }) {
  return (
    <button class="square" onClick={props.onSquareClick}>
      {props.value}
    </button>
  );
}

function Board(props: {
  xIsNext: boolean;
  squares: (string | null)[];
  onPlay: (squares: (string | null)[]) => void;
  gameOver: boolean;
}) {
  function handleClick(i: number) {
    if (
      calculateWinner(props.squares) ||
      props.squares[i] ||
      !props.xIsNext ||
      props.gameOver
    ) {
      return;
    }
    const nextSquares = props.squares.slice();
    nextSquares[i] = "X";
    props.onPlay(nextSquares);
  }

  const winner = calculateWinner(props.squares);
  const status = winner
    ? `Winner: ${winner}`
    : `Next player: ${props.xIsNext ? "X" : "O"}`;

  return (
    <>
      <div class="status">{status}</div>
      <div class="board-row">
        <Square value={props.squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={props.squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={props.squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div class="board-row">
        <Square value={props.squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={props.squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={props.squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div class="board-row">
        <Square value={props.squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={props.squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={props.squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  );
}

export default function Game() {
  const [history, setHistory] = createSignal<(string | null)[][]>([
    Array(9).fill(null),
  ]);
  const [currentMove, setCurrentMove] = createSignal(0);
  const [gameOver, setGameOver] = createSignal(false);
  const [endMessage, setEndMessage] = createSignal("");

  const xIsNext = () => currentMove() % 2 === 0;
  const currentSquares = () => history()[currentMove()];

  function handlePlay(nextSquares: (string | null)[]) {
    const nextHistory = [...history().slice(0, currentMove() + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);

    const winner = calculateWinner(nextSquares);

    if (winner === "O") {
      setEndMessage("😢 You lost! Play again?");
      setGameOver(true);
      return;
    }

    if (!winner && !nextSquares.includes(null)) {
      setEndMessage("😐 It's a draw! Play again?");
      setGameOver(true);
      return;
    }

    if (!winner && nextSquares.includes(null)) {
      setTimeout(() => {
        makeAIMove(nextSquares);
      }, 500);
    }
  }

  function makeAIMove(squares: (string | null)[]) {
    const emptyIndices = squares
      .map((val, idx) => (val === null ? idx : null))
      .filter((val) => val !== null) as number[];

    if (emptyIndices.length === 0) return;

    const randomIndex =
      emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
    const nextSquares = squares.slice();
    nextSquares[randomIndex] = "O";

    const nextHistory = [...history().slice(0, currentMove() + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);

    const winner = calculateWinner(nextSquares);
    if (winner === "O") {
      setEndMessage("😢 You lost! Play again?");
      setGameOver(true);
    } else if (!winner && !nextSquares.includes(null)) {
      setEndMessage("😐 It's a draw! Play again?");
      setGameOver(true);
    }
  }

  function jumpTo(nextMove: number) {
    setCurrentMove(nextMove);
  }

  function restartGame() {
    setHistory([Array(9).fill(null)]);
    setCurrentMove(0);
    setGameOver(false);
    setEndMessage("");
  }

  return (
    <div class="game">
      <div class="game-board">
        <Board
          xIsNext={xIsNext()}
          squares={currentSquares()}
          onPlay={handlePlay}
          gameOver={gameOver()}
        />
        <Show when={gameOver()}>
          <div class="game-over">
            <p class="text-xl font-bold mt-4">{endMessage()}</p>
            <button
              onClick={restartGame}
              class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-2"
            >
              Play Again
            </button>
          </div>
        </Show>
      </div>
      <div class="game-info">
        <ol>
          <For each={history()}>
            {(squares, move) => (
              <li>
                <button onClick={() => jumpTo(move)}>
                  {move > 0 ? `Go to move #${move}` : "Go to game start"}
                </button>
              </li>
            )}
          </For>
        </ol>
      </div>
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
  for (let [a, b, c] of lines) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
