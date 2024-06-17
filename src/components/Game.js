import Board from "./Board.js";
import Menu from "./Menu.js";

import { useState } from "react";
import { openPeer } from "./peer.js";

const peerPromise = openPeer();
export default function Game() {
  const [peer, peerId] = peerPromise.read();
  const [connection, setConnection] = useState(null);
  const [player, setPlayer] = useState("*");

  peer.on("connection", (conn) => {
    setPlayer("o");
    setConnection(conn);
  });

  function handleConnection(conn) {
    setPlayer("x");
    setConnection(conn);
  }

  if (connection) return <Board player={player} connection={connection} />;
  return <Menu onConnection={handleConnection} peerId={peerId} peer={peer} />;
}
