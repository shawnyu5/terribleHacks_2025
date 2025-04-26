import { APIEvent } from "solid-start";
import { spawn } from "child_process";
import path from "path";

export async function GET({ request }: APIEvent) {
  return new Response(
    await new Promise((resolve, reject) => {
      const pythonPath = "python"; // or "python3" depending on your system
      const scriptPath = path.resolve(__dirname, "../tinyterriblesudoku.py"); 
      // ".." because API routes are in `src/routes/api/`, 
      // but if you put everything flat in `sudoku/`, 
      // you might just use `path.resolve("./tinyterriblesudoku.py")`

      const process = spawn(pythonPath, [scriptPath]);

      let output = "";
      process.stdout.on("data", (data) => {
        output += data.toString();
      });

      process.stderr.on("data", (data) => {
        output += "Error: " + data.toString();
      });

      process.on("close", () => {
        resolve(output);
      });

      process.on("error", (err) => {
        reject(err);
      });
    }),
    { status: 200 }
  );
}