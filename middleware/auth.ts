import { useUserStore } from "@/modules/user/store";

export default defineNuxtRouteMiddleware((to) => {
    const store = useUserStore();
    console.log("store.loggedIn", store.loggedIn);

    if (!store.loggedIn) {
        return '/auth'
    }
})
