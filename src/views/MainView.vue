<template>
  <v-sheet width="800" class=" my-4 mx-auto align-center justify-center fade-in" rounded="xl">
    <v-list rounded="xl" :elevation="5">

      <template v-if="checklists.length <= 0">
        <v-list-subheader><h3>В данный момент нет созданных чек листов</h3></v-list-subheader>
        <v-list-item><v-btn color="primary" flat @click="$router.push({name: 'CreateCheckList'})">Создать</v-btn></v-list-item>
      </template>

      <template v-else>

        <v-row>

          <v-col>
            <v-menu open-on-hover>

              <template v-slot:activator="{props}">
                <v-list-item :="props">
                  Сортировать по
                </v-list-item>
              </template>

              <v-list max-width="300">

                <v-list-item @click="">
                  Дата создания по убыванию
                </v-list-item>

                <v-list-item @click="">
                  Дата создания по возрастанию
                </v-list-item>

                <v-list-item @click="">
                  Пользователь
                </v-list-item>

              </v-list>

            </v-menu>
          </v-col>

          <v-col>
            <v-list-item>
              Фильтр
            </v-list-item>
          </v-col>

        </v-row>

      <v-divider :thickness="2" class="mb-2" color="blue"></v-divider>

        <check-list-item v-for="checklist in checklists" :check-list="checklist" @click="openCheckList(checklist.id)"></check-list-item>

      </template>

    </v-list>
  </v-sheet>

  <v-dialog v-model="showModal">
    <check-list-form :check-list-id="selectedCheckList"></check-list-form>
  </v-dialog>

</template>

<script>

import CheckListItem from "../components/CheckListItem.vue";
import CheckListForm from "../components/Forms/CheckListForm.vue";

export default {

  data: () => ({

    showModal: false,
    selectedCheckList: {}

  }),

  methods: {
    openCheckList(checkListId) {
      this.showModal = true
      this.selectedCheckList = checkListId
    }
  },

  components: {CheckListForm, CheckListItem},

  computed: {

    checklists() {
      return this.$store.state.Checklists.all_checklists
    }

  },

  watch: {

    showModal: {
      handler(newValue) {
        if (newValue === false) {
          this.selectedCheckList = {}
        }
      }

    }
  },

  mounted() {
    this.$store.dispatch('Checklists/getAllChecklists')
  }

}
</script>

<style>

</style>