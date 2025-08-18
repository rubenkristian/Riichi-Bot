import { createSignal } from "solid-js";
import TextInput from "../components/Form/TextInput";
import Button from "../components/Button";
import { LoginRiichiApi } from "../wailsjs/go/main/App";
import { useNavigate } from "@solidjs/router";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = createSignal<string>("");
  const [password, setPassword] = createSignal<string>("");

  return (
    <div class="flex w-full h-screen justify-center items-center">
      <div class="flex flex-col gap-1 h-60 w-96">
        <TextInput
          placeholder="Type Email Riichi City"
          value={email()}
          onChange={(val: string) => setEmail(val)}
          label="Email"
        />
        <TextInput
          placeholder="Password"
          value={password()}
          onChange={(val: string) => setPassword(val)}
          label="Password"
          type="password"
        />
        <Button
          variant="primary"
          size="md"
          onClick={async () => {
            try {
              await LoginRiichiApi(email(), password());
              navigate("/start-bot", { replace: true });
            } catch (e) {
              alert(e);
            }
          }}
        >
          Login
        </Button>
      </div>
    </div>
  );
}
