<template>
  <span :class="ns.e('total')" :disabled="disabled">
    {{
      t("el.pagination.total", {
        total,
      })
    }}
  </span>
</template>

<script lang="ts" setup>
import { usePagination } from "../usePagination";
import { paginationTotalProps } from "./VTotal";
const { t } = useLocale();
const ns = useNamespace("pagination");
const { disabled } = usePagination();

defineProps(paginationTotalProps);
</script>
