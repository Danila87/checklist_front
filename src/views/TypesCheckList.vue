<template>

  <v-sheet :elevation="5" width="800" class=" my-4 mx-auto align-center justify-center fade-in" rounded="xl">
    <v-list rounded="xl">
      <v-list-subheader>
        <h3>Типы чек листов</h3></v-list-subheader>
      <v-skeleton-loader type="chip" v-for="i in 7" v-if="typesCheckList.length <= 0"></v-skeleton-loader>
      <v-list-item v-for="typeCL in typesCheckList" :title="typeCL.type_name" @click="openEditType(typeCL)"></v-list-item>
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
    <type-check-list-form @close-modal="this.showModal=false" v-model="selectedType"></type-check-list-form>
  </v-dialog>

</template>

<script>

import TypeCheckListForm from '../components/Forms/TypeCheckListForm.vue'

export default {

  data: () => ({
    loading: true,
    showModal: false,
    selectedType: {}
  }),

  computed: {
    typesCheckList() {
      return this.$store.state.TypesCheckList.typesCheckList
    }
  },

  mounted() {
    this.$store.dispatch('TypesCheckList/getTypes')
    this.loading = false
  },

  watch: {

    showModal: {

      handler(newValue) {
        if (newValue === false) {
          this.$store.commit('TypesCheckList/clearOperationsByType')
          this.selectedType = {}
        }
      }

    }
  },

  methods: {

    openEditType(typeCL) {
      this.showModal=true
      this.selectedType = typeCL
    }
  },

  components: {TypeCheckListForm}
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

.sub-group {
  background-color: rgb(236, 236, 236);
}
</style>