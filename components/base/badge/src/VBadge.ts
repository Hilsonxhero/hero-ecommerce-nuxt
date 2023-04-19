import { buildProps } from '@/utils'
import type { ExtractPropTypes } from 'vue'
import type Badge from './VBaseBadge.vue'

export const badgeProps = buildProps({
  value: {
    type: [String, Number],
    default: '',
  },
  max: {
    type: Number,
    default: 99,
  },
  isDot: Boolean,
  hidden: Boolean,
  size: String,
  type: {
    type: String,
    values: ['primary', 'success', 'warning', 'info', 'danger'],
    default: 'danger',
  },
} as const)
export type BadgeProps = ExtractPropTypes<typeof badgeProps>

export type BadgeInstance = InstanceType<typeof Badge>
