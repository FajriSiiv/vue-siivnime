<script setup>
import { useAttrs } from "vue";

defineProps({
  name: { type: String, default: "Button" },
  className: { type: String },
});

const attrs = useAttrs();
</script>

<template>
  <button
    v-bind="attrs"
    :class="`py-2 px-10 rounded-md  capitalize bg-emerald-500/90 text-white disabled:bg-rose-500 disabled:text-rose-300 ${className}`"
  >
    {{ name }}
  </button>
</template>
