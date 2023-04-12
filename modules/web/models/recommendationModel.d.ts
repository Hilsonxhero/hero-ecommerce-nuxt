export interface recommendationModel {
    title?: string
    description?: string
    products?: Array<{
        product?: {
            id?: number | string
            slug?: string
            media: { thumb?: string }
        }
    }>
}
