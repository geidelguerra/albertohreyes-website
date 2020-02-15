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
  env: {
    BASE_URL: 'https://albertohreyes.com'
  },
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
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
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
  router: {
    middleware: 'i18n'
  },
  /*
   * Plugins
   */
  plugins: [
    '~/plugins/components.js',
    '~plugins/i18n.js'
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
      let routes = [];

      const locales = ['es', 'en'];
      const defaultLocale = 'es';

      while (locales.length > 0) {
        const locale = locales.shift();

        if (locale !== defaultLocale) {
          routes.push(`/${locale}`);
        }

        const articles = await Promise.resolve(require(`./data/${locale}/articles.json`));

        routes = routes.concat(articles.map((article) => {
          return {
            route: `/${locale}/articles/${article.id}`,
            payload: article,
          };
        }));
      }

      return routes;
    },
  }
}
