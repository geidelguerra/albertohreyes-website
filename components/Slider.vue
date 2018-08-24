<script>
import VPagination from '~/components/Pagination.vue';

export default {
  props: {
    auto: Boolean,
    delay: { default: 5000 },
    transition: { default: 'fade' },
  },

  components: {
    VPagination,
  },

  data () {
    return {
      index: 0,
      timerId: null,
    };
  },

  computed: {
    numberOfSlides () {
      return this.$slots.default.length;
    }
  },

  watch: {
    'auto': function (value) {
      clearInterval(this.timerId);

      if (value) {
        this.startAutoSlide();
      }
    },

    'index': function () {
      clearInterval(this.timerId);

      if (this.auto) {
        this.startAutoSlide();
      }
    }
  },

  render (createElement, context) {
    return createElement('div', {}, [
      createElement('div', {
        attrs: {
          class: 'overflow-hidden',
        }
      }, [
        createElement('transition', {
          props: {
            name: this.transition,
            mode: 'out-in'
          },
        }, [
          this.$slots.default[this.index]
        ])
      ]),
      createElement('div', {
        attrs: {
          class: 'flex justify-center items-center',
        }
      }, [
        createElement('v-pagination', {
          props: {
            total: this.numberOfSlides,
            value: this.index + 1,
          },

          on: {
            input: (value) => {
              this.index = value - 1;
            }
          }
        })
      ])
    ]);
  },

  methods: {
    nextSlide () {
      let nextIndex = this.index + 1;

      if (nextIndex >= this.numberOfSlides) {
        nextIndex = 0;
      }

      this.index = nextIndex;
    },
    startAutoSlide () {
      this.timerId = setInterval(this.nextSlide.bind(this), this.delay);
    },
  },

  mounted () {
    if (this.auto) {
      this.startAutoSlide();
    }
  }
}
</script>
