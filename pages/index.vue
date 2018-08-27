<template>
  <main class="flex-1">
    <!-- Hero -->
    <section>
      <div class="bg-cover bg-center bg-no-repeat bg-fixed h-screen" :style="{backgroundImage: `url(${hero.imageUrl})`}">
        <div class="h-full">
          <div class="max-w-xl mx-auto flex flex-col h-full">
            <div class="flex flex-1 justify-center items-center">
              <div class="p-4">
                <h1 class="text-center font-thin text-white text-2xl">Alberto Hernández Reyes</h1>
                <div class="text-center text-grey-3 text-xl font-thin">
                  Artista de la Plástica
                </div>
                <div class="text-white text-sm text-center pt-2 pb-2 max-w-sm">
                  Para Alberto: Es como estar suspendido en un lugar indefinido del espacio y desde allí contemplar las brumas de una tempestad contenida sobre el Paisaje Cubano, <em>¡qué bella inspiración, qué noble oficio!</em>
                  <div class="text-center mt-2">
                    Eusebio Leal Spengler
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- About -->
    <section id="about" class="pt-32 pb-32 bg-grey-5">
      <div class="max-w-xl mx-auto">
        <h2 class="text-center pl-4 pr-4 uppercase text-xl">Sobre el autor</h2>
        <div class="text-center p-4 ">
          <img :src="about.imageUrl" alt="Alberto Hernández Reyes">
        </div>
        <div class="pl-8 pr-8">
          <div class="pt-2 pb-2">
            <div class="text-center">
              Alberto Hernández Reyes
            </div>
            <div class="text-center">
              La Habana, 1976
            </div>
          </div>

          <div class="text-center pt-2 pb-2 pl-8 pr-8 max-w-lg mx-auto">
            <p>Creador independiente. Miembro de la UNEAC (Unión de Escritores y Artistas de Cuba).</p>
            <p>Graduado de Doctor en Medicina en el Instituto Superior de Ciencias Médicas de La Habana.</p>
          </div>
        </div>
      </div>

    </section>

    <!-- Exhibits list -->
    <section class="pt-32 pb-32">
      <div class="max-w-xl mx-auto flex flex-wrap items-start">
        <div class="w-full p-4 flex justify-center flex-col md:w-1/2">
          <h2 class="text-center uppercase text-xl pb-8">Exposiciones personales</h2>
          <ul class="list-reset">
            <template v-for="(exhibit, i) in personalExhibits">
              <li class="pl-4 pr-4 pt-1 pb-1" :key="i">
                <strong>{{ exhibit.year }}</strong> {{ exhibit.title }} {{ exhibit.location }}
              </li>
            </template>
          </ul>
        </div>

        <div class="w-full p-4 flex justify-center flex-col md:w-1/2">
          <h2 class="text-center uppercase text-xl pb-8">Exposiciones colectivas</h2>
          <ul class="list-reset">
            <template v-for="(exhibit, i) in collectiveExhibits">
              <li class="pl-4 pr-4 pt-1 pb-1" :key="i">
                <strong>{{ exhibit.year }}</strong> {{ exhibit.title }} {{ exhibit.location }}
              </li>
            </template>
          </ul>
        </div>
      </div>
    </section>

    <!-- Featured -->
    <section id="featured">
      <template v-for="(exhibit, i) in featuredExhibits">
        <div :key="i">
          <div class="pt-16 pb-16 bg-cover bg-no-repeat bg-center bg-fixed" :style="{backgroundImage: `url(${exhibit.image.url})`}">
            <div class="max-w-xl mx-auto">
              <h1 class="text-center uppercase text-grey-6 pl-4 pr-4">{{ exhibit.title }}</h1>
              <template v-if="exhibit.description">
                <div class="text-center text-grey-6 pl-4 pr-4">
                  {{ exhibit.artist }}
                </div>
                <div class="text-justify text-grey-6 p-4" v-html="exhibit.description"></div>
              </template>
            </div>
          </div>

          <!-- Articles -->
          <div v-if="exhibit.articles" class="pt-16 pb-16 bg-grey-5 ">
            <div class="max-w-xl mx-auto">
              <v-slider auto>
                <template v-for="(article, j) in exhibit.articles">
                  <div class="min-h-64" :key="i+j">
                    <h2 class="text-center uppercase text-grey-7 pl-4 pr-4">{{ article.author.name }}</h2>
                    <div v-if="article.author.title" class="text-center text-sm pl-4 pr-4 pb-4">
                      {{ article.author.title }}
                    </div>
                    <h3 v-if="article.title" class="text-center">{{ article.title }}</h3>
                    <div class="text-center p-4">
                      {{ article.excerpt }}
                    </div>
                  </div>
                </template>
              </v-slider>
            </div>
          </div>

          <!-- Gallery -->
          <div v-if="exhibit.gallery" class="pt-16 pb-16">
            <h1 class="text-center uppercase p-4">Galería</h1>
            <div class="max-w-xl mx-auto">
              <div class="flex flex-wrap pl-2 pr-2">
                <template v-for="(item, j) in exhibit.gallery">
                  <div class="w-full pt-4 pb-4 pl-2 pr-2 sm:w-1/2 md:w-1/3" :key="i+j">
                    <button type="button" class="block appearance-none w-full" @click="onGalleryItemClick(item, exhibit.gallery)">
                      <div class="pb-16x9 bg-grey-1 bg-cover bg-center bg-no-repeat hover:shadow-md" :style="{backgroundImage: `url(${item.thumbnail ? item.thumbnail.url : item.image.url})`}"></div>
                      <div class="text-center text-sm mt-1 text-grey-2">{{ item.dimensions.join(' x ') }} <template v-if="item.year">({{ item.year }})</template></div>
                      <h2 class="text-center uppercase mt-4 font-thin text-xl">{{ item.title }}</h2>
                      <div class="w-12 h-1 mt-4 mb-4 mx-auto bg-black"></div>
                      <p class="text-center text-grey-2">{{ item.description }}</p>
                    </button>
                  </div>
                </template>
              </div>
            </div>
          </div>
        </div>
      </template>
    </section>

    <!-- Publications -->
    <section id="publications" class="pt-32 pb-32 bg-grey-1">
      <div class="max-w-xl mx-auto">
        <h1 class="text-center uppercase text-grey-6">Publicaciones</h1>
        <ul class="list-reset flex flex-wrap justify-center pl-4 pr-4">
          <template v-for="(publication, i) in publications">
            <li class="text-center text-grey-6 text-sm p-4 w-full md:w-1/2 lg:w-1/4" :key="i">{{ publication.title }}</li>
          </template>
        </ul>
      </div>
    </section>

    <!-- Series -->
    <section id="others" class="pt-16 pb-16">
      <div class="max-w-xl mx-auto">
        <template v-for="(serie, i) in series">
          <div class="pt-16 pb-16" :key="i">
            <h2 class="text-center uppercase text-xl mb-4">{{ serie.title }}</h2>
            <div class="flex flex-wrap pt-2 pb-2">
              <template v-for="(item, j) in serie.items">
                <div class="w-full pl-4 pr-4 pt-2 pb-2 sm:w-1/2 md:w-1/3" :key="i+j">
                  <button type="button" class="block appearance-none w-full" @click="onGalleryItemClick(item, serie.items)">
                    <div class="pb-16x9 bg-grey-1 bg-cover bg-center bg-no-repeat" :style="{backgroundImage: `url(${item.thumbnail ? item.thumbnail.url : item.image.url})`}"></div>
                    <div class="text-center text-sm mt-1 text-grey-2">{{ item.dimensions.join(' x ') }} <template v-if="item.year">({{ item.year }})</template></div>
                    <h2 class="text-center uppercase mt-4 font-thin text-xl">{{ item.title }}</h2>
                    <div class="w-12 h-1 mt-4 mb-4 mx-auto bg-black"></div>
                    <p class="text-center text-grey-2 pb-4">{{ item.description }}</p>
                  </button>
                </div>
              </template>
            </div>
          </div>
        </template>
      </div>
    </section>

    <!-- Contact -->
    <section id="contact" class="pt-32 pb-32 bg-grey-1">
      <div class="max-w-xl mx-auto">
        <h1 class="text-center uppercase text-grey-6">Contacto</h1>
        <div class="text-center p-4">
          <a class="text-grey-6 hover:text-white" :href="`mailto:${contact.email}`">{{ contact.email }}</a>
        </div>
      </div>
    </section>

    <transition name="fade">
      <div v-if="showGallery" class="fixed pin bg-black">
        <v-gallery v-model="galleryItemIndex" :items="galleryItems" @request-close="showGallery=false"></v-gallery>
      </div>
    </transition>
  </main>
