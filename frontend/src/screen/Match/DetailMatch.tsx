import { useNavigate, useParams } from "@solidjs/router";
import Button from "../../components/Button";
import { CreateTable, GetRegisteredPlayers } from "../../wailsjs/go/main/App";
import { createSignal, Show } from "solid-js";
import MultiSelectInput, {
  Option,
} from "../../components/Form/MultiSelectInput";
import { database } from "../../wailsjs/go/models";

export default function CreateMatchScreen() {
  const navigate = useNavigate();
  const params = useParams();
  const [selectedPlayer, setSelectedPlayer] = createSignal<Array<Option>>([]);
  const [creating, setCreating] = createSignal<boolean>(false);
  const pagination = new database.Pagination();

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
      <div class="flex flex-col gap-1 mt-4">
        <MultiSelectInput
          value={selectedPlayer()}
          label="Select Player"
          onChange={(val: Option[]) => {
            setSelectedPlayer(val);
          }}
          fetchOptions={async (page: number, search: string) => {
            pagination.Page = page;
            pagination.Search = "";
            pagination.Size = 10;
            pagination.Sort = "ASC";
            pagination.SortBy = "id";
            const players = await GetRegisteredPlayers(
              true,
              +params.id,
              search,
              pagination,
            );

            const options: Option[] = players.map((player) => {
              return {
                value: player.Player.id.toString(),
                label: player.Player.riichi_city_name,
              };
            });

            return {
              items: options,
              hasMore: options.length != 10,
            };
          }}
        />

        <Button
          onClick={async () => {
            try {
              setCreating(true);
              const playerIds = selectedPlayer().map((player) => +player.value);
              await CreateTable(+params.id, playerIds);
              navigate(`/tournament/${params.id}/tables`);
            } catch (e) {
              alert(e);
            } finally {
              setCreating(false);
            }
          }}
        >
          <Show when={creating()}>
            <span class="loading loading-spinner"></span>
          </Show>
          Create Table
        </Button>
      </div>
    </div>
  );
}
