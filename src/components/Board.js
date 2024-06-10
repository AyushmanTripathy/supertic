import { useState } from "react";

import ParentGrid from "./ParentGrid.js";
import { GameStatusContext } from "./GameStatusContext.js";

import "./Board.css";

function Board() {
  const [player, setPlayer] = useState("x");
  const [gameStatus, setGameStatus] = useState({
    isOver: false,
    isDraw: false,
  });

  function handlePlayerMove(isOver, isDraw) {
    if (gameStatus.isOver) return;

    if (isOver) {
      setGameStatus({ isOver, isDraw });
    } else setPlayer(player == "x" ? "o" : "x");
  }

  const title = () => {
    if (gameStatus.isOver) return gameStatus.isDraw ? "Draw" : player + " won";
    return player + " 's move";
  };
  return (
    <GameStatusContext.Provider value={gameStatus}>
      <main className="board">
        <p> {title()} </p>
        <ParentGrid player={player} onPlayerMove={handlePlayerMove} />
      </main>
    </GameStatusContext.Provider>
  );
}

export default Board;
