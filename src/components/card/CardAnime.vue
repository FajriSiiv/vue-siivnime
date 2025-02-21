<script setup>
import { Star, User } from "lucide-vue-next";
import { useRouter } from "vue-router";
import LazyLoadImage from "../loading/LazyLoadImage.vue";

defineProps({
  title: String,
  img: String,
  status: String,
  airing: Boolean,
  season: String,
  score: Number,
  scored_by: Number,
  year: [String, Number],
  episodes: [String, Number],
  genres: Array,
  animeId: Number,
  placeholder: String,
});

const router = useRouter();
</script>

<template>
  <div
    class="grid grid-cols-7 gap-4 p-3 rounded-md h-[280px] overflow-hidden border cursor-pointer hover:border-black transition-all duration-200"
    @click="() => router.push(`/anime/${animeId.toString()}`)"
  >
    <div class="col-span-3 overflow-hidden rounded-md w-full h-full">
      <!-- <img :src="img" :alt="title" className="object-cover h-full w-full" /> -->
      <LazyLoadImage :src="img" :placeholder="placeholder" :alt="title" />
    </div>
    <div class="col-span-4 flex flex-col gap-y-2">
      <p
        :class="
          airing
            ? 'border-rose-500 text-rose-500'
            : 'border-emerald-500 text-emerald-500'
        "
        class="capitalize px-2 py-1 border text-lg rounded-md w-fit"
      >
        {{ status }}
      </p>
      <div class="flex items-center gap-5 text-sm">
        <div class="flex gap-1">
          <p class="capitalize">
            {{ season === null ? "-" : season }} {{ year }}
          </p>
          <span> - </span>
          <p class="capitalize">
            {{ episodes === null ? "-" : episodes }} episodes
          </p>
        </div>
      </div>
      <h2 class="text-xl font-bold">{{ title.slice(0, 40) }}</h2>
      <div class="flex gap-x-5" v-if="score && scored_by">
        <div class="flex gap-1 items-center">
          <Star size="24" class="text-yellow-500" />
          <p class="">{{ score }}</p>
        </div>
        <div class="flex gap-1 items-center">
          <User size="24" class="text-emerald-500" />
          <p>{{ scored_by }}</p>
        </div>
      </div>
      <div class="flex flex-wrap gap-2">
        <p
          class="px-2 py-1 border rounded-sm"
          :key="index"
          v-for="(genre, index) in genres.slice(0, 3)"
        >
          {{ genre.name }}
        </p>
        <p class="px-2 py-1 border rounded-sm" v-if="genres.length > 3">
          +{{ genres.length - 3 }}
        </p>
      </div>
    </div>
  </div>
</template>
