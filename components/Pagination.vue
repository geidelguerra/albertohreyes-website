<template lang="html">
  <div class="flex justify-center items-center">
    <template v-for="i in total">
      <button type="button" class="w-4 h-4 bg-grey-3 rounded-full flex justify-center items-center m-1" :key="i" @click="$emit('input', i)">
        <div class="rounded-full w-2 h-2" :class="i == value ? 'bg-black' : 'bg-white'"></div>
      </button>
    </template>
  </div>
</template>

<script>
export default {
  props: {
    total: Number,
    value: Number,
  },
}
</script>
