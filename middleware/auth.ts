import { useUserStore } from "@/modules/user/store";

export default defineNuxtRouteMiddleware((to) => {
    const store = useUserStore();
    if (!store.loggedIn) {
        return '/auth'
    }
})
