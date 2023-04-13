// @ts-nocheck

import type { DirectiveBinding } from "vue";

const clickEventType = function () {
    return document.ontouchstart !== null ? "click" : "touchstart";
};

const UNIQUE_ID = "__vue_click_outside__";

const onMounted = function (
    el: HTMLElement,
    binding: DirectiveBinding,
    vnode: any
) {
    onUnmounted(el);
    console.log("vnode", vnode);

    let vm = vnode.context;
    let callback = binding.value;
    let nextTick = false;
    setTimeout(function () {
        nextTick = true;
    }, 0);

    el[UNIQUE_ID] = function (event: any) {
        if (
            (!el || !el.contains(event.target)) &&
            callback &&
            nextTick &&
            typeof callback === "function"
        ) {
            return callback.call(vm, event);
        }
    };

    document.addEventListener(clickEventType(), el[UNIQUE_ID], false);
};
const onUnmounted = function (el: HTMLElement) {
    document.removeEventListener(clickEventType(), el[UNIQUE_ID], false);
    delete el[UNIQUE_ID];
};

const onUpdated = function (
    el: HTMLElement,
    binding: DirectiveBinding,
    vnode: any
) {
    if (binding.value === binding.oldValue) {
        return;
    }
    onMounted(el, binding, vnode);
};

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.directive('click-outside', {

        mounted: onMounted,
        updated: onUpdated,
        unmounted: onUnmounted,

        getSSRProps(binding, vnode) {
            // you can provide SSR-specific props here
            return {}
        }
    })
})