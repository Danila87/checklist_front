<template>
  <tr>

    <td>
      {{ operation.name_operation }}
    </td>

    <template v-if="'working_after' in this.operation">

      <td>
        <v-text-field placeholder="До"
                      variant="underlined"
                      v-model="operation.working_after"
                      readonly
                      required></v-text-field>
      </td>

      <td>
        <v-text-field placeholder="После"
                      variant="underlined"
                      v-model="operation.working_before"
                      readonly></v-text-field>
      </td>

      <td>
        <v-textarea placeholder="Комментарий"
                    variant="underlined"
                    v-model="value_comment"
                    rows="1"
                    readonly></v-textarea>
      </td>

    </template>

    <template v-else>

      <td>
        <v-text-field placeholder="До"
                      variant="underlined"
                      v-model="value_before"
                      @input="updateData('workingBefore')"
                      required></v-text-field>
      </td>

      <td>
        <v-text-field placeholder="После"
                      variant="underlined"
                      v-model="value_after"
                      @input="updateData('workingAfter')"
                      required></v-text-field>
      </td>

      <td>
        <v-textarea placeholder="Комментарий"
                    variant="underlined"
                    v-model="value_comment"
                    @input="updateData('comment')"
                    rows="1"
                    clearable
                    required></v-textarea>
      </td>

    </template>

  </tr>

</template>

<script>
export default {

  data: () => ({
    value_after: '',
    value_before: '',
    value_comment: '',
    disabled: false
  }),

  props: {
    operation: {
      type: Object,
      required: true
    }
  },

  computed: {
    data_template() {
      return this.$store.state.CreateChecklist.data
    }
  },

  methods: {

    updateData(type_data) {

      const index = this.data_template.operations.findIndex(
          op => op.operation_id === this.operation.id
      )

      switch (type_data) {
        case 'workingBefore':
          this.$store.commit('CreateChecklist/updateWorkingBefore', {index: index, newValue: this.value_before})
          break
        case 'workingAfter':
          this.$store.commit('CreateChecklist/updateWorkingAfter', {index: index, newValue: this.value_after})
          break
        case 'comment':
          this.$store.commit('CreateChecklist/updateComment', {index: index, newValue: this.value_comment})
          break
      }

    }
  }

}
</script>

<style scoped>

</style>