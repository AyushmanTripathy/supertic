import { useContext, useState } from "react";
import { checkGridStatus } from "./utils.js";
import { GameStatusContext } from "./GameStatusContext.js";
import "./Grid.css";

const maxCount = 6;

function ChildGrid({ highLight, player, onGridClick }) {
  const [grid, setGrid] = useState(Array(9).fill(" "));
  const [moves, setMoves] = useState([]);
  const [conquered, setConquered] = useState(false);
  const gameStatus = useContext(GameStatusContext);

  function handleCellClick(i) {
    return () => {
      if (grid[i] !== " " || gameStatus.isOver || conquered) return;
      const updatedGrid = grid.slice();
      updatedGrid[i] = player;

      const updatedMoves = [i, ...moves];
      if (updatedMoves.length > maxCount) {
        updatedGrid[updatedMoves.pop()] = " ";
      }

      const isWon = checkGridStatus(updatedGrid);
      if (isWon) {
        for (const place of isWon) 
          updatedGrid[place] = "!" + updatedGrid[place];
      }
      setMoves(updatedMoves);
      setGrid(updatedGrid);

      if (isWon) {
        setConquered({ conqueror: player, removeGrid: false });
        setTimeout(() => setConquered({ conqueror: player, removeGrid: true }), 2000);
        onGridClick(true);
      } else onGridClick(false);
    };
  }


  const selectClassNames = (c) => {
    let name = "cell";
    if (c[0] == "!") name += " hlCell";
    if (!conquered && !gameStatus.isOver) name +=  " selectableCell";
    return name;
  }

  const cells = [];
  for (let i = 0; i < 9; i++) {
    cells.push(
      <button
        key={i}
        className={selectClassNames(grid[i])}
        onClick={handleCellClick(i)}
      >
        {moves.at(-1) == i && moves.length + 1 > maxCount
          ? "*"
          : grid[i].at(-1)}
      </button>
    );
  }

  // grid is conquered
  if (conquered && conquered.removeGrid) {
    const name = "conqueredGrid" + (highLight ? " hlConqueredGrid" : "");
    return <div className={name}> {conquered.conqueror} </div>;
  }

  return <section className="childGrid grid">{cells}</section>;
}

export default ChildGrid;
