import { useParams } from "@solidjs/router";
import Button from "../../components/Button";
import { FetchScoreTurnament } from "../../wailsjs/go/main/App";
import { createSignal, Show } from "solid-js";

export default function DetailMatch() {
  const params = useParams();
  const [syncScore, setSyncScore] = createSignal<boolean>(false);
  return (
    <div>
      <Button
        onClick={async () => {
          try {
            setSyncScore(true);
            await FetchScoreTurnament(+params.id);
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
  );
}
