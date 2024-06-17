import { useState } from "react";
import "./Menu.css";

export default function Menu({ peerId, peer, onConnection }) {
  const [opponentId, setOpponentId] = useState("");

  function connectWithOpponent() {
    if (!opponentId) return;
    console.log("connecting with " + opponentId);
    const conn = peer.connect(opponentId);
    onConnection(conn);
  }

  function copyId() {
    if (navigator.clipboard) {
      if (navigator.clipboard.writeText(peerId));
    } else alert("clipboard support not available");
  }

  function shareWebsite() {
    if (navigator.share) {
      navigator.share({
        url: "https://supertic.netlify.app"
      })
    } else alert("web share not supported")
  }

  return (
    <main className="menu">
      <p> Share your id with your friend </p>
      <strong> {peerId} </strong>
      <button onClick={copyId}> copy id </button>
      <p>Or paste their id to join them </p>
      <input
        type="text"
        placeholder="your opponent's id"
        value={opponentId}
        onChange={(e) => setOpponentId(e.target.value)}
      />
      <button onClick={connectWithOpponent}> Connect </button>
      <p> Alone? Invite a friend </p>
      <button onClick={shareWebsite}> Share </button>
    </main>
  );
}
