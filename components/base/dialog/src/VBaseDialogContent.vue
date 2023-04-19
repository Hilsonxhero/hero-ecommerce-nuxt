<template>
  <div
    :ref="composedDialogRef"
    :class="[
      ns.b(),
      ns.is('fullscreen', fullscreen),
      ns.is('draggable', draggable),
      { [ns.m('center')]: center },
      customClass,
    ]"
    :style="style"
    tabindex="-1"
    @click.stop
  >
    <header ref="headerRef" :class="ns.e('header')">
      <slot name="header">
        <span role="heading" :class="ns.e('title')">
          {{ title }}
        </span>
      </slot>
      <!-- <button
        v-if="showClose"
        :aria-label="t('el.dialog.close')"
        :class="ns.e('headerbtn')"
        type="button"
        @click="$emit('close')"
      >
        <el-icon :class="ns.e('close')">
          <component :is="closeIcon || Close" />
        </el-icon>
        
      </button> -->
      <base-button v-if="showClose" icon variant="gray" @click="$emit('close')">
        <nuxt-icon
          name="close-square"
          class="w-7 h-7 text-gray-500"
        ></nuxt-icon>
      </base-button>
    </header>
    <div :id="bodyId" :class="ns.e('body')">
      <slot />
    </div>
    <footer v-if="$slots.footer" :class="ns.e('footer')">
      <slot name="footer" />
    </footer>
  </div>
</template>

<script lang="ts" setup>
import { computed, inject } from "vue";
// import { ElIcon } from '@/core/components/icon'
import { FOCUS_TRAP_INJECTION_KEY } from "@/components/base/focus-trap";
// import { useDraggable, useLocale } from "@/core/hooks";
import { composeRefs } from "@/utils";
import { dialogInjectionKey } from "@/core/tokens";
import { dialogContentEmits, dialogContentProps } from "./VDialogContent";

const props = defineProps(dialogContentProps);
defineEmits(dialogContentEmits);

const { dialogRef, headerRef, bodyId, ns, style } = inject(dialogInjectionKey)!;
const { focusTrapRef } = inject(FOCUS_TRAP_INJECTION_KEY)!;
const composedDialogRef = composeRefs(focusTrapRef, dialogRef);

const draggable = computed(() => props.draggable);
// useDraggable(dialogRef, headerRef, draggable);
</script>
