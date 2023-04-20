import { buildProps } from '@/utils'
import { radioPropsBase } from './VRadio'
import type { ExtractPropTypes } from 'vue'
import type RadioButton from './VBaseRadioButton.vue'

export const radioButtonProps = buildProps({
  ...radioPropsBase,
  name: {
    type: String,
    default: '',
  },
} as const)

export type RadioButtonProps = ExtractPropTypes<typeof radioButtonProps>
export type RadioButtonInstance = InstanceType<typeof RadioButton>
