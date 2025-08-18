type DateInputProps = {
  label: string;
  value: string;
  onChange: (val: string) => void;
  error?: string;
  min?: string;
  max?: string;
};

export default function DateInput(props: DateInputProps) {
  return (
    <div class="mb-5">
      <label class="block text-sm font-semibold mb-1 text-gray-700">
        {props.label}
      </label>
      <input
        type="date"
        value={props.value}
        min={props.min}
        max={props.max}
        onInput={(e) => props.onChange(e.currentTarget.value)}
        class="w-full px-4 py-2 rounded-xl border border-gray-300
               focus:outline-none focus:ring-2 focus:ring-blue-400
               transition"
      />
      {props.error && <p class="text-red-500 text-sm mt-1">{props.error}</p>}
    </div>
  );
}
