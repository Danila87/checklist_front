<template>
  <v-app>
    <div>

      <vue-particles
          id="particles-js"

          :options="{
          background: {
              color: {
                  value: '#efefef'
              }
          },
          fpsLimit: 120,
          particles: {

              color: {
                  value: '#c0c0c0',
                  animation: {
                    h: {
                      enable: true
                    }
                  }
              },

              move: {
                  direction: 'none',
                  enable: true,
                  outModes: 'out',
                  random: true,
                  speed: 2,
                  straight: false
              },

              number: {
                  density: {
                      enable: true,
                  },
                  value: 24
              },

              opacity: {
                  value: {min: 0.2, max: 0.8},
                  random: true
              },



              shape: {
                options: {
                  polygon: {
                    sides: 6
                  }
                },
                  type: 'polygon'
              },

              size: {
                animation: {
                  enable: true,
                  speed: 20,
                  startValue: 'random',
                },
                  value: { min: 50, max: 150 },
                  random: true
              }
          },
          detectRetina: true
      }"
      />
    </div>
    <router-view />
    <toast-message/>
  </v-app>
</template>

<script>

import ToastMessage from './components/ToastMessage.vue';
import {tr} from "vuetify/locale";

export default {
  computed: {
    tr() {
      return tr
    }
  },
  components: { ToastMessage },
}

</script>

<style scoped>
</style>
