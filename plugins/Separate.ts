// @ts-nocheck

export default defineNuxtPlugin((nuxtApp) => {


    nuxtApp.vueApp.config.globalProperties.$filters = {
        twoDigits(value) {
            if (value.toString().length <= 1) {
                return "0" + value.toString();
            }
            return value.toString();
        },
        separate(Number) {
            const value = Number / 10
            return value.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
        }
    };

})