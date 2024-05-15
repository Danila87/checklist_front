<template>
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
      <create-c-l-operation-item v-for="operation in $store.state.CreateChecklist.operationsByType" :operation="operation"/>
    </tbody>

  </v-table>

</template>

<script>
import CreateCLOperationItem from "./Forms/CreateCLOperationItem.vue";

export default {
  components: {CreateCLOperationItem}
}
</script>

<style scoped>

</style>