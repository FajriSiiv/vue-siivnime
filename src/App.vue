<script setup>
import { RouterView } from "vue-router";
import Navbar from "@/components/navbar.vue";
</script>

<template>
  <Navbar />
  <main class="p-5 mt-14">
    <RouterView />
  </main>
</template>

<style scoped></style>
