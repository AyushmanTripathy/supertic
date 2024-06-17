import { useState } from "react";

export default function Menu({ peerId, peer, onConnection }) {
  const [opponentId, setOpponentId] = useState("");

  function connectWithOpponent() {
    if (!opponentId) return;
    console.log("connecting with " + opponentId);
    const conn = peer.connect(opponentId);
    console.log("connected succefully");
    onConnection(conn);
  }

  return (
    <main className="menu">
      <p>
        your id is
        <strong> {peerId} </strong>
        .share it with your friend
      </p>
      <input
        type="text"
        placeholder="your opponent's id"
        value={opponentId}
        onChange={(e) => setOpponentId(e.target.value)}
      />
      <button onClick={connectWithOpponent}> Connect </button>
    </main>
  );
}
