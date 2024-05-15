<template>
  <v-alert variant="tonal" rounded="xl" v-model="alertShow" closable>
    <v-alert-title> {{ title }}</v-alert-title>
    {{ text }}
  </v-alert>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: 'Title'
    },
    text: {
      type: String,
      default: 'Text'
    },
    alert: {
      type: Boolean
    }
  },
  computed: {
    alertShow: {
      get() {
        return this.alert;
      },
      set(value) {
        this.$emit('update:alert', value)
      }
    }
  }
}
</script>

<style></style>