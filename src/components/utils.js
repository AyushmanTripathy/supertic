// check if player won
// with normal tic tac toe rules
export function checkGridStatus(grid) {
  const combinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ];

  const check = (c) =>
    grid[c[0]] != " " && grid[c[0]] == grid[c[1]] && grid[c[1]] == grid[c[2]];

  for (const combination of combinations) {
    if (check(combination)) return combination;
  }
  return false;
}
