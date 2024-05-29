import axios from 'axios';

import { ref } from 'vue';
import { defineStore } from 'pinia';

export const useWeatherStore = defineStore('weather', () => {
  const cities = ref([]);

  async function _baseQuery(url, params) {
    const lang = navigator.language.slice(0, 2);

    return await axios.get(`https://api.openweathermap.org/${url}`, {
      params: {
        appid: import.meta.env.VITE_API_KEY,
        units: 'metric',
        lang,
        ...Object.assign(...Object.entries(params).map((param) => ({
          [param[0]]: Array.isArray(param[1]) ? param[1].join(',') : param[1]
        })))
      }
    }).then((rep) => rep.data);
  };

  /**
   * Renvoi la première ville trouvée
   * @param {String} cityName Nom de la ville
   */
  async function searchCity(cityName) {
    return await _baseQuery('geo/1.0/direct', {
      'q': cityName
    });
  };

  async function fetchWeather(city) {
    const currentWeather = await _baseQuery('data/2.5/weather', {
      'q': [
        city.name,
        city.state,
        city.country
      ],
    });

    // Arrondit la section main qui contient les températures etc..
    currentWeather.main = Object.assign(...Object.entries(currentWeather.main).map((obj) => ({
      [obj[0]]: Math.floor(obj[1])
    })));

    return {
      info: {
        name: city.name,
        state: city.state,
        country: city.country
      },
      ...currentWeather
    };
  };

  async function addCity(cityData) {
    if (cities.value?.find((city) => city.name === cityData.name)) {
        return;
    }
      
    const weather = await fetchWeather(cityData);
    
    cities.value.push(weather);
  }

  function removeCity(cityId) {
    cities.value = cities.value.filter((f) => f.id !== cityId);
  }

  function $reset() {
    cities.value = [];
  };

  return {
    cities,
    addCity,
    removeCity,
    searchCity,
    fetchWeather,
    $reset
  }
}, { persist: true });