import { For, createSignal, onMount, Show } from "solid-js";

export type Option = { value: string; label: string };

type MultiSelectInputProps = {
  label: string;
  value: Option[];
  onChange: (val: Option[]) => void;
  fetchOptions: (
    page: number,
    search: string,
  ) => Promise<{ items: Option[]; hasMore: boolean }>;
  error?: string;
  maxSelected?: number;
};

export default function MultiSelectInput(props: MultiSelectInputProps) {
  const [options, setOptions] = createSignal<Option[]>([]);
  const [page, setPage] = createSignal(1);
  const [loading, setLoading] = createSignal(false);
  const [hasMore, setHasMore] = createSignal(true);
  const [search, setSearch] = createSignal("");
  const [open, setOpen] = createSignal(false);

  const maxSelected = () => props.maxSelected ?? 4;

  const loadOptions = async (pageNum: number, searchTerm: string) => {
    if (loading() || (!hasMore() && pageNum > 1)) return;
    setLoading(true);

    try {
      const data = await props.fetchOptions(pageNum, searchTerm);
      if (pageNum === 1) {
        setOptions(data.items);
      } else {
        setOptions((prev) => [...prev, ...data.items]);
      }
      setHasMore(data.hasMore);
    } catch (err) {
      console.error("Failed to fetch options", err);
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  };

  onMount(() => {
    loadOptions(page(), search());
  });

  const handleScroll = (e: Event) => {
    const target = e.target as HTMLElement;
    const bottomReached =
      target.scrollTop + target.clientHeight >= target.scrollHeight - 10;

    if (bottomReached && hasMore() && !loading()) {
      const nextPage = page() + 1;
      setPage(nextPage);
      loadOptions(nextPage, search());
    }
  };

  const handleSearch = (e: InputEvent) => {
    const val = (e.target as HTMLInputElement).value;
    setSearch(val);
    setPage(1);
    setHasMore(true);
    loadOptions(1, val);
  };

  const addValue = (opt: Option) => {
    if (
      !props.value.find((v) => v.value === opt.value) &&
      props.value.length < maxSelected()
    ) {
      props.onChange([...props.value, opt]);
    }
  };

  const removeValue = (val: string) => {
    props.onChange(props.value.filter((v) => v.value !== val));
  };

  return (
    <div class="mb-5 relative">
      <label class="block text-sm font-semibold mb-1 text-gray-700 dark:text-gray-200">
        {props.label}
      </label>

      {/* 🏷️ Selected badges */}
      <div
        class="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600
               flex flex-wrap gap-2 cursor-pointer bg-white dark:bg-gray-800"
        onClick={() => setOpen(!open())}
      >
        <For each={props.value}>
          {(opt) => (
            <span class="flex items-center px-2 py-1 bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200 rounded-lg text-sm">
              {opt.label}
              <button
                type="button"
                class="ml-2 text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                onClick={(e) => {
                  e.stopPropagation();
                  removeValue(opt.value);
                }}
              >
                ✕
              </button>
            </span>
          )}
        </For>
        <Show when={props.value.length === 0}>
          <span class="text-gray-400 dark:text-gray-500">Select...</span>
        </Show>
      </div>

      {/* 🔽 Dropdown */}
      <Show when={open()}>
        <div class="absolute z-10 w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg mt-1 shadow-lg">
          <input
            type="text"
            placeholder="Search..."
            value={search()}
            onInput={handleSearch}
            class="w-full px-3 py-2 border-b border-gray-300 dark:border-gray-600
                   focus:outline-none focus:ring-2 focus:ring-blue-400
                   bg-white dark:bg-gray-700 dark:text-gray-200"
          />

          <div class="max-h-40 overflow-y-auto" onScroll={handleScroll}>
            <For each={options()}>
              {(opt) => (
                <Show
                  when={!props.value.find((v) => v.value === opt.value)}
                  fallback={<></>}
                >
                  <div
                    class="px-3 py-2 cursor-pointer hover:bg-blue-50 dark:hover:bg-blue-700 dark:text-gray-200"
                    onClick={() => addValue(opt)}
                  >
                    {opt.label}
                  </div>
                </Show>
              )}
            </For>
            {loading() && (
              <div class="px-3 py-2 text-gray-400 dark:text-gray-500">
                Loading...
              </div>
            )}
          </div>
        </div>
      </Show>

      {/* 🚫 Max selected warning */}
      {props.value.length >= maxSelected() && (
        <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">
          Max {maxSelected()} items selected
        </p>
      )}

      {props.error && (
        <p class="text-red-500 dark:text-red-400 text-sm mt-1">{props.error}</p>
      )}
    </div>
  );
}
