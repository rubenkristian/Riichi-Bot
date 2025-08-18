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
    <div class="flex justify-center items-center ">
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
            const tournament = await InputTournament(
              +tournamentId(),
              endDateRegister(),
              roleId(),
            );
          } catch (e) {
            alert(e);
          }
        }}
      >
        Fetch
      </Button>
    </div>
  );
}
