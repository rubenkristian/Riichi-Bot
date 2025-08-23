import { useParams } from "@solidjs/router";
import Button from "../../components/Button";
import {
  FetchDetailTournamentMatch,
  FetchLog,
  GetDetailTournamentMatch,
} from "../../wailsjs/go/main/App";
import {
  createResource,
  createSignal,
  For,
  Index,
  Show,
  Suspense,
} from "solid-js";

export default function DetailScore() {
  const params = useParams();
  const [syncDetailScore, setSyncDetailScore] = createSignal<boolean>(false);
  const [tournamentMatch] = createResource(async () => {
    return await GetDetailTournamentMatch(params.match);
  });

  return (
    <Suspense
      fallback={
        <div class="flex justify-center items-center h-screen w-screen">
          <span class="loading loading-spinner loading-xl"></span>
        </div>
      }
    >
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
                setSyncDetailScore(true);
                await FetchDetailTournamentMatch(
                  tournamentMatch()?.id ?? "",
                  tournamentMatch()?.pai_pu_id ?? "",
                );
              } catch (e) {
                alert(e);
              } finally {
                setSyncDetailScore(false);
              }
            }}
          >
            <Show when={syncDetailScore()}>
              <span class="loading loading-spinner"></span>
            </Show>
            Sync Score Tournament Table
          </Button>
        </div>
        <div class="flex flex-col mt-4 gap-2">
          <Index each={tournamentMatch()?.TournamentMatchPlayers}>
            {(player) => (
              <span>
                Name: {player().Player.riichi_city_name} ({player().player_id})
              </span>
            )}
          </Index>
        </div>
      </div>
    </Suspense>
  );
}
