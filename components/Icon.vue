<template lang="html">
  <i :class="className"></i>
</template>

<script>
export default {
  computed: {
    className () {
      console.log(this.$slots.default);
      return [
        'fa',
        'fa-' + (this.$slots.default ? this.$slots.default[0].text : '')
      ];
    },
  }
}
</script>
