<template>
  <div :class="ns.b()">
    <transition :name="`${ns.namespace.value}-zoom-in-center`">
      <sup
        :class="[
          ns.e('content'),
          ns.em('content', type),
          ns.is('fixed', !!$slots.default),
          ns.is('dot', isDot),
        ]"
      >
        <slot />
      </sup>
    </transition>
  </div>
</template>

<script lang="ts" setup>
import { computed } from "vue";

import { isNumber } from "@/utils";
import { badgeProps } from "./VBadge";

const props = defineProps(badgeProps);

const ns = useNamespace("badge");

const content = computed<string>(() => {
  if (props.isDot) return "";

  if (isNumber(props.value) && isNumber(props.max)) {
    return props.max < props.value ? `${props.max}+` : `${props.value}`;
  }
  return `${props.value}`;
});

defineExpose({
  /** @description badge content */
  content,
});
</script>
