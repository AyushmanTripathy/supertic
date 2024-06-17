import Game from "./components/Game.js";
import Layout from "./components/Layout.js";
import Loading from "./components/Loading.js";

import { Suspense } from "react";

function App() {
  return (
    <Layout>
      <Suspense fallback={<Loading />}>
        <Game />
      </Suspense>
    </Layout>
  );
}

export default App;
