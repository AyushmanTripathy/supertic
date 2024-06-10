import { useContext, useState } from "react";
import { checkGridStatus } from "./utils.js"
import { GameStatusContext } from "./GameStatusContext.js";
import "./Grid.css";

const maxCount = 6;

function ChildGrid({ player, onGridClick }) {
  const [grid, setGrid] = useState(Array(9).fill(" "));
  const [moves, setMoves] = useState([]);
  const [conquered, setConquered] = useState(false);
  const gameStatus = useContext(GameStatusContext);

  function handleCellClick(i) {
    return () => {
      if (grid[i] !== " " || gameStatus.isOver) return;
      const updatedGrid = grid.slice();
      updatedGrid[i] = player;

      const updatedMoves = [i, ...moves];
      if (updatedMoves.length > maxCount) {
        updatedGrid[updatedMoves.pop()] = " ";
      }

      const isWon = checkGridStatus(updatedGrid);
      setMoves(updatedMoves);
      setGrid(updatedGrid);

      if (isWon) {
        setConquered(player);
        onGridClick(true)
      }
      else onGridClick(false);
    };
  }

  const cells = [];
  for (let i = 0; i < 9; i++) {
    cells.push(
      <button key={i} className="cell" onClick={handleCellClick(i)}>
        {moves.at(-1) == i && moves.length + 1 > maxCount ? "*" : grid[i]}
      </button>
    );
  }

  // grid is conquered
  if (conquered) return <div className="conqueredGrid"> {conquered} </div>;

  return <section className="childGrid grid">{cells}</section>;
}

export default ChildGrid;
