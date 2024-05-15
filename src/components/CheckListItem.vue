<template>
  <v-list-item>

    <v-list-item-title>{{checkList.type}}</v-list-item-title>
    <v-list-item-subtitle>Дата создания: {{checkList.creation_time}}</v-list-item-subtitle>
    <template v-slot:append>
      <v-chip color="blue">Автор: {{checkList.user}}</v-chip>
    </template>

  </v-list-item>
</template>

<script>

export default {

  props: {
    checkList: {
      type: Object,
      require: true
    }
  },

  methods: {

  }

}

</script>

<style scoped>

</style>