import { useNavigate } from "@solidjs/router";
import Button from "../components/Button";
import { ListTournament, StopBot } from "../wailsjs/go/main/App";
import { createSignal, For, onCleanup, onMount, Show } from "solid-js";
import { database } from "../wailsjs/go/models";

export default function Home() {
  const navigate = useNavigate();
  const [page, setPage] = createSignal<number>(0);
  const [loadNext, setLoadNext] = createSignal<boolean>(true);
  const pagination = new database.Pagination();
  const query = new database.PaginationTournament({
    Pagination: pagination,
  });
  const [tournaments, setTournaments] = createSignal<
    Array<database.Tournament>
  >([]);
  let sentinel!: HTMLDivElement; // ref for the bottom div

  const loadMore = async () => {
    if (!loadNext()) return;
    pagination.Page = page();
    pagination.Search = "";
    pagination.Size = 10;
    pagination.Sort = "DESC";
    pagination.SortBy = "created_at";
    query.Pagination = pagination;
    try {
      const tournaments = await ListTournament(query);
      setTournaments((prev) => [...prev, ...tournaments]);
      if (tournaments.length != 10) {
        setLoadNext(false);
        return;
      }
    } catch (e) {
      alert(e);
    }
  };

  onMount(async () => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setPage((prev) => prev + 1);
        loadMore();
      }
    });

    observer.observe(sentinel);

    onCleanup(() => observer.disconnect());
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
        <Show when={loadNext()}>
          <div ref={sentinel} class="p-2 text-center text-gray-500">
            Loading more…
          </div>
        </Show>
      </div>
    </div>
  );
}
