<script setup>
import { onMounted, ref, watch } from "vue";
import { getPeoples } from "../api/anime";
import SearchPeople from "@/components/search/SearchPeople.vue";
import BasicButton from "@/components/button/BasicButton.vue";
import LoadingCardPeople from "@/components/loading/LoadingCardPeople.vue";
import { useRoute, useRouter } from "vue-router";

const router = useRouter();
const route = useRoute();

const peoples = ref([]);
const loading = ref(true);
const page = ref(Number(route.query.page) || 1);
const tempPeople = ref("");
const searchPeople = ref(route.query.searchPeople || "");

const handleNextPage = () => {
  page.value++;
};

const handlePrevPage = () => {
  if (page.value > 1) {
    page.value--;
  }
};

const fetchPeoples = async () => {
  loading.value = true;
  try {
    const response = await getPeoples(page.value, searchPeople.value);

    peoples.value = response.data;
  } catch (error) {
    console.log(error);
  } finally {
    loading.value = false;
  }
};

const handleSearchPeople = () => {
  searchPeople.value = tempPeople.value;
};

onMounted(() => {
  fetchPeoples();
});

watch(
  () => route.query,
  (query) => {
    if (query.page !== undefined) {
      page.value = Number(query.page) || 1;
    }

    if (query.searchPeople !== undefined) {
      searchPeople.value = query.searchPeople;
    }
  },
  { immediate: true }
);

watch(
  [page, searchPeople],
  () => {
    const query = {
      page: page.value > 0 ? page.value : undefined,
    };

    if (searchPeople.value !== "") {
      query.searchPeople = searchPeople.value;
    }

    router.replace({
      query: Object.fromEntries(
        Object.entries(query).filter(([_, v]) => v !== undefined)
      ),
    });
  },
  { immediate: true }
);

watch([page, searchPeople], fetchPeoples);
</script>

<template>
  <div class="my-5">
    <SearchPeople
      :loading="loading"
      v-model:tempPeople="tempPeople"
      @submit="handleSearchPeople"
    />
  </div>

  <div
    class="grid lg:grid-cols-8 md:grid-cols-5 min-[400px]:grid-cols-2 sm:grid-cols-3 gap-2 animate-pulse"
    v-if="loading"
  >
    <LoadingCardPeople v-for="(card, index) in [...Array(16)]" :key="index" />
  </div>

  <div
    class="grid lg:grid-cols-8 md:grid-cols-5 min-[400px]:grid-cols-2 sm:grid-cols-3 gap-2"
    v-if="peoples.length >= 0 && !loading"
  >
    <div
      v-for="(people, index) in peoples"
      :key="index"
      class="flex flex-col gap-2 border rounded-md p-1.5 hover:border-black transition-all duration-150 cursor-pointer"
      @click="() => router.push(`/people/${people.mal_id}`)"
    >
      <img
        :src="people?.images.jpg.image_url"
        :alt="people.name"
        class="w-full object-cover rounded-md h-[200px] object-top"
      />
      <p class="text-lg font-bold">
        {{ people.name }}
      </p>
    </div>
  </div>

  <div
    v-if="peoples.length !== 0"
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
      :disabled="peoples.length < 24 || loading"
    />
  </div>
</template>
