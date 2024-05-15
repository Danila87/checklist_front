<template>
  <v-sheet :elevation="5" width="1200" class=" my-4 mx-auto align-center justify-center fade-in" rounded="xl">
    <v-list>

      <v-list-item>
        <v-list-item-title>
          {{checklist.type_checklist}}
        </v-list-item-title>
      </v-list-item>

      <v-list-item>
        <v-chip color="blue" class="mb-1">Автор: {{user.username}}</v-chip><br>
        <v-chip color="green" class="mb-1">Дата создания: {{checklist.creation_time}}</v-chip><br>
        <v-chip color="green">Дата завершения: {{checklist.finish_time}}</v-chip>
      </v-list-item>

      <v-list-item>
        <v-table fixed-header>
          <thead>
          <tr>
            <th>Операция</th>
            <th>До</th>
            <th>После</th>
            <th>Комментарий</th>
          </tr>
          </thead>

          <tbody>
          <create-c-l-operation-item v-for="operation in operations" :operation="operation"/>
          </tbody>

        </v-table>
      </v-list-item>

    </v-list>

  </v-sheet>
</template>

<script>

import CreateCLOperationItem from "./CreateCLOperationItem.vue";

export default {
  components: {CreateCLOperationItem},
  data: () => ({
  }),

  props: ['checkListId'],

  mounted() {
    this.$store.dispatch('Checklists/getChecklist', this.checkListId)
  },

  computed: {
    checklist() {
      return this.$store.state.Checklists.checklist
    },
    operations() {
      return this.$store.state.Checklists.checklist_operations
    },
    user() {
      return this.$store.state.Checklists.checklist_user
    }
  }

}
</script>

<style scoped>

</style>