<template>
  <div :class="[ns.e('item'), ns.e(variant)]">
    <!-- <picture-filled v-if="variant === 'image'" /> -->
  </div>
</template>

<script lang="ts" setup>
import { skeletonItemProps } from "./VSkeletonItem";

defineProps(skeletonItemProps);
const ns = useNamespace("skeleton");
</script>
