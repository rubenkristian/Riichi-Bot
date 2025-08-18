import { Route, Router } from "@solidjs/router";
import { lazy } from "solid-js";

const Discord = lazy(() => import("./screen/Discord"));
const Login = lazy(() => import("./screen/Login"));
const Home = lazy(() => import("./screen/Home"));
const FetchTournament = lazy(() => import("./screen/FetchTournament"));

export default function App() {
  return (
    <Router>
      <Route path={"/"} component={Login} />
      <Route path={"/start-bot"} component={Discord} />
      <Route path={"/home"} component={Home} />
      <Route path={"/fetch-tournament"} component={FetchTournament} />
    </Router>
  );
}
