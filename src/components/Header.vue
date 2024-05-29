<script setup>
import ComboBox from '@/components/ComboBox.vue'

import debounce from 'lodash.debounce';
import { ref, watch } from 'vue';
import { useWeatherStore } from '@/stores/weatherStore';

const store = useWeatherStore();

const query = ref('');
const results = ref([]);

watch(query, debounce(async () => {
  if (!query.value) {
    results.value = [];
    return
  }

  results.value = await store.searchCity(query.value);
}, 1000));

function addCity(city) {
  store.addCity(city);
  results.value = [];
  query.value = '';
}
</script>
<template>
    <header class='flex justify-between items-center text-zinc-100  bg-zinc-700 rounded-2xl p-4 shadow-md'>
        <h1 class='text-xl text-nowrap'>Keep Weather</h1>
        <div class='flex justify-between gap-4 w-fit'>
            <button
                v-if='store.cities.length > 0'
                class='text-sm text-whit font-medium hover:bg-red-500 border-red-500 border-2 p-2 rounded-lg trans-2'
                @click='store.$reset()'
            >Réinitialiser les villes</button>
            <ComboBox
                v-model='query'
                @optionClick='(option) => addCity(option)'
                :options='results'
            />
        </div>
    </header>
</template>