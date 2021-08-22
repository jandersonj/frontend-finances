import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';
import pt from 'vuetify/lib/locale/pt';
import colors from 'vuetify/es5/util/colors'
Vue.use(Vuetify);

export default new Vuetify({
    lang: {
      locales: { pt },
      current: 'pt',
    },
  icons: {
    iconfont: 'md',
  },
  theme: { 
    dark: true,
    themes: {
      dark: {
        primary: colors.teal.darken1, 
        accent: colors.indigo.darken1,
        error: colors.red,
        info: colors.blue,
        success: colors.green,
        warning: colors.purple.darken1,
      },
    },
  },
});
