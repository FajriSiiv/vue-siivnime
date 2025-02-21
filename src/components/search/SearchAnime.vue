<script setup>
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/vue";
import BasicButton from "../button/BasicButton.vue";
import { ChevronsUpDownIcon } from "lucide-vue-next";
import { defineProps, defineEmits, watch, onMounted, ref } from "vue";
import { getGenresAnime } from "@/api/anime";

const props = defineProps({
  tempSearch: String,
  genres: Array,
  selectedGenre: String,
  loading: Boolean,
});

const emit = defineEmits([
  "update:tempSearch",
  "update:genres",
  "update:selectedGenre",
  "submit",
]);
const selected = ref(0);

const fetchGenre = async () => {
  props.loading = true;
  try {
    const response = await getGenresAnime();

    emit("update:genres", response.data);
  } catch (error) {
    console.log("Cant fetching genre");
  } finally {
    props.loading = false;
  }
};

const updateSearchAnime = (event) =>
  emit("update:tempSearch", event.target.value || "");

const updateGenre = (value) => {
  selected.value = value;
  emit("update:selectedGenre", value);
  console.log("Genre yang dipilih:", value);
};

const handleSearchAnime = () => {
  emit("submit");
};

onMounted(fetchGenre);
watch(
  () => props.selectedGenre,
  (newVal) => {
    selected.value = newVal;
  }
);
</script>

<template>
  <form
    action=""
    class="flex items-start gap-5 flex-col md:flex-row md:items-end"
    @submit.prevent="handleSearchAnime"
  >
    <div class="flex flex-col gap-y-2 md:max-w-fit w-full">
      <label class="text-sm/6 font-medium">Search Anime</label>
      <input
        class="block w-full rounded-lg bg-white/5 py-1.5 px-3 text-sm/6 border md:max-w-[500px]"
        placeholder="Type 'Attack On Titan'"
        :value="props.tempSearch"
        @input="updateSearchAnime"
        :disabled="props.loading"
        fetchpriority="high"
      />
    </div>

    <div class="flex flex-col gap-2 md:max-w-fit w-full">
      <label class="text-sm/6 font-medium">Genre Anime</label>
      <Listbox
        v-model="selected"
        @update:modelValue="updateGenre"
        :disabled="props.loading"
      >
        <div class="relative md:min-w-60 w-full">
          <ListboxButton
            class="relative w-full rounded-md bg-white py-2 pl-3 pr-10 text-left focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm border disabled:text-gray-400 cursor-pointer"
          >
            <span class="block truncate">
              {{
                selected
                  ? genres.find((g) => g.mal_id === selected)?.name ||
                    "Select a Genre"
                  : "Select a Genre"
              }}
            </span>
            <span
              class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2"
            >
              <ChevronsUpDownIcon
                class="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </span>
          </ListboxButton>
          <ListboxOptions
            class="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm z-50"
          >
            <ListboxOption
              as="template"
              class="cursor-pointer"
              :key="0"
              :value="0"
            >
              <li
                :class="['relative cursor-default select-none py-2 pl-10 pr-4']"
              >
                <span :class="['block truncate']"> Select a Genre </span>
                <span
                  class="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600"
                >
                  <CheckIcon class="h-5 w-5" aria-hidden="true" />
                </span>
              </li>
            </ListboxOption>
            <ListboxOption
              as="template"
              v-slot="{ active, selected }"
              class="cursor-pointer"
              v-for="(genre, index) in props.genres"
              :key="index"
              :value="genre.mal_id"
            >
              <li
                :class="[
                  active ? 'bg-amber-100 text-amber-900' : 'text-gray-900',
                  'relative cursor-default select-none py-2 pl-10 pr-4',
                ]"
              >
                <span
                  :class="[
                    selected ? 'font-bold' : 'font-normal',
                    'block truncate',
                  ]"
                >
                  {{ genre.name }}
                </span>
                <span
                  v-if="selected"
                  class="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600"
                >
                  <CheckIcon class="h-5 w-5" aria-hidden="true" />
                </span>
              </li>
            </ListboxOption>
          </ListboxOptions>
        </div>
      </Listbox>
    </div>

    <BasicButton name="Search" class="h-[38px] flex items-center" />
  </form>
</template>
