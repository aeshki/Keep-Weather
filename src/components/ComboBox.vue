<script setup>
defineEmits(['optionClick']);

const props = defineProps([
  'options'
]);

const query = defineModel();
</script>
<template>
    <div class='relative'>
      <input
        class='p-2 text-sm text-zinc-800 bg-zinc-50 hover:bg-white rounded-lg w-fit self-center outline-none border-2 border-transparent focus:border-zinc-500 trans-2'
        v-model='query'
        placeholder="Nom d'une ville.."
        type='text'
        id='search'
        minlength='2'
        autocomplete='off'
        autocorrect='off'
      />
      <ul
        v-if='props.options.length > 0'
        class='bg-zinc-50 hover:bg-white trans-2 p-2 text-nowrap shadow-sm rounded-lg absolute top-12 left-full -translate-x-full text-zinc-800'
      >
        <li
          v-for='(option, idx) in props.options'
          :key='idx'
        >
          <span @click='$emit("optionClick", option)'>{{ option.name }}, {{ option.state }}</span>
        </li>
      </ul>
    </div>
</template>