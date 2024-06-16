import Game from "./components/Game.js";
import Loading from "./components/Loading.js";

import { Suspense } from "react";

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <Game />
    </Suspense>
  )
}

export default App;
