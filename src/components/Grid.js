import { maxCount } from "./GameState.js";
import "./Grid.css";

export default function Grid({ moves, grid, isTakingInput, onCellClick }) {
  const selectClassNames = (c) => {
    let name = "cell";
    if (c[0] == "!") name += " hlCell";
    if (isTakingInput && c == " ") name += " selectableCell";
    return name;
  };

  const cells = [];
  for (let i = 0; i < 9; i++) {
    cells.push(
      <button
        key={i}
        className={selectClassNames(grid[i])}
        onClick={isTakingInput ? onCellClick(i) : () => {}}
      >
        {moves.at(-1) == i && moves.length + 1 > maxCount
          ? "*"
          : grid[i].at(-1)}
      </button>
    );
  }

  return <section className="infiniteGrid grid">{cells}</section>;
}
