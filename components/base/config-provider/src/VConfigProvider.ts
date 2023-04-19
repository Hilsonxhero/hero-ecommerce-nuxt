import { defineComponent, renderSlot, watch } from 'vue'
import { buildProps, definePropType } from '@/utils'
import type { ExtractPropTypes } from 'vue'
import type { ExperimentalFeatures } from '@/core/tokens'
import type { Language } from '@/core/locale'
import type { MessageConfigContext } from '@/components/base/message'
export const messageConfig: MessageConfigContext = {}

export const configProviderProps = buildProps({
  // Controlling if the users want a11y features.
  a11y: {
    type: Boolean,
    default: true,
  },

  locale: {
    type: definePropType<any>(Object),
  },

  size: useSizeProp,

  button: {
    type: definePropType<any>(Object),
  },

  experimentalFeatures: {
    type: definePropType<ExperimentalFeatures>(Object),
  },

  // Controls if we should handle keyboard navigation
  keyboardNavigation: {
    type: Boolean,
    default: true,
  },

  // message: {
  //   type: definePropType<MessageConfigContext>(Object),
  // },

  zIndex: Number,

  namespace: {
    type: String,
    default: 'hx',
  },
} as const)
export type ConfigProviderProps = ExtractPropTypes<typeof configProviderProps>

const ConfigProvider = defineComponent({
  name: 'HxConfigProvider',
  props: configProviderProps,

  setup(props, { slots }) {
    // watch(
    //   () => props.message,
    //   (val) => {
    //     Object.assign(messageConfig, val ?? {})
    //   },
    //   { immediate: true, deep: true }
    // )
    const config = provideGlobalConfig(props)
    return () => renderSlot(slots, 'default', { config: config?.value })
  },
})
export type ConfigProviderInstance = InstanceType<typeof ConfigProvider>

export default ConfigProvider
