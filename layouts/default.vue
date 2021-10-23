
<template>
  <div class="font-sans text-base leading-tight tracking-normal text-black flex flex-col min-h-screen">
    <transition name="fade">
      <nav
        class="absolute pin-t w-full z-20"
        :class="{ 'bg-grey-1 fixed pin': showMenu }"
      >
        <div class="flex w-full max-w-xl mx-auto">
          <ul class="list-reset flex p-2 justify-center items-center">
            <li v-for="(locale) in locales" :key="locale">
              <a
                class="uppercase text-black block p-2 font-bold border-2 border-transparent"
                :class="{'border-black': locale === currentLocale}"
                :key="locale"
                :href="getLocaleRoute(locale)"
              >
                {{ locale }}
              </a>
            </li>
          </ul>

          <div class="flex-1"></div>

          <div
            class="flex flex-col items-end pl-4 pr-4 justify-center z-50"
            :style="{ height: `${navHeight}px` }"
          >
            <v-menu-btn :active="showMenu" @click="showMenu=!showMenu"></v-menu-btn>
          </div>
        </div>

        <div v-if="showMenu">
          <div class="max-w-xl mx-auto">
            <ul class="list-reset p-4">
              <template v-for="(item, i) in items">
                <li :key="i">
                  <a
                    class="block text-grey-2 p-4 text-center text-2xl hover:text-white"
                    :href="item.to"
                    @click="showMenu=false"
                  >
                    {{ item.text }}
                  </a>
                </li>
              </template>
            </ul>
          </div>
        </div>
      </nav>
    </transition>

    <nuxt class="flex-1"/>

    <footer class="bg-grey-1">
      <!-- Contact -->
      <section id="contact" class="pt-32 pb-32">
        <div class="max-w-xl mx-auto">
          <h1 class="text-center uppercase text-grey-6">{{ $t('contact.header') }}</h1>
          <div class="text-center p-4">
            <a class="text-grey-6 hover:text-white" :href="`mailto:${contact.email}`">{{ contact.email }}</a>
          </div>
        </div>
      </section>

      <!-- Copyright -->
      <section class="max-w-xl mx-auto flex flex-wrap text-grey-2 p-2 text-xs items-center">
        <div class="w-full text-center p-2 sm:w-1/2 sm:text-left" v-html="$t('footer.copy')"></div>

        <div class="w-full text-center pl-4 pr-4 pt-1 pb-1 sm:w-1/2 sm:text-right">
          {{ $t('footer.createdBy') }} <a class="text-grey-3 hover:text-white" href="https://geidelguerra.com">Geidel Guerra</a>
        </div>
      </section>
    </footer>
  </div>
</template>

<script>
import VMenuBtn from '~/components/MenuButton.vue';

export default {
  head () {
    return {
      htmlAttrs: {
        lang: this.$store.state.locale,
      }
    };
  },

  components: {
    VMenuBtn
  },

  data () {
    return {
      items: [
        {
          text: this.$t('nav.about'),
          to: this.getRoute('#about'),
        },
        {
          text: this.$t('nav.exhibits'),
          to: this.getRoute('#featured'),
        },
        {
          text: this.$t('nav.publications'),
          to: this.getRoute('#publications'),
        },
        {
          text: this.$t('nav.otherWork'),
          to: this.getRoute('#others'),
        },
        {
          text: this.$t('nav.contact'),
          to: this.getRoute('#contact'),
        },
      ]
    }
  },

  computed: {
    locales () {
      return this.$store.state.locales;
    },
    currentLocale: {
      get () {
        return this.$store.state.locale;
      },
      set (value) {
        this.$store.commit('setLocale', value);
      }
    },
    showMenu: {
      get () { return this.$store.state.showMenu; },
      set (value) { this.$store.commit('setShowMenu', value); }
    },
    navHeight () {
      return this.$store.state.navHeight;
    },
    contact () {
      return this.$store.state.contact;
    }
  },

  watch: {
    'showMenu': function (value) {
      if (value) {
        document.querySelector('body').classList.add('overflow-hidden');
      } else {
        document.querySelector('body').classList.remove('overflow-hidden');
      }
    }
  },

  methods: {
    getRoute (path) {
      const locale = this.$store.state.locale;
      const prefix = locale !== 'es' ? `/${locale}` : '';

      return `${prefix}/${path}`;
    },
    getLocaleRoute (locale) {
      if (locale === 'es') {
        return '/';
      }

      return `/${locale}`;
    },
  }
}
</script>

<style>
html {
  font-size: 16px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

a {
  color: inherit;
  text-decoration: none;
}

* {
  transition: all 0.5s ease;
}

.fade-enter-active, .fade-leave-active {
  transition: all .5s ease-out;
}

.fade-enter, .fade-leave-active {
  opacity: 0;
}

.scale-in-fade-enter-active, .scale-in-fade-leave-active {
  transition: all .5s ease-out;
}

.scale-in-fade-enter, .scale-in-fade-leave-active {
  opacity: 0;
  transform: scale(0.5,0.5);
}

.slide-enter-active, .slide-leave-active {
  transition: all .5s ease-out;
}

.slide-enter {
  transform: translate(100%);
}

.slide-leave-active {
  transform: translate(-100%);
}

.slide-fade-top-enter-active, .slide-fade-top-leave-active {
  transition: all .5s ease-out;
}

.slide-fade-top-enter, .slide-fade-top-leave-active {
  opacity: 0;
  transform: translateY(-100%);
}

.slide-fade-bottom-enter-active, .slide-fade-bottom-leave-active {
  transition: all .5s ease-out;
}

.slide-fade-bottom-enter, .slide-fade-bottom-leave-active {
  opacity: 0;
  transform: translateY(100%);
}
</style>
