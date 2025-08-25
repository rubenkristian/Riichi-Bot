import { Navigate, Route, Router } from "@solidjs/router";
import { createSignal, lazy, onMount, Show } from "solid-js";
import { CheckSession } from "./wailsjs/go/main/App";

const Discord = lazy(() => import("./screen/Discord"));
const Login = lazy(() => import("./screen/Login"));
const Home = lazy(() => import("./screen/Home"));
const FetchTournament = lazy(() => import("./screen/FetchTournament"));
const DetailTournament = lazy(
  () => import("./screen/Tournament/DetailTournament"),
);
const ListMatch = lazy(() => import("./screen/Match/ListMatch"));
const RegisteredPlayer = lazy(() => import("./screen/RegisteredPlayer"));
const DetailScore = lazy(() => import("./screen/Score/DetailScore"));
const ListScore = lazy(() => import("./screen/Score/ListScore"));
const DetailMatch = lazy(() => import("./screen/Match/DetailMatch"));

export default function App() {
  const [loading, setLoading] = createSignal(true);
  const [isLoggedIn, setIsLoggedIn] = createSignal(false);

  onMount(async () => {
    if (!window.runtime) {
      console.warn("Wails runtime not ready yet");
      return;
    }
    try {
      const ok = await CheckSession();
      setIsLoggedIn(ok);
    } catch (e) {
      console.log(e);
      setIsLoggedIn(false);
    } finally {
      console.log("done");
      setLoading(false);
    }
  });

  return (
    <Show
      when={!loading()}
      fallback={
        <div class="flex justify-center items-center h-screen w-screen">
          <span class="loading loading-spinner loading-xl"></span>
        </div>
      }
    >
      <Router>
        <Route
          path={"/"}
          component={() =>
            isLoggedIn() ? <Navigate href="/start-bot" /> : <Login />
          }
        />
        <Route path={"/start-bot"} component={Discord} />
        <Route path={"/home"} component={Home} />
        <Route path={"/fetch-tournament"} component={FetchTournament} />
        <Route path={"/tournament/:id"} component={DetailTournament} />
        <Route path={"/tournament/:id/tables"} component={ListMatch} />
        <Route path={"/tournament/:id/tables/create"} component={DetailMatch} />
        <Route path={"/tournament/:id/scores"} component={ListScore} />
        <Route path={"/tournament/:id/scores/:match"} component={DetailScore} />
        <Route
          path={"/tournament/:id/players-registered"}
          component={RegisteredPlayer}
        />
      </Router>
    </Show>
  );
}
