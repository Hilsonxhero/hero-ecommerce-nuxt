<template>
  <div>
    <Swiper :slides-per-view="1" :loop="true" :effect="'creative'">
      <SwiperSlide v-for="slide in 10" :key="slide">
        <strong>{{ slide }}</strong>
      </SwiperSlide>
    </Swiper>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped></style>
