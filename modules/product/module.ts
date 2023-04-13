import { defineNuxtModule } from '@nuxt/kit'
import { resolve, join } from 'pathe'
import type { Nuxt } from '@nuxt/schema'

export default defineNuxtModule({
    meta: {
        name: 'product-module',
        configKey: 'product-module',
    },

    setup(options: any, nuxt: Nuxt) {


        // nuxt.hook('components:dirs', (dirs) => {
        //     dirs.push({
        //         path: join(__dirname, 'components/base'),
        //         prefix: 'Base'
        //     })
        // })


        // nuxt.hook('autoImports:dirs', (dirs) => {
        //     dirs.push(resolve(__dirname, './composables'))
        // })


        nuxt.hook('pages:extend', (pages) => {
            pages.push({
                name: 'products-index',
                path: '/products',
                file: resolve(__dirname, './pages/products/index.vue')
            }, {
                name: 'products-show',
                path: '/products/:id',
                file: resolve(__dirname, './pages/products/[id].vue')
            })
        })

        // Pinia store modules are auto imported
    }
})