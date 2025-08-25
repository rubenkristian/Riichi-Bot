import { useNavigate, useParams } from "@solidjs/router";
import Button from "../../components/Button";
import {
  FetchScoreTurnament,
  GetTournamentMatchList,
} from "../../wailsjs/go/main/App";
import {
  createEffect,
  createSignal,
  For,
  Index,
  onCleanup,
  onMount,
  Show,
} from "solid-js";
import { database } from "../../wailsjs/go/models";

export default function ListScore() {
  const navigate = useNavigate();
  const params = useParams();
  const [page, setPage] = createSignal<number>(0);
  const [loadNext, setLoadNext] = createSignal<boolean>(true);
  const [syncScore, setSyncScore] = createSignal<boolean>(false);
  const [tournamentMatch, setTournamentMatch] = createSignal<
    Array<database.TournamentMatch>
  >([]);
  const pagination = new database.Pagination();
  const query = new database.PaginationMatch();
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
      const tournamentMatches = await GetTournamentMatchList(+params.id, query);
      setTournamentMatch((prev) => [...prev, ...tournamentMatches]);
      if (tournamentMatches.length != 10) {
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
    <div class="flex flex-col gap-1 mx-10 my-4">
      <div class="flex justify-between">
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
        <Button
          onClick={async () => {
            try {
              setSyncScore(true);
              await FetchScoreTurnament(+params.id);
              setTournamentMatch([]);
              setPage(1);
              setLoadNext(true);
              loadMore();
            } catch (e) {
              alert(e);
            } finally {
              setSyncScore(false);
            }
          }}
        >
          <Show when={syncScore()}>
            <span class="loading loading-spinner"></span>
          </Show>
          Sync Score Tournament
        </Button>
      </div>
      <div class="flex flex-col mt-4 gap-2">
        <For each={tournamentMatch()}>
          {(data) => (
            <a
              href="#"
              onClick={() => {
                navigate(`/tournament/${params.id}/scores/${data.id}`);
              }}
              class="card dark:bg-blue-900 bg-base-100 w-full shadow-sm"
            >
              <div class="card-body">
                <h2 class="card-title">
                  {data.id} ({data.created_at})
                </h2>
                <Index each={data.TournamentMatchPlayers}>
                  {(player) => (
                    <span>
                      Name: {player().Player.riichi_city_name} (
                      {player().player_id})
                    </span>
                  )}
                </Index>
              </div>
            </a>
          )}
        </For>
        <div ref={sentinel} class="p-2 text-center text-gray-500">
          <Show when={loadNext()}>Loading more…</Show>
        </div>
      </div>
    </div>
  );
}
