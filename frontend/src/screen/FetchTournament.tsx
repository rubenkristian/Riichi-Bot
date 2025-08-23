import { createSignal } from "solid-js";
import TextInput from "../components/Form/TextInput";
import { useNavigate } from "@solidjs/router";
import DateInput from "../components/Form/DateInput";
import Button from "../components/Button";
import { InputTournament } from "../wailsjs/go/main/App";

export default function FetchTournament() {
  const navigate = useNavigate();
  const [tournamentId, setTournamentId] = createSignal<string>("");
  const [endDateRegister, setEndDataRegister] = createSignal<string>("");
  const [roleId, setRoleId] = createSignal<string>("");

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
      <div class="flex flex-col gap-1">
        <TextInput
          label="Tournament Id"
          placeholder="Type Tournament Id"
          value={tournamentId()}
          onChange={(val: string) => setTournamentId(val)}
        />
        <DateInput
          label="End Date Register"
          value={endDateRegister()}
          onChange={(val: string) => setEndDataRegister(val)}
        />
        <TextInput
          label="Role Id"
          placeholder="Type Role Id"
          value={roleId()}
          onChange={(val: string) => setRoleId(val)}
        />
        <Button
          onClick={async () => {
            try {
              await InputTournament(
                +tournamentId(),
                endDateRegister(),
                roleId(),
              );
              navigate("/home");
            } catch (e) {
              alert(e);
            }
          }}
        >
          Fetch
        </Button>
      </div>
    </div>
  );
}
