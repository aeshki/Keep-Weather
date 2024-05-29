<script setup>
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import WeatherListCard from '@/components/WeatherListCard.vue'

import { useWeatherStore } from '@/stores/weatherStore';

const store = useWeatherStore();

</script>
<template>
  <Header />
  <main class='flex flex-col items-center gap-6 bg-zinc-300 h-full rounded-2xl p-4 shadow-md'>
    <WeatherListCard
      :cities='store.cities'
    />
  </main>
  <Footer />
</template>