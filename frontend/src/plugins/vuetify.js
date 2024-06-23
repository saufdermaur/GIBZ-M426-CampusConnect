import '@mdi/font/css/materialdesignicons.css';
import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import { de } from 'vuetify/locale';

const vuetify = createVuetify({
  components,
  directives,
  locale: {
    locale: 'de',
    messages: { de },
  },
});

export default vuetify;
