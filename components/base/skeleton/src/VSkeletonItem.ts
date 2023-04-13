import { buildProps } from '@/utils'
import type SkeletonItem from './VBaseSkeletonItem.vue'
import type { ExtractPropTypes } from 'vue'

export const skeletonItemProps = buildProps({
  variant: {
    type: String,
    values: [
      'circle',
      'rect',
      'h1',
      'h3',
      'text',
      'caption',
      'p',
      'image',
      'button',
      'card',
    ],
    default: 'text',
  },
} as const)
export type SkeletonItemProps = ExtractPropTypes<typeof skeletonItemProps>

export type SkeletonItemInstance = InstanceType<typeof SkeletonItem>
