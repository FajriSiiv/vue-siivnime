<script setup>
import { ref, onMounted } from "vue";

const props = defineProps({
  src: String,
  placeholder: String,
  alt: String,
});

const imageLoaded = ref(false);
const highResImage = ref(null);

onMounted(() => {
  const img = new Image();
  img.src = props.src;
  img.onload = () => {
    highResImage.value = props.src;
    imageLoaded.value = true;
  };
});
</script>

<template>
  <div class="relative overflow-hidden">
    <img
      :src="placeholder"
      :alt="alt"
      class="absolute inset-0 w-full h-full object-cover blur-lg transition-opacity duration-500"
      :class="{ 'opacity-0': imageLoaded }"
      loading="lazy"
    />

    <img
      v-if="imageLoaded"
      loading="lazy"
      :src="highResImage"
      :alt="alt"
      class="w-full h-full object-cover transition-opacity duration-500"
    />
  </div>
</template>
