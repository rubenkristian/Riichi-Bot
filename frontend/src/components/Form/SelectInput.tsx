import { For } from "solid-js";

type SelectInputProps = {
  label: string;
  value: string;
  onChange: (val: string) => void;
  options: { value: string; label: string }[];
  error?: string;
};

export default function SelectInput(props: SelectInputProps) {
  return (
    <div class="mb-5">
      <label class="block text-sm font-semibold mb-1 text-gray-700">
        {props.label}
      </label>
      <select
        value={props.value}
        onChange={(e) => props.onChange(e.currentTarget.value)}
        class="w-full px-4 py-2 rounded-xl border border-gray-300
               focus:outline-none focus:ring-2 focus:ring-blue-400
               transition"
      >
        <option value="">-- Select --</option>
        <For each={props.options}>
          {(opt) => <option value={opt.value}>{opt.label}</option>}
        </For>
      </select>
      {props.error && <p class="text-red-500 text-sm mt-1">{props.error}</p>}
    </div>
  );
}
