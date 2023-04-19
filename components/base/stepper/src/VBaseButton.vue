<template>
  <div
    ref="button"
    :class="[ns.e('button-wrapper'), { hover: hovering, dragging }]"
    :style="wrapperStyle"
    tabindex="0"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
    @mousedown="onButtonDown"
    @touchstart="onButtonDown"
    @focus="handleMouseEnter"
    @blur="handleMouseLeave"
    @keydown="onKeyDown"
  >
    <div :class="[ns.e('button'), { hover: hovering, dragging }]" />
  </div>
</template>

<script lang="ts" setup>
import { reactive, toRefs } from "vue";

import { useSliderButton } from "./composables";
import { sliderButtonEmits, sliderButtonProps } from "./VButton";
import type { SliderButtonInitData } from "./VButton";

const props = defineProps(sliderButtonProps);
const emit = defineEmits(sliderButtonEmits);

const ns = useNamespace("slider");

const initData = reactive<SliderButtonInitData>({
  hovering: false,
  dragging: false,
  isClick: false,
  startX: 0,
  currentX: 0,
  startY: 0,
  currentY: 0,
  startPosition: 0,
  newPosition: 0,
  oldValue: props.modelValue,
});

const {
  button,
  wrapperStyle,
  formatValue,
  handleMouseEnter,
  handleMouseLeave,
  onButtonDown,
  onKeyDown,
  setPosition,
} = useSliderButton(props, initData, emit);

const { hovering, dragging } = toRefs(initData);

defineExpose({
  onButtonDown,
  onKeyDown,
  setPosition,
  hovering,
  dragging,
});
</script>
