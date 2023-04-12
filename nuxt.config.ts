// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    modules: [
        '@pinia/nuxt', 'nuxt-swiper', 'nuxt-icons'
    ],
    css: ["@/assets/sass/main.scss", "@/assets/css/tailwind.css"],


    postcss: {
        plugins: {
            tailwindcss: {},
            autoprefixer: {},
        },
    },

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
