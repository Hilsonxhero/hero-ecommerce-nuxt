import { defineNuxtModule } from '@nuxt/kit'
import { resolve, join } from 'pathe'
import type { Nuxt } from '@nuxt/schema'

export default defineNuxtModule({
    meta: {
        name: 'checkout-module',
        configKey: 'checkout-module',
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
                    name: 'checkout-cart',
                    path: '/checkout/cart',
                    file: resolve(__dirname, './pages/cart.vue')
                },
                {
                    name: 'checkout-shipping',
                    path: '/checkout/shipping',
                    file: resolve(__dirname, './pages/shipping.vue')
                },
                {
                    name: 'checkout-payment',
                    path: '/checkout/payment',
                    file: resolve(__dirname, './pages/payment.vue')
                },
                {
                    name: 'checkout-payment-confirmation',
                    path: '/checkout/confirmation/payment/:id',
                    file: resolve(__dirname, './pages/confirmation.vue')
                },
            )
        })

        // Pinia store modules are auto imported
    }
})