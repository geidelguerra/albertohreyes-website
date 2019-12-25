<template>
  <main class="flex-1">
    <!-- Hero -->
    <section>
      <div class="bg-cover bg-center bg-no-repeat bg-fixed h-screen" :style="{backgroundImage: `url(${hero.image.url})`}">
        <div class="h-full">
          <div class="max-w-xl mx-auto flex flex-col h-full">
            <div class="flex flex-1 justify-center items-center">
              <div class="p-4">
                <h1 class="text-center font-thin text-white text-2xl">Alberto Hernández Reyes</h1>
                <div class="text-center text-grey-3 text-xl font-thin">
                  {{ about.craft }}
                </div>
                <div class="text-white text-sm text-center pt-2 pb-2 max-w-sm">
                  <div class="" v-html="hero.content"></div>
                  <div class="text-center mt-2">
                    {{ hero.author.name }}
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
        <h2 class="text-center pl-4 pr-4 uppercase text-xl">{{ $t('about.header') }}</h2>
        <div class="text-center p-4">
          <img class="rounded-full overflow-hidden" :src="about.image.url" :alt="about.name">
        </div>
        <div class="pl-8 pr-8">
          <div class="pt-2 pb-2">
            <div class="text-center">
              {{ about.name }}
            </div>
            <div class="text-center">
              {{ about.city }}, {{ about.year }}
            </div>
          </div>

          <div class="pt-2 pb-2 pl-8 pr-8 max-w-lg mx-auto">
            <div class="text-center" v-html="about.content"></div>
          </div>
        </div>
      </div>
    </section>

    <!-- Exhibits list -->
    <section class="pt-32 pb-32">
      <div class="max-w-xl mx-auto flex flex-wrap items-start">
        <div class="w-full pt-4 pb-4 flex justify-center flex-col md:w-1/2">
          <h2 class="uppercase text-xl pl-4 pr-4 pb-8 md:text-center">{{ $t('exhibits.personal') }}</h2>
          <ul class="list-reset pl-2 pr-2">
            <template v-for="(exhibit, i) in personalExhibits">
              <li class="pl-2 pr-2 pt-1 pb-1" :key="i">
                <strong>{{ exhibit.year }}</strong> {{ exhibit.title }} {{ exhibit.location }}
              </li>
            </template>
          </ul>
        </div>

        <div class="w-full pt-4 pb-4 flex justify-center flex-col md:w-1/2">
          <h2 class="uppercase text-xl pl-4 pr-4 pb-8 md:text-center">{{ $t('exhibits.collective') }}</h2>
          <ul class="list-reset pl-2 pr-2">
            <template v-for="(exhibit, i) in collectiveExhibits">
              <li class="pl-2 pr-2 pt-1 pb-1" :key="i">
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
              <h1 class="text-2xl text-center uppercase text-grey-6 pl-4 pr-4 sm:text-3xl">
                {{ exhibit.title }}
              </h1>
              <template v-if="exhibit.description">
                <div class="text-center text-grey-6 pl-4 pr-4 pb-4">
                  {{ exhibit.artist }}
                </div>
                <div class="w-12 h-1 mt-4 mb-4 mx-auto bg-yellow-1"></div>
                <div class="text-justify text-grey-6 p-4" v-html="exhibit.description"></div>
              </template>
            </div>
          </div>

          <!-- Articles -->
          <div v-if="exhibit.articles" class="pt-16 pb-16 bg-grey-5">
            <div class="max-w-xl mx-auto">
              <v-slider auto class="min-h-128 sm:min-h-64">
                <template v-for="(article) in exhibit.articles">
                  <div :key="article.id">
                    <h2 class="text-center uppercase text-grey-7 pl-4 pr-4">{{ article.author.name }}</h2>
                    <div v-if="article.author.title" class="text-center text-sm pl-4 pr-4 pb-4">
                      {{ article.author.title }}
                    </div>
                    <h3 v-if="article.title" class="text-center">
                      <nuxt-link
                        class="hover:underline"
                        :to="getArticleRoute(article)"
                      >
                        {{ article.title }}
                      </nuxt-link>
                    </h3>
                    <div class="text-center p-4">
                      {{ article.excerpt }}
                    </div>
                    <div class="flex justify-center">
                      <nuxt-link
                        class="text-yellow-1 hover:text-grey-1"
                        :to="getArticleRoute(article)"
                      >
                        <v-icon class="text-3xl">plus-circle</v-icon>
                      </nuxt-link>
                    </div>
                  </div>
                </template>
              </v-slider>
            </div>
          </div>

          <!-- Gallery -->
          <div v-if="exhibit.gallery" class="pt-16 pb-16">
            <h1 class="text-2xl text-center uppercase p-4 sm:text-3xl">{{ $t('gallery.header') }}</h1>
            <div class="max-w-xl mx-auto">
              <v-slider :style="{minHeight: `${galleryMinHeight}px`}" :auto="!showGallery">
                <template v-for="(page) in totalPages(exhibit.gallery.length, gallerySliderItemsPerPage)">
                  <div class="flex flex-wrap pl-2 pr-2" :key="page">
                    <template v-for="(item, j) in paginate(exhibit.gallery, page, gallerySliderItemsPerPage)">
                      <div class="w-full pt-4 pb-4 pl-2 pr-2 sm:w-1/2 md:w-1/3" :key="i+j">
                        <button type="button" class="block appearance-none w-full" @click="onGalleryItemClick(item, exhibit.gallery)">
                          <div class="pb-16x9 bg-grey-1 bg-cover bg-center bg-no-repeat hover:shadow-md" :style="{backgroundImage: `url(${item.thumbnail ? item.thumbnail.url : item.image.url})`}"></div>
                          <div class="text-center text-sm mt-1 text-grey-2">{{ item.dimensions.join(' x ') }} <template v-if="item.year">({{ item.year }})</template></div>
                          <h2 class="text-center uppercase mt-4 font-thin text-xl">{{ item.title }}</h2>
                        </button>
                      </div>
                    </template>
                  </div>
                </template>
              </v-slider>
            </div>
          </div>
        </div>
      </template>
    </section>

    <!-- Publications -->
    <section id="publications" class="pt-32 pb-32 bg-grey-1">
      <div class="max-w-xl mx-auto">
        <h1 class="text-2xl text-center uppercase text-grey-6 sm:text-3xl">{{ $t('publications.header') }}</h1>
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
            <v-slider :style="{minHeight: `${galleryMinHeight}px`}" :auto="!showGallery">
              <template v-for="(page) in totalPages(serie.items.length, gallerySliderItemsPerPage)">
                <div class="flex flex-wrap pt-2 pb-2" :key="page">
                  <template v-for="(item, j) in paginate(serie.items, page, gallerySliderItemsPerPage)">
                    <div class="w-full pl-4 pr-4 pt-2 pb-2 sm:w-1/2 md:w-1/3" :key="i+j">
                      <button type="button" class="block appearance-none w-full" @click="onGalleryItemClick(item, serie.items)">
                        <div class="pb-16x9 bg-grey-1 bg-cover bg-center bg-no-repeat" :style="{backgroundImage: `url(${item.thumbnail ? item.thumbnail.url : item.image.url})`}"></div>
                        <div class="text-center text-sm mt-1 text-grey-2">{{ item.dimensions.join(' x ') }} <template v-if="item.year">({{ item.year }})</template></div>
                        <h2 class="text-center uppercase mt-4 font-thin text-xl">{{ item.title }}</h2>
                      </button>
                    </div>
                  </template>
                </div>
              </template>
            </v-slider>
          </div>
        </template>
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
import orderBy from 'lodash/orderBy';

