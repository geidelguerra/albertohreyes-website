const isDev = process.env.NODE_ENV != 'production';

let css = [
  '~/assets/css/tailwind.css',
];

if (isDev) {
  css = css.concat([
    '@fortawesome/fontawesome-free/css/all.css',
    '@fortawesome/fontawesome-free/css/fontawesome.css',
    '@fortawesome/fontawesome-free/css/regular.css',
  ]);
} else {
  css = css.concat([
    '@fortawesome/fontawesome-free/css/all.min.css',
    '@fortawesome/fontawesome-free/css/fontawesome.min.css',
    '@fortawesome/fontawesome-free/css/regular.min.css',
  ]);
}

module.exports = {
  /*
  ** Modules
  */
  modules: [
    //
  ],
  /*
  ** Headers of the page
  */
  head: {
    title: 'Alberto Hernández Reyes - Artista de la plástica',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Sitio personal del artista plástico Alberto Hernández Reyes' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  /*
  ** Global CSS
  */
  css,
  /*
   * Plugins
   */
  plugins: [
    '~/plugins/components.js'
  ],
  /*
  ** Build configuration
  */
  build: {
    /*
    ** Run ESLint on save
    */
    extend (config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  },

  generate: {
    async routes () {
      const articles = await Promise.resolve(require('./data/articles.json'));

      return articles.map((article) => {
        return {
          route: '/articles/' + article.id,
          payload: article,
        };
      });
    },
  }
}
