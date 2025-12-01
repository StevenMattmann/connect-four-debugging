import { Board, Player } from "./board.ts";

const board = new Board();
let player = Player.PlayerX;

while (true) {
  console.clear();
  console.log(board.print());
  const input = prompt(`Player ${player} (0-6):`);

  if (input === null) continue;

  const col = Number.parseInt(input);
  if (Number.isNaN(col)) continue;

  const row = board.makeMove(player, col);
  if (row === -1) continue;

  const winner = board.winner(player, row, col);
  if (winner !== Player.Nobody) {
    console.clear();
    console.log(board.print());
    console.log(`Player ${winner} wins!`);
    break;
  }

  player = player === Player.PlayerX ? Player.PlayerO : Player.PlayerX;
}
