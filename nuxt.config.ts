// https://nuxt.com/docs/api/configuration/nuxt-config


export default defineNuxtConfig({
    modules: [
        '@pinia/nuxt',
        'nuxt-swiper',
        'nuxt-icons',
        '~/modules/product/module',
        '~/modules/user/module',
        '~/modules/checkout/module',
        '~/modules/web/module',
    ],

    css: ["@/assets/sass/main.scss", "@/assets/css/tailwind.css"],

    runtimeConfig: {
        public: {
            baseURL: process.env.NUXT_API_BASE_URL,
        },
    },




    // dir: {
    //     pages: 'modules/product/pages'
    // },

    // dir: [
    //     { path: 'pages' },
    //     { path: 'modules/product/pages' }
    // ],


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
