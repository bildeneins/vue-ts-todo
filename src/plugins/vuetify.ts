import Vue from 'vue';
import { colors } from 'vuetify/lib';
import Vuetify from 'vuetify/lib/framework';
import ja from 'vuetify/src/locale/ja';

Vue.use(Vuetify);

export default new Vuetify({
  lang: {
    locales: { ja },
    current: 'ja',
  },
  options: { customProperties: true },
  theme: {
    themes: {
      light: {
        primary: colors.teal,
        secondary: colors.teal.darken1,
        base: colors.brown.lighten5,
        accent: '#8c9eff',
        error: '#b71c1c',
      },
    },
  },
});
