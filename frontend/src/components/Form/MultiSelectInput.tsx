import { For } from "solid-js";

type MultiSelectInputProps = {
  label: string;
  value: string[];
  onChange: (val: string[]) => void;
  options: { value: string; label: string }[];
  error?: string;
};

export default function MultiSelectInput(props: MultiSelectInputProps) {
  const handleMultiSelect = (e: Event) => {
    const target = e.target as HTMLSelectElement;
    const selected = Array.from(target.selectedOptions).map((opt) => opt.value);
    props.onChange(selected);
  };

  return (
    <div class="mb-5">
      <label class="block text-sm font-semibold mb-1 text-gray-700">
        {props.label}
      </label>
      <select
        multiple
        size={4}
        onChange={handleMultiSelect}
        class="w-full px-4 py-2 rounded-xl border border-gray-300
               focus:outline-none focus:ring-2 focus:ring-blue-400
               transition"
      >
        <For each={props.options}>
          {(opt) => (
            <option
              value={opt.value}
              selected={props.value.includes(opt.value)}
            >
              {opt.label}
            </option>
          )}
        </For>
      </select>
      {props.error && <p class="text-red-500 text-sm mt-1">{props.error}</p>}
    </div>
  );
}
