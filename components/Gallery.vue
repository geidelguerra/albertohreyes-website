<template lang="html">
  <div class="w-full h-full flex flex-col relative">
    <div class="flex w-full p-2">
      <div class="text-white text-sm p-2">
        {{ value + 1 }} de {{ items.length }}
      </div>
      <div class="flex-1"></div>
      <button type="button" class="block p-2 text-white bg-white-10 rounded w-10 ml-2 mr-2" @click="$emit('request-close')">
        <v-icon>times</v-icon>
      </button>
    </div>

    <div class="flex-1 flex relative p-4">
      <div ref="imageContainer" class="flex justify-center items-center w-full">
        <transition name="fade" mode="out-in">
          <img v-if="currentItem" class="max-w-full h-auto" :style="{maxHeight: `${imageContainerSize}px`}" :src="currentItem.image.url" :alt="currentItem.title" :key="currentItem.image.url">
        </transition>
      </div>

      <button type="button" class="absolute pin-l pin-y w-1/3 bg-black opacity-0 text-white text-5xl focus:outline-none hover:opacity-25" @click="previousItem">
        <v-icon>chevron-left</v-icon>
      </button>
      <button type="button" class="absolute pin-r pin-y w-1/3 bg-black opacity-0 text-white text-5xl opacity-0 focus:outline-none hover:opacity-25" @click="nextItem">
        <v-icon>chevron-right</v-icon>
      </button>
    </div>

    <div class="pl-4 pr-4 overflow-hidden">
      <transition name="slide-fade-top" mode="out-in">
        <h2 class="text-white text-center uppercase text-xl font-thin" :key="currentItem.image.url">{{ currentItem.title}}</h2>
      </transition>
      <transition name="slide-fade-bottom" mode="out-in">
        <div class="text-center text-grey-2 text-sm pb-4" :key="currentItem.image.url">
          {{ currentItem.dimensions.join(' x ') }} <template v-if="currentItem.year">({{ currentItem.year }})</template>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    items: Array,
    value: Number,
  },

  data () {
    return {
      imageContainerSize: 0,
    };
  },

  computed: {
    currentItem () {
      if (this.value >= 0 && this.value < this.items.length) {
        return this.items[this.value];
      }

      return null;
    },
  },

  methods: {
    updateImageContainerSize () {
      this.imageContainerSize = this.$refs.imageContainer.clientHeight;
    },
    nextItem () {
      let nextIndex = this.value + 1;

      if (nextIndex >= this.items.length) {
        nextIndex = 0;
      }

      this.$emit('input', nextIndex);
    },
    previousItem () {
      let nextIndex = this.value - 1;

      if (nextIndex < 0) {
        nextIndex = this.items.length - 1;
      }

      this.$emit('input', nextIndex);
    },
    onKeyUp (event) {
      const code = event.code;

      if (code == 'Escape') {
        this.$emit('request-close');
      }

      if (code == 'ArrowLeft') {
        this.previousItem();
      }

      if (code == 'ArrowRight') {
        this.nextItem();
      }
    },
    onResize (event) {
      this.updateImageContainerSize();
    }
  },

  mounted () {
    window.addEventListener('keyup', this.onKeyUp);
    window.addEventListener('resize', this.onResize);
    this.updateImageContainerSize();
  },

  beforeDestroy () {
    window.removeEventListener('keyup', this.onKeyUp);
    window.removeEventListener('resize', this.onResize);
  }
}
</script>
