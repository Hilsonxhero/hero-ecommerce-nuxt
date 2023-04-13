<template>
  <div class="container my-4">
    <!-- <base-skeleton animated :loading="loading">
      <template #template>
        <div class="grid grid-cols-12 gap-4">
          <div class="col-span-8">
            <base-skeleton-item
              class="h-[30rem]"
              variant="card"
            ></base-skeleton-item>
          </div>
          <div class="col-span-4">
            <base-skeleton-item
              class="h-[30rem]"
              variant="card"
            ></base-skeleton-item>
          </div>
        </div>
      </template>
      <template #default>
        <section class="container text-center my-4">show product page</section>
      </template>
    </base-skeleton> -->
    <section class="container my-4">
      <h2>show product page</h2>
    </section>
  </div>
</template>

<script setup lang="ts">
import { BaseSkeleton, BaseSkeletonItem } from "@/components/base/skeleton";
import { BaseCollapseItem, BaseCollapse } from "@/components/base/collapse";
const loading = ref(true);
</script>

<style scoped></style>
