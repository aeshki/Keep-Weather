<script setup>
import WeatherCard from '@/components/WeatherCard.vue'
const props = defineProps([
    'cities',
]);
</script>
<template>
    <ul
      v-if='cities.length > 0'
      class='flex flex-wrap gap-5 p-2 flex-center'
    >
      <li
        v-for='city in cities'
        :key='city.name'
      >
        <WeatherCard
          :id='city.id'
          :icon='city.weather[0].icon'
          :name='city.info.name'
          :state='city.info.state'
          :country='city.info.country'
          :description='city.weather[0].description'
          :humidity='city.main.humidity'
          :temp='city.main.temp'
          :temp-min='city.main.temp_min'
          :temp-max='city.main.temp_max'
          />
      </li>
    </ul>
    <p
      v-else
      class='w-full h-full flex flex-center'
    >Aucune ville ajoutées :(</p>
</template>