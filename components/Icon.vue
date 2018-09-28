<template lang="html">
  <i :class="className"></i>
</template>

<script>
export default {
  computed: {
    className () {
      return [
        'fa',
        'fa-' + (this.$slots.default ? this.$slots.default[0].text : '')
      ];
    },
  }
}
</script>
