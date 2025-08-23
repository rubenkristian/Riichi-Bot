import { createSignal } from "solid-js";
import TextInput from "../components/Form/TextInput";
import Button from "../components/Button";
import { StartBot } from "../wailsjs/go/main/App";
import { useNavigate } from "@solidjs/router";

export default function Discord() {
  const navigate = useNavigate();
  const [appToken, setAppToken] = createSignal<string>("");
  const [serverID, setServerID] = createSignal<string>("");
  const [adminChannelID, setAdminChannelID] = createSignal<string>("");
  const [notifyChannelID, setNotifyChannelID] = createSignal<string>("");

  return (
    <div class="flex w-full h-screen items-center mt-10 justify-center">
      <div class="flex flex-col gap-2 h-screen w-96">
        <TextInput
          label="Bot App Token"
          placeholder="Type token"
          value={appToken()}
          onChange={(val: string) => setAppToken(val)}
        />
        <TextInput
          label="Server ID"
          placeholder="Type server id"
          value={serverID()}
          onChange={(val: string) => setServerID(val)}
        />
        <TextInput
          label="Channel Admin ID"
          placeholder="Type channel admin id"
          value={adminChannelID()}
          onChange={(val: string) => setAdminChannelID(val)}
        />
        <TextInput
          label="Channel Notify ID"
          placeholder="Type channel notify id"
          value={notifyChannelID()}
          onChange={(val: string) => setNotifyChannelID(val)}
        />
        <Button
          onClick={async () => {
            try {
              await StartBot(
                appToken(),
                serverID(),
                adminChannelID(),
                notifyChannelID(),
              );
              navigate("/home", { replace: true });
            } catch (e) {
              alert(e);
            }
          }}
        >
          Start BOT
        </Button>
        <Button onClick={async () => {}} variant="danger">
          Logout
        </Button>
      </div>
    </div>
  );
}
