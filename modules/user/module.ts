import { defineNuxtModule } from '@nuxt/kit'
import { resolve, join } from 'pathe'
import type { Nuxt } from '@nuxt/schema'

export default defineNuxtModule({
    meta: {
        name: 'user-module',
        configKey: 'user-module',
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
                    name: 'auth',
                    path: '/auth',
                    file: resolve(__dirname, './pages/auth.vue')
                },
                {
                    path: "/user/profile",
                    name: "user-profile-index",
                    file: resolve(__dirname, './pages/profile/profile.vue')
                },
            )
        })

        // Pinia store modules are auto imported
    }
})