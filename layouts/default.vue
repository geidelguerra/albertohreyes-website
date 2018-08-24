<template>
  <div class="font-sans text-base leading-tight tracking-normal text-black flex flex-col min-h-screen">
    <transition name="fade">
      <nav class="absolute pin-t w-full z-20" :class="{'bg-grey-1 fixed pin': showMenu}">
        <div class="flex flex-col items-end pl-8 pr-8 z-50">
          <v-menu-btn :active="showMenu" @click="showMenu=!showMenu"></v-menu-btn>
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

    <nuxt/>

    <footer class="bg-grey-1">
      <div class="max-w-xl mx-auto flex flex-wrap text-grey-2 p-2 text-xs items-center">
        <div class="w-full text-center p-2 sm:w-1/2 sm:text-left">
          Alberto Hernández Reyes &copy; 2018 | Artista plástico
        </div>

        <div class="w-full text-center pl-4 pr-4 pt-1 pb-1 sm:w-1/2 sm:text-right">
          Creado por <a class="text-grey-3 hover:text-white" href="https://geidelguerra.com">Geidel Guerra</a>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
import VMenuBtn from '~/components/MenuButton.vue';

export default {
  components: {
    VMenuBtn
  },

  data () {
    return {
      items: [
        {
          text: 'Sobre el autor',
          to: '#about',
        },
        {
          text: 'Exposiciones',
          to: '#featured',
        },
        {
          text: 'Publicaciones',
          to: '#publications',
        },
        {
          text: 'Otras obras',
          to: '#series',
        },
        {
          text: 'Contacto',
          to: '#contact',
        },
      ]
    }
  },

  computed: {
    showMenu: {
      get () { return this.$store.state.showMenu; },
      set (value) { this.$store.commit('setShowMenu', value); }
    },
  },

  watch: {
    'showMenu': function (value) {
      if (value) {
        document.querySelector('body').classList.add('overflow-hidden');
      } else {
        document.querySelector('body').classList.remove('overflow-hidden');
      }
    }
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
