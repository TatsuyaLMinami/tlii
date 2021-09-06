const utils = require("./static/utils");
const vueLoaderConfig = require("./static/vue-loader.conf");
export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: true,

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'tlii-platform-tpiim-nuxtkoa2',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    'element-ui/lib/theme-chalk/index.css',
    'cesium/Build/Cesium/Widgets/widgets.css',
    "assets/css/index.css",
    "assets/css/style.css",
    "assets/css/scroll.css",
    "assets/css/public.css",
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    {
      src: "~/plugins/element-ui",
      ssr: true  // 关闭ssr
    },
    {
      src: '~/plugins/axios.js',
      ssr: true,  // 关闭ssr
      mode: "client"
    },
    {
      src: '~/plugins/router.js',
      ssr: true,  // 关闭ssr
      mode: "client"
    },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    "@nuxtjs/axios", '@nuxtjs/proxy'
  ],
  axios: {
    proxy: true,
    // prefix: '/api/',
    credentials: true // 表示跨域请求时是否需要使用凭证
  },
  proxy: {
    '/user': {
      target: 'http://localhost:8889',
      changeOrigin: true,
    },
    '/baseData': {
      target: 'http://localhost:8889',
      changeOrigin: true,
    },
    '/resource': {
      target: 'http://localhost:8889',
      changeOrigin: true,
    },
    "/webSocket": {
      target: "http://localhost:8080",
      ws: true,
      changeOrigin: true
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    // 按需引入element-ui
    //babel: {
    // plugins: [
    //   ["component", { "libraryName": "element-ui", "styleLibraryName": "theme-chalk" }]
    // ]
    //},
    rules: [
      {
        test: /\.vue$/,
        loader: "vue-loader",
        options: vueLoaderConfig
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: "url-loader",
        options: {
          limit: 10000,
          name: utils.assetsPath("img/[name].[hash:7].[ext]")
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: "url-loader",
        options: {
          limit: 10000,
          name: utils.assetsPath("media/[name].[hash:7].[ext]")
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: "url-loader",
        options: {
          limit: 10000,
          name: utils.assetsPath("fonts/[name].[hash:7].[ext]")
        }
      }
    ],
    extend(config, ctx) {
      // 添加可编译的glb和glbf文件类型
      const assetsLoader = config.module.rules.find(rule => rule.test.test('.png'));
      assetsLoader.test = /\.(png|jpe?g|gif|svg|webp|pdf|glb|gltf|json|geojson|topojson)$/i;

      return config;
    },

    //防止多次打包
    vendor: ['element-ui', 'axios'],
    //第三方插件，babel转化es6
    transpile: [/^element-ui/],
  }
}
