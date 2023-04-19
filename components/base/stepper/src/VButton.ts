
import { buildProps, isNumber } from '@/utils'
import { UPDATE_MODEL_EVENT } from '@/core/constants'
import type { ExtractPropTypes, Ref } from 'vue'
import type Button from './VBaseButton.vue'

export const sliderButtonProps = buildProps({
  modelValue: {
    type: Number,
    default: 0,
  },
  vertical: Boolean,
  tooltipClass: String,

} as const)
export type SliderButtonProps = ExtractPropTypes<typeof sliderButtonProps>

export const sliderButtonEmits = {
  [UPDATE_MODEL_EVENT]: (value: number) => isNumber(value),
}
export type SliderButtonEmits = typeof sliderButtonEmits

export type SliderButtonInstance = InstanceType<typeof Button>

export type ButtonRefs = Record<
  'firstButton' | 'secondButton',
  Ref<SliderButtonInstance | undefined>
>

export interface SliderButtonInitData {
  hovering: boolean
  dragging: boolean
  isClick: boolean
  startX: number
  currentX: number
  startY: number
  currentY: number
  startPosition: number
  newPosition: number
  oldValue: number
}
