import Form from './src/VBaseForm.vue'
import FormItem from './src/VBaseFormItem.vue'

export default Form
export const HxFormItem = FormItem

export * from './src/VForm'
export * from './src/VFormItem'
export * from './src/types'

export type FormInstance = InstanceType<typeof Form>
export type FormItemInstance = InstanceType<typeof FormItem>
