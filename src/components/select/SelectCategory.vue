<script setup>
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/vue";
import { defineModel, defineProps } from "vue";
import { ChevronsUpDownIcon } from "lucide-vue-next";

const category = defineModel("category");
const props = defineProps({
  animeCategory: Array,
  loading: Boolean,
});
</script>

<template>
  <div class="flex flex-col gap-2">
    <label class="text-sm/6 font-medium">Category Anime</label>
    <Listbox v-model="category" :disabled="loading">
      <div class="relative max-w-60">
        <ListboxButton
          class="relative w-full rounded-md bg-white py-2 pl-3 pr-10 text-left border disabled:text-gray-400 cursor-pointer"
        >
          <span class="block truncate">
            {{ props.animeCategory.find((c) => c.value === category)?.name }}
          </span>
          <span class="absolute inset-y-0 right-0 flex items-center pr-2">
            <ChevronsUpDownIcon class="h-5 w-5 text-gray-400" />
          </span>
        </ListboxButton>
        <ListboxOptions
          class="absolute mt-1 max-h-60 w-full bg-white py-1 text-base shadow-lg ring-1 ring-black/5"
        >
          <ListboxOption
            v-for="(cate, index) in props.animeCategory"
            :key="index"
            :value="cate.value"
            as="template"
            v-slot="{ active, selected }"
          >
            <li
              :class="[
                active ? 'bg-amber-100 text-amber-900' : 'text-gray-900',
                'cursor-pointer select-none py-2 pl-10 pr-4',
              ]"
            >
              <span
                :class="[
                  selected ? 'font-bold' : 'font-normal',
                  'block truncate',
                ]"
              >
                {{ cate.name }}
              </span>
            </li>
          </ListboxOption>
        </ListboxOptions>
      </div>
    </Listbox>
  </div>
</template>
