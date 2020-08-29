import Vue from 'vue';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';
import colors from 'vuetify/lib/util/colors';

Vue.use(Vuetify);

const vuetify = new Vuetify({
  theme: {
    themes: {
      light: {
        primary: colors.blue.darken1,
        secondary: colors.red.darken1,
        snackbarError: colors.red.darken1,
        background: colors.grey.darken3,
        appBar: colors.red.darken1,
        slider: colors.red.darken3
      },
    },
  },
});

export default vuetify;