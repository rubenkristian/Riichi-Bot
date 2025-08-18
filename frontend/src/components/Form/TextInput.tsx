type TextInputProps = {
  label: string;
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
  type?: string;
  error?: string;
};

export default function TextInput(props: TextInputProps) {
  return (
    <div class="mb-5">
      <label class="block text-sm font-semibold mb-1 text-gray-700">
        {props.label}
      </label>
      <input
        type={props.type || "text"}
        value={props.value}
        onInput={(e) => props.onChange(e.currentTarget.value)}
        placeholder={props.placeholder || ""}
        class={`w-full px-4 py-2 rounded-xl border ${props.error ? "border-red-400" : "border-gray-300"}
               focus:outline-none focus:ring-2 focus:ring-blue-400
               transition`}
      />
      {props.error && <p class="text-red-500 text-sm mt-1">{props.error}</p>}
    </div>
  );
}
