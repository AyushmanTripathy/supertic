export const maxCount = 6;

export function GameState() {
  return {
    isOver: false,
    winner: false,
    grid: new Array(9).fill(" "),
    moves: new Array(),
  };
}

export function gameStateReducer({ grid, moves }, { type, index, player }) {
  if (type) {
    if (type == "rematch") return new GameState();
    return new Error("wrong type!")
  }

  // prevent double clicks
  if (moves.includes(index)) return;

  const updatedGrid = grid.slice();
  const updatedMoves = [index, ...moves];

  updatedGrid[index] = player;

  if (updatedMoves.length > maxCount) {
    updatedGrid[updatedMoves.pop()] = " ";
  }

  const isWon = checkGridStatus(updatedGrid);
  if (isWon) {
    for (const place of isWon) updatedGrid[place] = "!" + updatedGrid[place];
  }

  return {
    isOver: isWon,
    winner: player,
    grid: updatedGrid,
    moves: updatedMoves,
  };
}

function checkGridStatus(grid) {
  const combinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const check = (c) =>
    grid[c[0]] != " " && grid[c[0]] == grid[c[1]] && grid[c[1]] == grid[c[2]];

  for (const combination of combinations) {
    if (check(combination)) return combination;
  }
  return false;
}
