import Board from "./Board.js";
import Menu from "./Menu.js";

import { useState, useRef } from "react";
import { openPeer } from "./peer.js";
import Loading from "./Loading.js";
import { flushSync } from "react-dom";

const peerPromise = openPeer();
export default function Game() {
  const [peer, peerId] = peerPromise.read();

  const dialog = useRef(null);
  const [connected, setConnected] = useState(false);
  const [connection, setConnection] = useState(null);
  const [player, setPlayer] = useState("*");

  function addConnection(conn) {
    const id = setTimeout(() => {
      // failed to connection
      conn.close();
      flushSync(() => setConnection(null));
      dialog.current.showModal();
    }, 10000);

    conn.on("open", () => {
      clearTimeout(id);
      setConnected(true);
    });
    setConnection(conn);
  }

  peer.on("connection", (conn) => {
    setPlayer("o");
    addConnection(conn);
  });

  function handleConnection(conn) {
    setPlayer("x");
    addConnection(conn);
  }

  function handleBack() {
    if (!connection) return;
    connection.close();
    setConnection(null);
    setConnected(false);
  }

  if (connection) {
    if (connected)
      return (
        <Board player={player} onBack={handleBack} connection={connection} />
      );
    return <Loading />;
  }

  const closeModal = () => dialog.current.close();
  return (
    <>
      <dialog ref={dialog}>
        <p> <strong>Connection Timeout</strong> <br/> check you id or connectivity </p>
        <button onClick={closeModal}> back to menu </button>
      </dialog>
      <Menu onConnection={handleConnection} peerId={peerId} peer={peer} />
    </>
  );
}