export default {
  async asyncData ({ store }) {
    const locale = store.state.locale;

    await store.dispatch('exhibits/fetchItems');
    await store.dispatch('articles/fetchItems');
    await store.dispatch('featured/fetchItems');
    await store.dispatch('publications/fetchItems');
    await store.dispatch('series/fetchItems');

    const hero = await Promise.resolve(require(`~/data/${locale}/hero.json`));
    const about = await Promise.resolve(require(`~/data/${locale}/about.json`));

    return { hero, about };
  },

  head () {
    const title = this.$t('head.title');
    const description = this.$t('head.meta.description');

    return {
      title,
      meta: [
        { hid: 'description', name: 'description', content: description }
      ]
    };
  },

  components: {
    VPagination,
    VSlider,
    VGallery
  },

  data () {
    return {
      hero: null,
      about: null,
      gallerySliderItemsPerPage: 3,
      showGallery: false,
      galleryItemIndex: -1,
      galleryItems: [],
      galleryMinHeight: 0,
    }
  },

  computed: {
    exhibits () {
      return orderBy(this.$store.state.exhibits.items, 'year', 'desc');
    },
    personalExhibits () {
      return this.exhibits.filter((exhibit) => exhibit.personal);
    },
    collectiveExhibits () {
      return this.exhibits.filter((exhibit) => !exhibit.personal);
    },
    featuredExhibits () {
      return orderBy(this.$store.getters['featured/items'], 'year', 'desc');
    },
    publications () {
      return this.$store.state.publications.items;
    },
    series() {
      return this.$store.state.series.items;
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
    calculateGalleryMinHeight () {
      const viewHeight = window.outerWidth;

      this.galleryMinHeight = viewHeight > 575 ?  375 : 1390;
    },
    getArticleRoute (article) {
      const locale = this.$store.state.locale;

      return `/${locale}/articles/${article.id}`;
    },
    totalPages (totalItems, itemsPerPage) {
      return Math.ceil(totalItems / itemsPerPage);
    },
    paginate (items, page, itemsPerPage) {
      const totalItems = items.length;
      const i = (page - 1) * itemsPerPage;
      const j = i + itemsPerPage;

      return items.slice(i, j);
    },
    onGalleryItemClick (item, gallery) {
      this.galleryItems = gallery;
      this.galleryItemIndex = gallery.findIndex((item2) => item2 == item);
      this.showGallery = true;
    },
    onResize (e) {
      this.calculateGalleryMinHeight();
    }
  },

  mounted () {
    this.calculateGalleryMinHeight();
    window.addEventListener('resize', this.onResize);
  },

  beforeDestroyed () {
    window.removeEventListener('resize', this.onResize);
  }
}
</script>
