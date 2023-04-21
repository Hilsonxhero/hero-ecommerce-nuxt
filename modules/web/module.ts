import { defineNuxtModule } from '@nuxt/kit'
import { resolve, join } from 'pathe'
import type { Nuxt } from '@nuxt/schema'

export default defineNuxtModule({
    meta: {
        name: 'web-module',
        configKey: 'web-module',
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
            pages.push(
                {
                    name: 'categories-index',
                    path: '/categories',
                    file: resolve(__dirname, './pages/categories/landing.vue')
                },
            )
        })

        // Pinia store modules are auto imported
    }
})