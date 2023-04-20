import { useUserStore } from "@/modules/user/store";

export default defineNuxtPlugin((nuxtApp) => {
    if (process.server) {
        const store = useUserStore();
        return store.init()
    }
})


