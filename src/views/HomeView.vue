<script setup>
import {
  getGenresAnime,
  getPopularThisSeasons,
  getSearchAnime,
  getTopAnimes,
  getTopRecentAnimes,
} from "@/api/anime";
import BasicButton from "@/components/button/BasicButton.vue";
import CardAnime from "@/components/card/CardAnime.vue";
import LoadingCard from "@/components/card/LoadingCard.vue";
import SearchAnime from "@/components/search/SearchAnime.vue";
import SelectCategory from "@/components/select/SelectCategory.vue";
import { onMounted, ref, watch, watchEffect } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();

const animeCategory = [
  { name: "Top Anime", value: "top" },
  { name: "Favorite Anime", value: "fav-anime" },
  { name: "Popular This Season", value: "popular-season" },
  { name: "Top Recent", value: "top-recent" },
  { name: "Top Movie", value: "top-movie" },
];

const animes = ref([]);
const loading = ref(true);
const error = ref(null);
const page = ref(Number(route.query.page) || 1);
const category = ref(route.query.category || "top");
const searchAnime = ref(route.query.searchAnime || "");
const tempSearch = ref("");
const genres = ref([]);
const selectedGenre = ref(null);
const genre = ref(Number(route.query.genre) || 0);

const handleNextPage = () => {
  page.value++;
};

const handlePrevPage = () => {
  if (page.value > 1) {
    page.value--;
  }
};

const fetchAnime = async () => {
  loading.value = true;
  try {
    let response = [];
    if (
      category.value === "top" &&
      searchAnime.value === "" &&
      genre.value <= 0
    ) {
      response = await getTopAnimes(page.value, "bypopularity");
    } else if (
      category.value === "fav-anime" &&
      searchAnime.value === "" &&
      genre.value <= 0
    ) {
      response = await getTopAnimes(page.value, "favorite");
    } else if (
      category.value === "top-recent" &&
      searchAnime.value === "" &&
      genre.value <= 0
    ) {
      response = await getTopRecentAnimes(page.value);
    } else if (
      category.value === "popular-season" &&
      searchAnime.value === "" &&
      genre.value <= 0
    ) {
      response = await getPopularThisSeasons(page.value);
    } else if (
      category.value === "top-movie" &&
      searchAnime.value === "" &&
      genre.value <= 0
    ) {
      response = await getTopAnimes(page.value, "bypopularity", "movie");
    } else if (searchAnime.value !== "" || genre.value >= 0) {
      response = await getSearchAnime(
        page.value,
        searchAnime.value,
        genre.value
      );
    } else {
      response.data = [];
    }

    animes.value = response.data;
    error.value = null;
  } catch (err) {
    error.value = err.message;
  } finally {
    loading.value = false;
  }
};

const handleSearchAnime = () => {
  searchAnime.value = tempSearch.value;
  genre.value = selectedGenre.value;
  page.value = 1;
};

const handleCategoryChange = (newCategory) => {
  searchAnime.value = "";
  tempSearch.value = "";
  page.value = 1;
  selectedGenre.value = 0;
  genre.value = 0;
};

onMounted(() => {
  fetchAnime();
});

watch(
  () => route.query,
  (query) => {
    if (query.page !== undefined) {
      page.value = Number(query.page) || 1;
    }

    if (query.category !== undefined) {
      category.value = query.category;
    }

    if (query.searchAnime !== undefined) {
      tempSearch.value = query.searchAnime;
    }

    if (query.genre !== undefined) {
      genre.value = Number(query.genre) || 0;
    }
  },
  { immediate: true }
);

watch(
  [page, category, searchAnime, genre],
  () => {
    const query = {
      page: page.value > 0 ? page.value : undefined,
    };

    if (searchAnime.value !== "") {
      query.searchAnime = searchAnime.value;
    }

    if (genre.value !== 0) {
      query.genre = genre.value;
    }

    if (searchAnime.value === "" && genre.value === 0) {
      query.category =
        category.value !== undefined ? category.value : undefined;
    }

    router.replace({
      query: Object.fromEntries(
        Object.entries(query).filter(([_, v]) => v !== undefined)
      ),
    });
  },
  { immediate: true }
);

watch([page, category, searchAnime, genre], fetchAnime);
</script>

<template>
  <div class="mb-5 flex flex-col gap-y-5">
    <SelectCategory
      v-model:category="category"
      :loading="loading"
      :animeCategory="animeCategory"
      @update:category="handleCategoryChange"
    />

    <SearchAnime
      @submit="handleSearchAnime"
      v-model:tempSearch="tempSearch"
      v-model:selectedGenre="selectedGenre"
      v-model:genres="genres"
      :loading="loading"
    />
  </div>

  <h2
    v-if="error"
    class="text-5xl text-rose-500 font-semibold uppercase w-full flex justify-center items-center text-center min-h-[500px]"
  >
    {{ error }}
  </h2>

  <div
    :class="[
      'grid gap-5 h-full grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
      animes.length === 0 && !loading
        ? 'w-full !flex justify-center items-center text-center min-h-[500px]'
        : '',
    ]"
    v-if="!error"
  >
    <LoadingCard
      v-if="loading"
      v-for="(card, index) in [...Array(6)]"
      :key="index"
    />
    <h2
      v-else-if="animes.length === 0"
      class="text-5xl text-rose-500 font-semibold uppercase"
    >
      No data anime
    </h2>
    <CardAnime
      v-for="anime in animes"
      v-else
      :key="anime.mal_id"
      :animeId="anime.mal_id"
      :title="anime.title"
      :img="anime.images.webp?.large_image_url"
      :placeholder="anime.images.webp?.small_image_url"
      :status="anime.status"
      :airing="anime.airing"
      :season="anime.season"
      :year="anime.year"
      :episodes="anime.episodes"
      :score="anime.score"
      :scored_by="anime.scored_by"
      :genres="anime.genres"
    />
  </div>

  <div
    v-if="animes.length !== 0"
    class="py-10 float-right flex gap-10 items-center"
  >
    <BasicButton
      name="Prev"
      @click="handlePrevPage"
      :disabled="page <= 1 || loading"
    />
    <span>{{ page }}</span>
    <BasicButton
      name="Next"
      @click="handleNextPage"
      :disabled="animes.length < 25 || loading"
    />
  </div>
</template>

<style scoped></style>
