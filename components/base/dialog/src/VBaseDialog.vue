<template>
  <teleport to="body" :disabled="!appendToBody">
    <transition
      @after-enter="afterEnter"
      @after-leave="afterLeave"
      @before-leave="beforeLeave"
    >
      <div v-show="visible">
        <div
          role="dialog"
          aria-modal="true"
          :aria-label="title || undefined"
          :aria-labelledby="!title ? titleId : undefined"
          :aria-describedby="bodyId"
          :class="`${ns.namespace.value}-overlay-dialog`"
          @click="overlayEvent.onClick"
          @mousedown="overlayEvent.onMousedown"
          @mouseup="overlayEvent.onMouseup"
        >
          <hx-focus-trap
            loop
            :trapped="visible"
            focus-start-el="container"
            @focus-after-trapped="onOpenAutoFocus"
            @focus-after-released="onCloseAutoFocus"
            @release-requested="onCloseRequested"
          >
            <hx-dialog-content
              v-if="rendered"
              ref="dialogContentRef"
              :custom-class="customClass"
              :center="center"
              :close-icon="closeIcon"
              :draggable="draggable"
              :fullscreen="fullscreen"
              :show-close="showClose"
              :title="title"
              @close="handleClose"
            >
              <template #header>
                <slot
                  v-if="!$slots.title"
                  name="header"
                  :close="handleClose"
                  :title-id="titleId"
                  :title-class="ns.e('title')"
                />
                <slot v-else name="title" />
              </template>
              <slot />
              <template v-if="$slots.footer" #footer>
                <slot name="footer" :close="handleClose" />
              </template>
            </hx-dialog-content>
          </hx-focus-trap>
        </div>
      </div>
    </transition>
  </teleport>
</template>

<script lang="ts" setup>
import { computed, provide, ref, useSlots } from "vue";
// import { ElOverlay } from "@/core/overlay";
// import { useDeprecated, useNamespace, useSameTarget } from "@/core/hooks";
import { dialogInjectionKey } from "@/core/tokens";
import HxFocusTrap from "@/components/base/focus-trap";
import HxDialogContent from "./VBaseDialogContent.vue";
import { dialogEmits, dialogProps } from "./VDialog";
import { useDialog } from "./use-dialog";

const props = defineProps(dialogProps);
defineEmits(dialogEmits);
const slots = useSlots();

useDeprecated(
  {
    scope: "hx-dialog",
    from: "the title slot",
    replacement: "the header slot",
    version: "3.0.0",
    ref: "",
  },
  computed(() => !!slots.title)
);

const ns = useNamespace("dialog");
const dialogRef = ref<HTMLElement>();
const headerRef = ref<HTMLElement>();
const dialogContentRef = ref();

const {
  visible,
  titleId,
  bodyId,
  style,
  rendered,
  zIndex,
  afterEnter,
  afterLeave,
  beforeLeave,
  handleClose,
  onModalClick,
  onOpenAutoFocus,
  onCloseAutoFocus,
  onCloseRequested,
} = useDialog(props, dialogRef);

provide(dialogInjectionKey, {
  dialogRef,
  headerRef,
  bodyId,
  ns,
  rendered,
  style,
});

const overlayEvent = useSameTarget(onModalClick);

const draggable = computed(() => props.draggable && !props.fullscreen);

defineExpose({
  /** @description whether the dialog is visible */
  visible,
  dialogContentRef,
});
</script>
