import Form from './src/form.vue'
import FormItem from './src/form-item.vue'

export default Form
export const HxFormItem = FormItem

export * from './src/form'
export * from './src/form-item'
export * from './src/types'

export type FormInstance = InstanceType<typeof Form>
export type FormItemInstance = InstanceType<typeof FormItem>
