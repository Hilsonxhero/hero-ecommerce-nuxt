<template>
  <span :class="avatarClass" :style="sizeStyle">
    <img
      v-if="(src || srcSet) && !hasLoadError"
      :src="src"
      :alt="alt"
      :srcset="srcSet"
      :style="fitStyle"
      @error="handleError"
    />

    <nuxt-icon name="icon" v-else-if="icon"></nuxt-icon>

    <slot v-else />
  </span>
</template>

<script lang="ts" setup>
import { addUnit, isNumber, isString } from "@/utils";
import { avatarEmits, avatarProps } from "./VAvatar";

import type { CSSProperties } from "vue";

const props = defineProps(avatarProps);
const emit = defineEmits(avatarEmits);

const ns = useNamespace("avatar");

const hasLoadError = ref(false);

const avatarClass = computed(() => {
  const { size, icon, shape } = props;
  const classList = [ns.b()];
  if (isString(size)) classList.push(ns.m(size));
  if (icon) classList.push(ns.m("icon"));
  if (shape) classList.push(ns.m(shape));
  return classList;
});

const sizeStyle = computed(() => {
  const { size } = props;
  return isNumber(size)
    ? (ns.cssVarBlock({
        size: addUnit(size) || "",
      }) as CSSProperties)
    : undefined;
});

const fitStyle = computed<CSSProperties>(() => ({
  objectFit: props.fit,
}));

// need reset hasLoadError to false if src changed
watch(
  () => props.src,
  () => (hasLoadError.value = false)
);

function handleError(e: Event) {
  hasLoadError.value = true;
  emit("error", e);
}
</script>
