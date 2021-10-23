<template lang="html">
  <button v-bind="$attrs" v-on="$listeners" type="button" class="menu-btn block w-10 h-8 focus:outline-none" :class="{'menu-btn-active': active}">
    <div class="flex flex-col justify-between h-full">
      <span class="bg-black" :class="{'bg-white': active}" style="height: 4px;"></span>
      <span class="bg-black" :class="{'bg-white': active}" style="height: 4px;"></span>
      <span class="bg-black" :class="{'bg-white': active}" style="height: 4px;"></span>
    </div>
  </button>
</template>

<script>
export default {
  props: {
    active: Boolean
  }
}
</script>
<style lang="css">
.menu-btn > div > span {
  position: relative;
  transition: none;
}
.menu-btn-active > div > span:nth-child(1) {
  transform: rotate(45deg);
  transform-origin: left center;
}
.menu-btn-active > div > span:nth-child(2) {
  transform: rotate(-45deg);
  transform-origin: left center;
}
.menu-btn-active > div > span:nth-child(3) {
  display: none;
}
</style>
