import { Board, Player } from "./board.ts";

function assertEquals(actual: unknown, expected: unknown) {
  if (actual !== expected) {
    throw new Error(`Assertion failed: expected ${expected}, got ${actual}`);
  }
}

Deno.test("fallende Diagonale erzeugt Gewinner", () => {
  const b = new Board();

  b.makeMove(Player.PlayerX, 3);

  b.makeMove(Player.PlayerO, 2);
  b.makeMove(Player.PlayerX, 2);

  b.makeMove(Player.PlayerO, 1);
  b.makeMove(Player.PlayerO, 1);
  b.makeMove(Player.PlayerX, 1);

  b.makeMove(Player.PlayerO, 0);
  b.makeMove(Player.PlayerO, 0);
  b.makeMove(Player.PlayerO, 0);
  const r = b.makeMove(Player.PlayerX, 0);

  const winner = b.winner(Player.PlayerX, r, 0);
  assertEquals(winner, Player.PlayerX);
});
