export default function Layout({ children }) {
  return (
    <main className="layout">
      <header>
        <h2> SuperTic </h2>
        <p>
          The Good Old Tic Tac Toe <br /> with a Twist ;)
        </p>
      </header>
      {children}
      <footer>
        <p>
          Made with React, WebRTC, PeerJS and ❤  by
          <a href="https://github.com/AyushmanTripathy"> @AyushmanTripathy </a>
        </p>
      </footer>
    </main>
  );
}
