// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    modules: [
        '@pinia/nuxt', 'nuxt-swiper', 'nuxt-icons'
    ],
    css: ["@/assets/sass/main.scss", "@/assets/css/tailwind.css"],

    runtimeConfig: {
        public: {
            baseURL: 'http://localhost/api/v1/application',
        }
    },


    postcss: {
        plugins: {
            tailwindcss: {},
            autoprefixer: {},
        },
    },
    // components: [
    //     {
    //         path: '~/components/base',
    //         extensions: ['.ts'],
    //     }
    // ]

    // vite: {
    //     css: {
    //         preprocessorOptions: {
    //             scss: {
    //                 additionalData: '@use "@/assets/_colors.scss" as *;',
    //             },

    //         }
    //     }
    // }
})
