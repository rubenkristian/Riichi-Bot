import { useParams } from "@solidjs/router";
import Button from "../../components/Button";
import {
  FetchDetailTournamentMatch,
  FetchLog,
  GetDetailTournamentMatch,
  SubmitPoint,
} from "../../wailsjs/go/main/App";
import {
  createEffect,
  createResource,
  createSignal,
  For,
  Index,
  onMount,
  Show,
  Suspense,
} from "solid-js";
import TextInput from "../../components/Form/TextInput";

export default function DetailScore() {
  const params = useParams();
  const [syncDetailScore, setSyncDetailScore] = createSignal<boolean>(false);
  const [penaltyPlayer, setPenaltyPlayer] = createSignal<Array<number>>([
    0, 0, 0, 0,
  ]);
  const [submitPointStatus, setPointStatus] = createSignal<Array<boolean>>([
    false,
    false,
    false,
    false,
  ]);
  const [tournamentMatch] = createResource(async () => {
    const detailTournamentMatch = await GetDetailTournamentMatch(params.match);
    const penalties = [];
    for (const playerMatch of detailTournamentMatch?.TournamentMatchPlayers ??
      []) {
      penalties.push(playerMatch.penalty / 10);
      console.log(playerMatch);
    }
    console.log(penalties);
    setPenaltyPlayer(penalties);

    return detailTournamentMatch;
  });

  createEffect(() => {
    console.log(penaltyPlayer());
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
        <div class="flex flex-col mt-4 gap-4">
          <Index each={tournamentMatch()?.TournamentMatchPlayers}>
            {(player, index) => (
              <div class="flex flex-col gap-1">
                <label>Player {index + 1}</label>
                <p>
                  Name: {player().Player.riichi_city_name} ({player().player_id}
                  )
                </p>
                <p>Score: {player().score}</p>
                <p>Point: {player().point / 10}</p>
                <Show when={player().final_point != 0}>
                  <p>Final Point: {player().final_point / 10}</p>
                </Show>
                <TextInput
                  label="Penalty"
                  placeholder="Type Tournament Id"
                  type="number"
                  value={penaltyPlayer()[index].toString()}
                  onChange={(val: string) => {
                    const penalties = penaltyPlayer();
                    penalties[index] = +val;
                    setPenaltyPlayer(penalties);
                  }}
                />
                <Button
                  onClick={async () => {
                    const pointStatus = submitPointStatus();
                    pointStatus[index] = true;
                    setPointStatus(pointStatus);
                    try {
                      const penalties = penaltyPlayer();
                      await SubmitPoint(player().id, penalties[index]);
                    } catch (e) {
                      alert(e);
                    } finally {
                      pointStatus[index] = false;
                      setPointStatus(pointStatus);
                    }
                  }}
                >
                  <Show when={submitPointStatus()[index]}>
                    <span class="loading loading-spinner"></span>
                  </Show>
                  Submit
                </Button>
              </div>
            )}
          </Index>
        </div>
      </div>
    </Suspense>
  );
}
