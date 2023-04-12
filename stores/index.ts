
import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const useCounterStore = defineStore("counter", () => {

    const counter = ref(0);

    const inc = () => {
        counter.value += 1
    };

    return {
        counter,
        inc
    };
});
