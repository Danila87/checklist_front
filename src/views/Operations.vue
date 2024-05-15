<template>
  <v-sheet :elevation="5" width="800" class=" my-4 mx-auto align-center justify-center fade-in" rounded="xl">

    <v-list rounded="xl">
      <v-list-subheader>
        <h3>Все операции</h3></v-list-subheader>

      <v-text-field clearable label="Поиск операции" prepend-inner-icon="mdi-magnify" v-model="searchOperationInput"
                    block></v-text-field>

      <v-list-item v-if="operations.length <= 0">
        <v-skeleton-loader type="heading" v-for="i in 5"></v-skeleton-loader>
      </v-list-item>
      <transition-group name="operations">
        <v-list-item v-for="(operation, index) in operations" @click="openForm(operation)"
                     :title="operation.name_operation" :subtitle="operation.hint" :key="operation.id" block>
        </v-list-item>
      </transition-group>
      <v-list-item>
        <v-divider :thickness="3" class="mb-2"></v-divider>
        <div class="d-flex justify-space-between">
          <div></div>
          <div>
            <v-btn @click="this.showModal = true" color="green">Добавить</v-btn>
          </div>
        </div>
      </v-list-item>
    </v-list>

  </v-sheet>

  <v-dialog v-model="showModal">
    <operation-form v-model="selectedOperation" @on-close="closeModal"></operation-form>
  </v-dialog>

</template>

<script>
import OperationForm from '../components/Forms/OperationForm.vue'
import Fuse from "fuse.js";

export default {

  components: {OperationForm},

  data: () => ({
    searchOperationInput: '',
    showModal: false,
    loading: true,
    selectedOperation: {},
    fuzeOptions: {
      threshold: 0.4,
      keys: [
        "name_operation",
        "hint"
      ]
    },
  }),

  computed: {
    operations() {

      const operations = this.$store.state.Operations.operations

      if (this.searchOperationInput === '') {

        return operations

      } else {

        const fuze = new Fuse(operations, this.fuzeOptions)
        const data = fuze.search(this.searchOperationInput)

        return data.map(operation => operation.item)
      }

    },
  },

  methods: {

    openForm(operation) {
      this.showModal = true
      this.selectedOperation = operation
    },

    closeModal() {
      this.showModal = false
      this.selectedOperation = {}
    }

  },

  mounted() {
    this.$store.dispatch('Operations/getOperations')
    this.loading = false
  }

}
</script>

<style scoped>

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

.operations-enter-active {
  animation: fade-in-fwd 0.6s cubic-bezier(0.390, 0.575, 0.565, 1.000) both;
}

.operations-leave-active {
  animation: fade-out-fwd 0.6s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
}

.operations-move {
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