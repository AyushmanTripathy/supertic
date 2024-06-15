import Board from "./components/Board.js";
import Loading from "./components/Loading.js";
import Menu from "./components/Menu.js";

import { Peer } from "peerjs";
import { PeerConfig } from "./components/utils.js";
import { useEffect, useState } from "react";

function App() {
  const [connection, setConnection] = useState(null);
  const [peer, setPeer] = useState(null);
  const [peerId, setPeerId] = useState(null);
  const [player, setPlayer] = useState("*");

  useEffect(() => {
    const newPeer = new Peer({ config: PeerConfig });
    newPeer.on("open", (id) => {
      console.log("Peer opened ...");
      setPeer(newPeer);
      setPeerId(id);
    });
    newPeer.on("connection", (conn) => {
      setPlayer("o");
      setConnection(conn);
    })
    return () => newPeer.destroy();
  }, []);

  function handleConnection(conn) {
    setPlayer("x");
    setConnection(conn);
  }

  if (!peerId) return <Loading />;
  if (connection) return <Board player={player} connection={connection}/>;
  return <Menu onConnection={handleConnection} peerId={peerId} peer={peer}/>
}

export default App;
