<script setup>
import { getAnimeByID } from "@/api/anime";
import BasicButton from "@/components/button/BasicButton.vue";
import LazyLoadImage from "@/components/loading/LazyLoadImage.vue";
import LoadingDetail from "@/components/loading/LoadingDetail.vue";
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();
const id = route.params.id;
const loading = ref(true);
const anime = ref(null);

const fetchDetailAnime = async () => {
  loading.value = true;
  try {
    const response = await getAnimeByID(id);

    anime.value = response.data;

    console.log(anime.value);
  } catch (error) {
    console.log("error fetching detail anime");
  } finally {
    setTimeout(() => {
      loading.value = false;
    }, 3000);
  }
};

onMounted(() => {
  fetchDetailAnime();
});
</script>

<template>
  <BasicButton
    @click="() => router.push('/')"
    name="Back"
    className="bg-rose-500 rounded-lg border-none"
  />
  <LoadingDetail v-if="loading" />
  <div class="flex gap-5 mt-5 flex-col md:flex-row" v-else>
    <div
      class="flex-[2] overflow-hidden w-full min-w-full h-[500px] sm:min-w-[300px]"
    >
      <!-- <img
        :src="anime?.images.jpg?.large_image_url"
        :alt="anime?.title"
        class="object-cover w-full"
      /> -->
      <LazyLoadImage
        :src="anime?.images.webp?.large_image_url"
        :placeholder="anime?.images.webp?.small_image_url"
        :alt="anime?.title"
      />
    </div>
    <div class="flex-[7]">
      <div class="flex flex-col gap-y-3">
        <h1 class="text-2xl font-bold flex items-center gap-2 md:text-3xl">
          {{ anime?.title }}
          <span
            :class="[
              anime?.airing ? 'bg-rose-500' : 'bg-emerald-500',
              'px-2 py-2  text-xs/none rounded-md text-white',
            ]"
            >{{ anime?.status }}</span
          >
        </h1>
        <div
          class="bg-gray-100 rounded-md p-4 max-w-fit flex gap-5 flex-col md:flex-row"
        >
          <div
            class="flex flex-col items-center gap-y-2 p-2 min-w-[100px] bg-gray-300/50 rounded-md"
          >
            <p
              class="px-2 py-1 rounded-md text-white bg-orange-500/80 w-full text-center"
            >
              Score
            </p>
            <p class="text-3xl text-center font-semibold">
              {{ anime?.score }}
            </p>
            <p
              class="flex md:gap-0 gap-2 md:flex-col text-lg md:text-sm/none items-center"
            >
              <span>{{ anime?.scored_by.toLocaleString() }}</span>
              <span class="md:text-xs text-base">users</span>
            </p>
          </div>
          <div class="flex flex-col justify-between gap-5 md:gap-1">
            <div
              class="flex md:flex-row gap-5 text-base md:text-xl font-semibold"
            >
              <p class="">Popularity #{{ anime?.popularity }}</p>
              <p class="">Rank #{{ anime?.rank }}</p>
              <p class="">Favorite #{{ anime?.favorites }}</p>
            </div>
            <div class="flex flex-row gap-5 capitalize text-sm md:text-base">
              <p class="">Type : {{ anime?.type }} - {{ anime?.source }}</p>
              <div class="w-0.5 h-full bg-rose-300"></div>
              <p class="">Season : {{ anime?.season }}</p>
              <div class="w-0.5 h-full bg-rose-300"></div>
              <p class="">Year : {{ anime?.year }}</p>
            </div>
          </div>
        </div>
        <div class="bg-gray-100 rounded-md p-4 max-w-fit flex flex-col gap-3">
          <p class="flex flex-wrap gap-2 items-center">
            <span class="font-semibold">Synopsis :</span> {{ anime?.synopsis }}
          </p>
          <p class="flex flex-wrap gap-2 items-center">
            <span class="font-semibold">Duration :</span> {{ anime?.duration }}
          </p>
          <p class="flex flex-wrap gap-2 items-center">
            <span class="font-semibold">Rating :</span> {{ anime?.rating }}
          </p>
          <p class="flex flex-wrap gap-2 items-center">
            <span class="font-semibold">Genres : </span>
            <span
              class="capitalize px-2 py-1 rounded-md bg-sky-400 text-white mx-1"
              v-for="(genre, index) in anime?.genres"
              :key="index"
              >{{ genre.name }}</span
            >
          </p>
          <p class="flex flex-wrap gap-2 items-center">
            <span class="font-semibold">Studio : </span>
            <span
              class="capitalize px-2 py-1 rounded-md bg-sky-400 text-white mx-1"
              v-for="(studio, index) in anime?.studios"
              :key="index"
              >{{ studio.name }}</span
            >
          </p>
          <p class="flex flex-wrap gap-2 items-center">
            <span class="font-semibold">Producers : </span>
            <span
              class="capitalize px-2 py-1 rounded-md bg-sky-400 text-white mx-1"
              v-for="(producer, index) in anime?.producers"
              :key="index"
              >{{ producer.name }}</span
            >
          </p>
          <p class="flex flex-wrap gap-2 items-center">
            <span class="font-semibold">Opening song : </span>
            <span
              class="capitalize px-2 py-1 rounded-md bg-sky-400 text-white mx-1"
              v-for="(opening, index) in anime?.theme.openings"
              :key="index"
              >{{ opening }}</span
            >
          </p>
          <p class="flex flex-wrap gap-2 items-center">
            <span class="font-semibold">Ending song : </span>
            <span
              class="capitalize px-2 py-1 rounded-md bg-sky-400 text-white mx-1"
              v-for="(endings, index) in anime?.theme.endings"
              :key="index"
              >{{ endings }}</span
            >
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
