import { query, useNavigate } from "@solidjs/router";
import Button from "../components/Button";
import { ListTournament, StopBot } from "../wailsjs/go/main/App";
import { createSignal, For, onMount } from "solid-js";
import { database } from "../wailsjs/go/models";

export default function Home() {
  const navigate = useNavigate();
  const pagination = new database.Pagination({
    Page: 1,
    Size: 10,
    SortBy: "id",
    Sort: "ASC",
    Search: "",
  });
  const [tournaments, setTournaments] = createSignal<
    Array<database.Tournament>
  >([]);

  onMount(async () => {
    const query = new database.PaginationTournament({
      Pagination: pagination,
    });

    const tournaments = await ListTournament(query);
    setTournaments(tournaments);
  });
  return (
    <div class="flex flex-col gap-1 px-2 mx-10">
      <div class="flex flex-row gap-1 items-center justify-between my-5">
        <h1 class="font-bold">Tournaments</h1>
        <div class="flex gap-1">
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
      </div>
      <div class="flex gap-1 flex-wrap">
        <For each={tournaments()}>
          {(item) => (
            <div class="card bg-primary text-primary-content w-full">
              <div class="card-body">
                <h2 class="card-title">{item.name}</h2>
                <p>{item.description}</p>
                <div class="card-actions justify-end">
                  <button
                    class="btn"
                    onClick={() => navigate(`/tournament/${item.id}`)}
                  >
                    Check
                  </button>
                </div>
              </div>
            </div>
          )}
        </For>
      </div>
    </div>
  );
}
