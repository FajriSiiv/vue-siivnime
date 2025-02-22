<script setup>
import BasicButton from "../button/BasicButton.vue";
import { computed, defineProps, ref, watch } from "vue";

const props = defineProps({
  loading: Boolean,
  tempPeople: String,
});

const emit = defineEmits(["update:tempPeople", "submit"]);

const localTempPeople = ref(props.tempPeople || "");

const isValid = computed(() => localTempPeople.value.length >= 4);

const handleSearchPeople = () => {
  if (isValid.value) {
    emit("submit");
  }
};

watch(localTempPeople, (newValue) => {
  emit("update:tempPeople", newValue);
});
</script>

<template>
  <form
    class="flex items-start gap-5 flex-col md:flex-row md:items-end"
    @submit.prevent="handleSearchPeople"
  >
    <div class="flex flex-col gap-y-2 md:max-w-fit w-full">
      <label class="text-sm/6 font-medium">Search Voice Actor</label>
      <input
        class="block w-full rounded-lg bg-white/5 py-1.5 px-3 text-sm/6 border md:max-w-[500px]"
        placeholder="Type 'Takahashi Rie'"
        fetchpriority="high"
        v-model="localTempPeople"
        :disabled="props.loading"
        minlength="4"
      />
      <p v-if="!isValid && props.tempPeople" class="text-red-500 text-xs">
        Minimum 4 characters required.
      </p>
    </div>

    <BasicButton
      name="Search"
      class="h-[38px] flex items-center"
      :disabled="!isValid || props.loading"
      type="submit"
    />
  </form>
</template>