</template>

<script>
import VPagination from '~/components/Pagination.vue';
import VSlider from '~/components/Slider.vue';
import VGallery from '~/components/Gallery.vue';

export default {
  components: {
    VPagination,
    VSlider,
    VGallery
  },

  data () {
    return {
      hero: {
        imageUrl: '/media/hero.jpg',
      },
      about: {
        imageUrl: '/media/me.png'
      },
      contact: {
        email: 'albertohreyes1976@gmail.com'
      },
      showGallery: false,
      galleryItemIndex: -1,
      galleryItems: [],
    }
  },

  computed: {
    exhibits () {
      return this.$store.state.exhibits
        .slice()
        .sort((a, b) => a.year > b.year ? -1 : a.year < b.year ? 1 : 0);
    },
    personalExhibits () {
      return this.exhibits.filter((exhibit) => exhibit.personal);
    },
    collectiveExhibits () {
      return this.exhibits.filter((exhibit) => !exhibit.personal);
    },
    featuredExhibits () {
      return this.$store.state.featured
        .slice()
        .sort((a, b) => a.year > b.year ? 1 : a.year < b.year ? -1 : 0);
    },
    publications () {
      return this.$store.state.publications;
    },
    series() {
      return this.$store.state.series;
    }
  },

  watch: {
    'showGallery': function (value) {
      if (value) {
        document.querySelector('body').classList.add('overflow-hidden');
      } else {
        document.querySelector('body').classList.remove('overflow-hidden');
      }
    }
  },

  methods: {
    onGalleryItemClick (item, gallery) {
      this.galleryItems = gallery;
      this.galleryItemIndex = gallery.findIndex((item2) => item2 == item);
      this.showGallery = true;
    },
  },
}
</script>
