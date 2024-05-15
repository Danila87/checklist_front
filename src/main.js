import { createApp } from 'vue'
import { createVuetify } from 'vuetify'
import App from './App.vue'

import axios from "axios";

import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

import router from './router'
import store from './store'

import './style.css'
import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'

import Particles from "@tsparticles/vue3";
import { loadFull } from "tsparticles"

axios.defaults.baseURL = 'http://pipi.dev.corp'

const vuetify = createVuetify({
  components,
  directives,
})

createApp(App).use(Particles, {
  init: async engine => {await loadFull(engine);},
}).use(router).use(store).use(vuetify).mount('#app')
