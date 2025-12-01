export enum Player {
  Nobody = ".",
  PlayerX = "X",
  PlayerO = "O",
}

const height = 6;
const width = 7;

export class Board {
  private fields: Player[][];

  constructor() {
    this.fields = Array.from({ length: height }, () =>
        Array.from({ length: width }, () => Player.Nobody),
    );
  }

  print(): string {
    let output = "";
    for (let r = 0; r < height; r++) {
      for (let c = 0; c < width; c++) {
        output += this.fields[r][c] + " ";
      }
      output += "\n";
    }
    output += "\n0 1 2 3 4 5 6\n";
    return output;
  }

  makeMove(player: Player, col: number): number {
    if (col < 0 || col >= width) return -1;

    for (let r = height - 1; r >= 0; r--) {
      if (this.fields[r][col] === Player.Nobody) {
        this.fields[r][col] = player;
        return r;
      }
    }
    return -1;
  }

  winner(player: Player, row: number, col: number): Player {
    if (row === -1 || col === -1) return Player.Nobody;

    if (this.horizontalWinner(player, row)) return player;
    if (this.verticalWinner(player, col)) return player;
    if (this.diagonalWinner(player, row, col)) return player;

    return Player.Nobody;
  }

  private horizontalWinner(player: Player, r: number): boolean {
    let count = 0;
    for (let c = 0; c < width; c++) {
      count = this.fields[r][c] === player ? count + 1 : 0;
      if (count >= 4) return true;
    }
    return false;
  }

  private verticalWinner(player: Player, col: number): boolean {
    let count = 0;
    for (let r = 0; r < height; r++) {
      count = this.fields[r][col] === player ? count + 1 : 0;
      if (count >= 4) return true;
    }
    return false;
  }

  private diagonalWinner(player: Player, row: number, col: number): boolean {
    const diagonals = this.getDiagonals(row, col);

    for (const diag of diagonals) {
      let count = 0;
      for (const field of diag) {
        count = field === player ? count + 1 : 0;
        if (count >= 4) return true;
      }
    }
    return false;
  }

  private getDiagonals(row: number, col: number): Player[][] {
    const rising: Player[] = [];
    const falling: Player[] = [];

    let r = row;
    let c = col;
    while (r < height - 1 && c > 0) {
      r++;
      c--;
    }
    while (r >= 0 && c < width) {
      rising.push(this.fields[r][c]);
      r--;
      c++;
    }

    r = row;
    c = col;
    while (r > 0 && c > 0) {
      r--;
      c--;
    }
    while (r < height && c < width) {
      falling.push(this.fields[r][c]);
      r++;
      c++;
    }

    return [rising, falling];
  }
}
