import { defineStore } from "pinia";

export const useCommonStore = defineStore("common", () => {

    const configuration = ref({});

    // const loggedIn = computed(() => isLoggedIn.value);

    const fetchConfig = async () => {
        try {
            const config = useRuntimeConfig()

            const { data } = await $fetch('init', { baseURL: config.public.baseURL });
            configuration.value = data.config;

        } catch (error) {
            return error;
        }
    };

    return {
        configuration,
        fetchConfig
    };
});
