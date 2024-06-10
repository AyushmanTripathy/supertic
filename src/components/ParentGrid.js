import ChildGrid from "./ChildGrid.js";
import { checkGridStatus } from "./utils.js";
import { useState } from "react";
import "./Grid.css";

function ParentGrid({ player, onPlayerMove }) {
  const [grids, setGrids] = useState(Array(9).fill(" "));

  function handleGridClick(i) {
    return (isConquered) => {
      if (isConquered) {
        const updatedGrids = grids.slice();
        updatedGrids[i] = player;
        const isWon = checkGridStatus(updatedGrids);
        setGrids(updatedGrids);

        if (isWon) {
          const highLightedGrids = updatedGrids.slice();
          for (const place of isWon)
            highLightedGrids[place] = "!" + highLightedGrids[place];
          setTimeout(() => setGrids(highLightedGrids), 2500);
        }

        if (isWon) return onPlayerMove(true, false);
        else if (!updatedGrids.includes(" ")) return onPlayerMove(true, true);
      }
      onPlayerMove(false, false);
    };
  }

  const childGrids = [];
  for (let i = 0; i < 9; i++) {
    childGrids.push(
      <ChildGrid
        highLight={grids[i][0] == "!"}
        key={i}
        player={player}
        onGridClick={handleGridClick(i)}
      />
    );
  }
  return <section className="parentGrid grid">{childGrids}</section>;
}

export default ParentGrid;
