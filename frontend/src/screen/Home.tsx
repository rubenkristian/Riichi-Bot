import { useNavigate } from "@solidjs/router";
import Button from "../components/Button";
import { ListTournament, StopBot } from "../wailsjs/go/main/App";
import { createSignal, For, onMount } from "solid-js";
import { database } from "../wailsjs/go/models";

export default function Home() {
  const navigate = useNavigate();
  const [tournaments, setTournaments] = createSignal<
    Array<database.Tournament>
  >([]);

  onMount(async () => {
    const query = new database.PaginationTournament({
      Pagination: new database.Pagination({
        Page: 1,
        Size: 10,
        SortBy: "id",
        Sort: "ASC",
        Search: "",
      }),
    });

    const tournaments = await ListTournament(query);
    setTournaments(tournaments);
  });
  return (
    <div class="flex flex-col gap-1 px-2">
      <h1>Tournaments</h1>
      <div class="flex gap-1 flex-wrap">
        <For each={tournaments()}>
          {(item) => <div class="flex w-full h-32">{item.description}</div>}
        </For>
      </div>
      <Button
        onClick={() => {
          navigate("/fetch-tournament");
        }}
      >
        Fetch Tournament
      </Button>
      <Button
        onClick={async () => {
          try {
            await StopBot();
            navigate("/start-bot");
          } catch (e) {
            alert(e);
          }
        }}
      >
        Stop Bot
      </Button>
    </div>
  );
}
