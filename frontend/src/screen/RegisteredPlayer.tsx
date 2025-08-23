import {
  createEffect,
  createSignal,
  For,
  onCleanup,
  onMount,
  Show,
} from "solid-js";
import { database } from "../wailsjs/go/models";
import { GetRegisteredPlayers } from "../wailsjs/go/main/App";
import { useParams } from "@solidjs/router";

export default function RegisteredPlayer() {
  const params = useParams();
  const [registeredPlayers, setRegisteredPlayers] = createSignal<
    Array<database.RegisterTournament>
  >([]);
  const [page, setPage] = createSignal<number>(0);
  const [loadNext, setLoadNext] = createSignal<boolean>(true);
  let sentinel!: HTMLDivElement; // ref for the bottom div
  const pagination = new database.Pagination();

  const loadMore = async () => {
    if (!loadNext()) return;
    pagination.Page = page();
    pagination.Search = "";
    pagination.Size = 100;
    pagination.Sort = "ASC";
    pagination.SortBy = "id";
    try {
      const registedPlayer = await GetRegisteredPlayers(+params.id, pagination);
      setRegisteredPlayers((prev) => [...prev, ...registedPlayer]);
      if (registedPlayer.length != 10) {
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

  createEffect(() => {
    console.log(loadNext());
  });

  return (
    <div class="flex flex-col gap-1 mx-10 my-4">
      <div class="flex">
        <a
          class="flex items-center justify-center h-10 w-10 rounded-full bg-white shadow hover:bg-gray-100"
          onClick={() => history.back()}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="black"
            stroke-width="2"
            class="h-6 w-6"
            aria-hidden="true"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </a>
      </div>
      <div class="flex flex-col mt-4 gap-1">
        <For each={registeredPlayers()}>
          {(data) => (
            <div class="card dark:bg-blue-900 bg-base-100 w-full shadow-sm">
              <div class="card-body">
                <h2 class="card-title">{data.Player.discord_name}</h2>
                <p>Discord Id: {data.Player.discord_id}</p>
                <p>Riichi: {data.Player.riichi_city_name}</p>
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
