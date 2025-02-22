<script setup>
import { getPeopleByID } from "@/api/anime";
import BasicButton from "@/components/button/BasicButton.vue";
import { computed, onMounted, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();
const loading = ref(true);

const id = route.params.id;
const people = ref(null);

const fetchPeopleDetail = async () => {
  loading.value = true;
  try {
    const response = await getPeopleByID(id);

    people.value = response.data;
  } catch (error) {
    console.log(error);
  } finally {
    loading.value = false;
  }
};

const filterCharaVoice = computed(() => {
  if (!people.value?.voices) return [];
  return people.value.voices.filter(
    (value, index, self) =>
      index ===
      self.findIndex(
        (chara) => chara.character.mal_id === value.character.mal_id
      )
  );
});

const filterAnimeVoice = computed(() => {
  if (!people.value?.anime) return [];
  return people.value.anime.filter(
    (value, index, self) =>
      index ===
      self.findIndex((anime) => anime.anime.mal_id === value.anime.mal_id)
  );
});

onMounted(() => {
  fetchPeopleDetail();
});
</script>

<template>
  <BasicButton
    @click="() => router.push('/people')"
    name="Back"
    className="bg-rose-500 rounded-lg border-none"
  />
  <div class="flex gap-5 mt-5 flex-col md:flex-row">
    <div
      class="flex-[2] overflow-hidden w-full min-w-full h-[500px] sm:min-w-[300px]"
    >
      <img
        :src="people?.images.jpg.image_url"
        :alt="people?.name"
        class="w-full h-full rounded-md"
      />
    </div>
    <div class="flex-[7]">
      <div class="flex flex-col gap-4">
        <h1 class="text-3xl font-bold">
          {{ people?.name }}
        </h1>
        <div class="flex flex-col gap-5 bg-gray-200 p-2 rounded-md">
          <p class="text-lg font-semibold">VA in Anime</p>
          <div class="flex gap-2 flex-wrap">
            <div
              class="border border-gray-700 p-2 rounded-md flex-col cursor-pointer"
              v-for="(anime, index) in filterAnimeVoice"
              :key="index"
              @click="() => router.push(`/anime/${anime.anime.mal_id}`)"
            >
              <img
                :src="anime?.anime.images.webp.image_url"
                :alt="anime.anime.name"
                v-if="
                  anime?.anime.images.webp.image_url
                    .toLowerCase()
                    .includes('.webp')
                "
                class="w-full object-cover object-top min-w-[70px] h-[120px]"
              />
              <div
                v-else
                class="w-full min-w-[70px] h-[120px] flex justify-center items-center text-xl"
              >
                ?
              </div>
              <p class="text-sm">{{ anime.anime.name }}</p>
            </div>
          </div>
        </div>
        <div class="flex flex-col gap-5 bg-gray-200 p-2 rounded-md">
          <p class="text-lg font-semibold">VA Characters Anime</p>
          <div class="flex gap-2 flex-wrap">
            <div
              class="border border-gray-700 p-2 rounded-md flex-col"
              v-for="(chara, index) in filterCharaVoice"
              :key="index"
            >
              <img
                :src="chara?.character.images.jpg.image_url"
                :alt="chara.character.name"
                v-if="
                  chara?.character.images.jpg.image_url
                    .toLowerCase()
                    .includes('.jpg')
                "
                class="w-full object-cover object-top min-w-[70px] h-[120px]"
              />
              <div
                v-else
                class="w-full min-w-[70px] h-[120px] flex justify-center items-center text-xl"
              >
                ?
              </div>
              <p class="text-sm">{{ chara.character.name }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
