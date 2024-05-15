<template>
  <v-sheet :elevation="5" width="1000" class=" my-4 mx-auto align-center justify-center fade-in" rounded="xl">
    <v-list rounded="xl">

      <v-list-subheader><h3>Создание чек листа</h3></v-list-subheader>

      <v-list-item>
        <v-select
            label="Выберите тип чек листа"
            :items="typesCheckList"
            v-model="selectedType"
            item-value="id"
            item-title="type_name"
        />
      </v-list-item>

      <template v-if="selectedType != null">

        <template v-if="$store.state.CreateChecklist.operationsByType.length > 0">

          <v-list-item v-if="$store.state.CreateChecklist.data != null">
            <p>Время начала</p>
            <v-chip color="success" prepend-icon="mdi-clock-outline">{{
                $store.getters['CreateChecklist/creation_time']
              }}
            </v-chip>
          </v-list-item>

          <v-list-item>
            <create-c-l-operations-list/>
          </v-list-item>

          <v-list-item>
            <div class="d-flex justify-space-between">
              <div></div>
              <div>
                <v-btn @click="saveCheckList" color="success"
                       :disabled="this.button_disabled" prepend-icon="mdi-content-save">
                  Сохранить
                </v-btn>
              </div>
            </div>
          </v-list-item>

        </template>

        <v-list-item v-else>
          <v-list-subheader><h3>Операции в данном типе не назначены</h3></v-list-subheader>
        </v-list-item>

      </template>

    </v-list>

  </v-sheet>

</template>

<script>

import CreateCLOperationsList from '../components/CreateCLOperationsList.vue'

export default {

  data: () => ({
    selectedType: null,
    button_disabled: true
  }),

  computed: {
    typesCheckList() {
      return this.$store.state.TypesCheckList.typesCheckList
    },
    form() {
      return this.$store.state.CreateChecklist.data
    }
  },

  mounted() {
    this.$store.dispatch('TypesCheckList/getTypes')
  },

  watch: {

    selectedType: {
      handler(newValue) {
        this.$store.dispatch('CreateChecklist/getOperations', newValue)
      }
    },

    form: {
      handler(newValue) {
        this.validate_form()
      },
      deep: true
    }


  },

  methods: {

    validate_form() {

      for (let operation of this.form.operations) {
        if (operation.working_before === '' || operation.working_before === null || operation.working_after === '' || operation.working_after === null) {
          this.button_disabled = true
          return
        }
      }
      this.button_disabled = false
    },

    saveCheckList() {
      this.$store.dispatch('CreateChecklist/saveChecklist', this.$store.state.User.user.User_id)
          .then(response => {
            this.$store.commit('Toast/addMessage', {text: response.data.message, color: 'success'})
          })
          .catch(response => {
            this.$store.commit('Toast/addMessage', {text: response.response.data.detail, color: 'error'})
          })
    }
  },

  components: {CreateCLOperationsList}

}
</script>

<style>

.fade-in {
  -webkit-animation: fade-in 0.5s cubic-bezier(0.390, 0.575, 0.565, 1.000) both;
  animation: fade-in 0.5s cubic-bezier(0.390, 0.575, 0.565, 1.000) both;
}

@-webkit-keyframes fade-in {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

@keyframes fade-in {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

</style>