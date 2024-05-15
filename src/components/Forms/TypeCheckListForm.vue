<template>
  <v-sheet :elevation="5" width="1000" class=" my-4 mx-auto align-center justify-center fade-in" rounded="xl">
    <v-list rounded="xl">

      <v-list-subheader>
        <h3 v-if="modelValue.id">Изменение типа</h3>
        <h3 v-else>Создание типа</h3>
      </v-list-subheader>

      <v-list-item>
        <v-text-field label="Название типа" v-model="modelValue.type_name"></v-text-field>
      </v-list-item>

      <v-list-item v-if="modelValue.id">
        <v-row>

          <v-col>
            <v-card title="Отключенные операции" subtitle="Кликните на операцию, чтобы подключить ее" variant="outlined" :elevation="5" block>
              <v-card-text>

                <v-text-field label="Поиск" variant="underlined" prepend-inner-icon="mdi-magnify"
                              v-model="disconnectedOperationInput"></v-text-field>
                <v-chip-group column>
                  <transition-group name="connected">

                    <v-chip v-for="operation in disconnectedOperation" class="ma-1" value="operation.id"
                            :key="operation.id" @click="addOperation(operation.id)" :elevation="2">
                      {{ operation.name_operation }}
                    </v-chip>
                  </transition-group>
                </v-chip-group>

              </v-card-text>
            </v-card>
          </v-col>

          <v-col>
            <v-card title="Подключенные операции" subtitle="Кликните на операцию, чтобы отключить ее" variant="outlined" :elevation="5" block>

              <v-card-text>

                <v-text-field label="Поиск" variant="underlined" prepend-inner-icon="mdi-magnify"
                              v-model="connectedOperationInput"></v-text-field>

                <v-chip-group column>
                  <transition-group name="connected">
                    <v-chip v-for="operation in connectedOperation" class="ma-1"
                            :key="operation.id" append-icon="mdi-close-circle" @click="removeOperation(operation.id)"
                            :elevation="2">
                      {{ operation.name_operation }}
                    </v-chip>
                  </transition-group>
                </v-chip-group>

              </v-card-text>
            </v-card>
          </v-col>

        </v-row>
      </v-list-item>

      <v-list-item v-if="modelValue.id">
        <v-divider :thickness="3"></v-divider>
      </v-list-item>

      <v-list-item>
        <div class="d-flex justify-space-between mb-2">

          <div v-if="modelValue.id">
            <v-btn color="red" @click="removeType">Удалить</v-btn>
          </div>
          <div v-else></div>

          <div>
            <v-btn class="mx-2" @click="$emit('closeModal')">Отмена</v-btn>
            <v-btn color="green" @click="submit">Сохранить</v-btn>
          </div>
        </div>
      </v-list-item>
    </v-list>

  </v-sheet>

</template>

<script>

import Fuse from "fuse.js";

export default {
  data: () => ({

    disconnectedOperationInput: '',
    connectedOperationInput: '',

    fuzeOptions: {
      threshold: 0.4,
      keys: [
        "name_operation",
      ]
    },

  }),

  props: ['modelValue'],

  computed: {

    connectedOperation() {
      return this.filterOperation(1, this.connectedOperationInput)
    },

    disconnectedOperation() {
      return this.filterOperation(0, this.disconnectedOperationInput)
    },

  },

  mounted() {

    if (this.modelValue.id) {

      this.$store.dispatch('TypesCheckList/getOperationsByType', this.modelValue.id)

    }
  },

  methods: {

    removeType() {

      this.$store.dispatch('TypesCheckList/removeType', this.modelValue.id)
          .then(response => {
            this.$emit('closeModal')
            this.$store.dispatch('TypesCheckList/getTypes')
            this.$store.commit('Toast/addMessage', {text: response.data.message, color: 'success'})
          })
          .catch(response => {
            this.$store.commit('Toast/addMessage', {text: response.response.data.detail, color: 'error'})
          })
    },

    submit() {

      if (this.modelValue.id) {

        this.$store.dispatch('TypesCheckList/updateType', this.modelValue)
            .then(response => {
              this.$store.dispatch('TypesCheckList/getTypes')
              this.$emit('closeModal')
              this.$store.commit('Toast/addMessage', {text: response.data.message, color: 'success'})
            })
            .catch(response => {
              this.$store.commit('Toast/addMessage', {text: response.response.data.detail, color: 'error'})
            })

      } else {

        this.$store.dispatch('TypesCheckList/saveType', this.modelValue)
            .then(response => {
              this.$store.dispatch('TypesCheckList/getTypes')
              this.$emit('closeModal')
              this.$store.commit('Toast/addMessage', {text: response.data.message, color: 'success'})
            })
            .catch(response => {
              this.$store.commit('Toast/addMessage', {text: response.response.data.detail, color: 'error'})
            })

      }

    },

    removeOperation(operation_id) {

      this.$store.dispatch('TypesCheckList/deleteOperationByType', {
        'type_id': this.modelValue.id,
        'operation_id': operation_id
      })

          .then(response => {
            this.$store.commit('Toast/addMessage', {text: response.data.message, color: 'success'})
            this.$store.dispatch('TypesCheckList/getOperationsByType', this.modelValue.id)
          })

          .catch(response => {
            this.$store.commit('Toast/addMessage', {text: response.response.data.detail, color: 'error'})
          })

    },

    addOperation(operation_id) {

      this.$store.dispatch('TypesCheckList/setOperationByType', {
        'type_id': this.modelValue.id,
        'operation_id': operation_id
      })

          .then(response => {
            this.$store.commit('Toast/addMessage', {text: response.data.message, color: 'success'})
            this.$store.dispatch('TypesCheckList/getOperationsByType', this.modelValue.id)
          })

          .catch(response => {
            this.$store.commit('Toast/addMessage', {text: response.response.data.detail, color: 'error'})
          })

    },

    filterOperation(statusOperation, typeInput) {

      const operations = this.$store.state.TypesCheckList.operationsByType
          .filter(operation => operation.status === statusOperation)

      if (typeInput === '') {

        return operations

      } else {

        const fuze = new Fuse(operations, this.fuzeOptions)
        const data = fuze.search(typeInput)

        return data.map(operation => operation.item)
      }
    }

  },

}
</script>

<style scoped>

.connected-enter-active {
  animation: fade-in-fwd 0.6s cubic-bezier(0.390, 0.575, 0.565, 1.000) both;
}

.connected-leave-active {
  animation: fade-out-fwd 0.6s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
}

.connected-move {
  transition: transform 1s;
}

@keyframes fade-in-fwd {
  0% {
    transform: translateZ(-80px);
    opacity: 0;
  }
  100% {
    transform: translateZ(0);
    opacity: 1;
  }
}

@keyframes fade-out-fwd {
  0% {
    transform: translateZ(0);
    opacity: 1;
  }
  100% {
    transform: translateZ(80px);
    opacity: 0;
  }
}

</style>