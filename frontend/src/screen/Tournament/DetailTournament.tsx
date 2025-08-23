import { useNavigate, useParams } from "@solidjs/router";
import {
  createResource,
  createSignal,
  onMount,
  Show,
  Suspense,
} from "solid-js";
import {
  DetailDataTournament,
  SendPlayerInvite,
} from "../../wailsjs/go/main/App";
import { database } from "../../wailsjs/go/models";

export default function DetailTournament() {
  const navigate = useNavigate();
  const params = useParams();
  const [sendInvited, setSendInvited] = createSignal<boolean>(false);
  const [tournament] = createResource(async () => {
    return await DetailDataTournament(Number(params.id));
  });

  return (
    <Suspense
      fallback={
        <div class="flex justify-center items-center h-screen w-screen">
          <span class="loading loading-spinner loading-xl"></span>
        </div>
      }
    >
      <div class="hero bg-base-200 min-h-screen">
        <div class="hero-content flex-col lg:flex-row-reverse">
          <div>
            <h1 class="text-5xl font-bold">{tournament()?.name}</h1>
            <p class="py-6">{tournament()?.description}</p>
            <div class="flex gap-1">
              <button class="btn btn-primary" onClick={() => history.back()}>
                Back to Home
              </button>
              <button
                class="btn btn-primary"
                onClick={() => {
                  navigate(`/tournament/${params.id}/scores`);
                }}
              >
                Scores
              </button>
              <button
                class="btn btn-primary"
                onClick={() => {
                  navigate(`/tournament/${params.id}/tables`);
                }}
              >
                Tables
              </button>
              <button
                class="btn btn-primary"
                onClick={async () => {
                  try {
                    setSendInvited(true);
                    await SendPlayerInvite(Number(params.id));
                    alert("Success send invited");
                  } catch (e) {
                    alert(e);
                  } finally {
                    setSendInvited(false);
                  }
                }}
              >
                <Show when={sendInvited()}>
                  <span class="loading loading-spinner"></span>
                </Show>
                Invite To Riichi Tournament
              </button>
              <button
                class="btn btn-primary"
                onClick={() => {
                  navigate(`/tournament/${params.id}/players-registered`);
                }}
              >
                Registered Players
              </button>
            </div>
          </div>
        </div>
      </div>
    </Suspense>
  );
}
