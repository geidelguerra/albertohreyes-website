<template lang="html">
  <main class="flex flex-col w-full" :style="{paddingTop: `${navHeight}px`}">
    <article :id="article.id" class="flex-1">
      <header class="pb-4">
        <h1 class="font-thin pl-4 pr-4 pb-2">{{ article.title }}</h1>
        <h4 class="pl-4 pr-4">{{ article.author.name }}</h4>
        <div class="pl-4 pr-4">{{ article.author.title }}</div>
      </header>

      <main class="pb-4">
        <div class="text-justify pl-4 pr-4" v-html="article.content"></div>
      </main>
    </article>
    <div class="flex justify-between pl-4 pr-4">
      <nuxt-link
        v-if="previousArticle"
        class="flex items-center p-4 truncate flex-1"
        :to="getArticleRoute(previousArticle)"
        >
        <div class="pr-4 text-xl">
          <v-icon>chevron-left</v-icon>
        </div>
        <div class="font-bold text-left truncate">{{ previousArticle.title }}</div>
      </nuxt-link>

      <nuxt-link
        v-if="nextArticle"
        class="flex justify-end items-center p-4 truncate flex-1"
        :to="getArticleRoute(nextArticle)"
        >
        <div class="font-bold text-right truncate">{{ nextArticle.title }}</div>
        <div class="pl-4 text-xl">
          <v-icon>chevron-right</v-icon>
        </div>
      </nuxt-link>
    </div>
  </main>
</template>

<script>
export default {
  async asyncData ({ store, params, payload }) {
    await store.dispatch('articles/fetchItems');
    const article = store.state.articles.items.find((item) => item.id == params.article);

    return { article };
  },

  head () {
    const title = this.article.title;
    const description = this.article.excerpt;

    return {
      title: title,
      meta: [
        { hid: 'description', name: 'description', content: description },
        // Open Graph tags
        // http://ogp.me
        { property: 'og:url', content: `${process.env.baseUrl}${this.$route.fullPath}` },
        { property: 'og:type', content: 'article' },
        { property: 'og:title', content: title },
        { property: 'og:description', content: description },
      ]
    };
  },

  data () {
    return {
      article: null,
    };
  },

  computed: {
    articleIndex () {
      if (this.article) {
        return this.$store.state.articles.items.findIndex((article) => article.id == this.article.id);
      }

      return -1;
    },
    navHeight () {
      return this.$store.state.navHeight;
    },
    previousArticle () {
      const nextIndex = this.articleIndex - 1;

      if (nextIndex < 0) {
        return null;
      }

      return this.$store.state.articles.items[nextIndex];
    },
    nextArticle () {
      if (this.articleIndex == -1) return null;

      const nextIndex = this.articleIndex + 1;

      if (nextIndex >= this.$store.state.articles.items.length) {
        return null;
      }

      return this.$store.state.articles.items[nextIndex];
    }
  },

  methods: {
    getArticleRoute (article) {
      return {
        name: 'articles-article',
        params: { article: article.id }
      };
    }
  }
}
</script>
