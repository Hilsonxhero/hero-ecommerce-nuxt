<template>
  <button
    type="button"
    class="btn-prev"
    :disabled="internalDisabled"
    :aria-disabled="internalDisabled"
    @click="$emit('click', $event)"
  >
    <span v-if="prevText">{{ prevText }}</span>
    <nuxt-icon v-else name="arrow-right" class="w-6 h-6"></nuxt-icon>
  </button>
</template>

<script lang="ts" setup>
import { computed } from "vue";

import { paginationPrevEmits, paginationPrevProps } from "./VPrev";

const props = defineProps(paginationPrevProps);
defineEmits(paginationPrevEmits);
const internalDisabled = computed(
  () => props.disabled || props.currentPage <= 1
);
</script>
