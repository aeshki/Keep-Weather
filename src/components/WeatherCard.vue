<script setup>
const props = defineProps([
    'id',
    'icon',
    'name',
    'state',
    'country',
    'description',
    'humidity',
    'temp',
    'tempMin',
    'tempMax'
]);

import { useWeatherStore } from '@/stores/weatherStore';

const store = useWeatherStore();
</script>
<template>
    <div class='flex gap-3 bg-zinc-50 text-zinc-800 p-3 rounded-xl shadow-md'>
        <div class='flex flex-col items-center justify-center'>
            <img
                :src='`http://openweathermap.org/img/w/${props.icon}.png`'
                :alt='`Icon ${props.description}`'
            />
            <span class='text-sm'>{{ props.description }}</span>
        </div>
        <div>
            <div class='flex flex-col mb-1'>
                <h2>{{ props.name }}</h2>
                <p>{{ props.state }}</p>
            </div>
            <p class='text-sm'>Humidité {{ props.humidity }}%</p>
            <p v-if='props.tempMin === props.tempMax' class='text-sm'>Température {{ props.temp }}°</p>
            <template v-if='props.tempMin !== props.tempMax' >
                <p class='text-sm'>Température min {{ props.tempMin }}°</p>
                <p class='text-sm'>Température max {{ props.tempMax }}°</p>
            </template>
            <button
                class='text-sm border-l-red-600 hover:bg-red-600 hover:text-white border-l-2 px-2 trans-2'
                @click='store.removeCity(props.id)'
            >Supprimer</button>
        </div>
    </div>
</template>