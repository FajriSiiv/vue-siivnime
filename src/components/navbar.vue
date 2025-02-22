<script setup>
import { RouterLink } from "vue-router";
</script>

<template>
  <nav
    class="fixed left-0 top-0 h-14 bg-sky-800 flex items-center justify-between w-full px-5 text-white z-50"
  >
    <p class="text-2xl font-bold">Siivanime</p>

    <ul class="flex justify-center items-center gap-5">
      <RouterLink to="/">Anime</RouterLink>
      <RouterLink to="/people">People</RouterLink>
    </ul>
  </nav>
</template>
