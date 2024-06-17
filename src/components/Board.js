import { useEffect, useReducer, useRef, useState } from "react";

import { gameStateReducer, GameState } from "./GameState.js";
import Grid from "./Grid.js";

import "./Board.css";

function Board({ player, connection, onBack }) {
  const opponent = player == "x" ? "o" : "x";

  const dialog = useRef(null);
  const [isTurn, setIsTurn] = useState(player == "x");
  const [gameState, dispatch] = useReducer(gameStateReducer, new GameState());

  useEffect(() => {
    connection.on("data", ({ type, index }) => {
      if (type) return dispatch({ type });
      console.log("opponent's move on " + index);
      dispatch({ player: opponent, index });
      setIsTurn(true);
    });
    connection.on("close", () => {
      console.log("Opponent Disconnected!");
      dialog.current.showModal();
    })
    return () => connection.off("data");
  }, []);

  function handleClick(index) {
    return () => {
      if (!isTurn || gameState.grid[index] != " ") return;
      dispatch({ player, index });
      console.log("sending move to opponent " + index);
      connection.send({ index });
      setIsTurn(false);
    };
  }

  function rematch() {
    dispatch({
      type: "rematch",
    });
    connection.send({ type: "rematch" });
  }

  console.log(gameState, isTurn);
  const title = () => {
    if (gameState.isOver) {
      if (gameState.winner == player) return `You won (${player})`;
      return `Opponent won (${opponent})`;
    } else if (isTurn) return `Your move as (${player})`;
    else return `Waiting for opponent (${opponent})`;
  };

  return (
    <main className="board">
      <button onClick={onBack}> back to menu </button>
      <dialog ref={dialog}>
        <p> Your Opponent Disconnected ! </p>
        <button autoFocus={true} onClick={onBack}> back to menu </button>
      </dialog>
      <p> {title()} </p>
      {gameState.isOver && <button onClick={rematch}> rematch </button>}
      <Grid
        grid={gameState.grid}
        moves={gameState.moves}
        isTakingInput={isTurn && !gameState.isOver}
        onCellClick={handleClick}
      />
    </main>
  );
}

export default Board;
