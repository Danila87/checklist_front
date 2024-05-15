<template>
  <v-app-bar>
    <v-container class="mx-auto d-flex align-center justify-center">
      <v-btn variant="text" :elevation="2" class="mx-2" @click="$router.push({ name: 'Main' })">
        Главная
      </v-btn>

      <v-menu>
        <template v-slot:activator="{props}">
          <v-btn variant="text" :elevation="2" class="mx-2" v-bind="props">
            Операции
          </v-btn>
        </template>
        <v-list>
          <v-list-item @click="$router.push({ name: 'AllOperations' })">Все операции</v-list-item>
          <v-list-item @click="showModalOperation=true">Добавить операцию</v-list-item>
        </v-list>
      </v-menu>

      <v-menu>
        <template v-slot:activator="{props}">
          <v-btn variant="text" :elevation="2" class="mx-2" v-bind="props">
            Типы чек листов
          </v-btn>
        </template>
        <v-list>
          <v-list-item @click="$router.push({ name: 'typesCheckList' })">Типы чек листов</v-list-item>
          <v-list-item @click="showModalTypeCheckList=true">Добавить тип</v-list-item>
        </v-list>
      </v-menu>

      <v-btn variant="text" :elevation="2" class="mx-2" @click="$router.push({ name: 'CreateCheckList' })">
        Создать чек лист
      </v-btn>

      <v-menu v-if="$store.state.User.user !== null">
        <template v-slot:activator="{props}">
          <v-btn variant="text" :elevation="2" class="mx-5" :="props">Профиль</v-btn>
        </template>
        <v-list>
          <v-list-item @click="">
            Мой кабинет
          </v-list-item>
          <v-list-item @click="$store.dispatch('User/logOut')">
            Выход
          </v-list-item>
        </v-list>
      </v-menu>

    </v-container>
  </v-app-bar>

  <v-dialog v-model="showModalOperation">
    <operation-form v-model="operationForm" @on-close="showModalOperation = false"></operation-form>
  </v-dialog>

  <v-dialog v-model="showModalTypeCheckList">
    <type-check-list-form @on-close-type="showModalTypeCheckList=false" v-model="typeCheckListForm"></type-check-list-form>
  </v-dialog>

</template>

<script>

import OperationForm from "./Forms/OperationForm.vue";
import TypeCheckListForm from "./Forms/TypeCheckListForm.vue"

export default {
  components: {OperationForm, TypeCheckListForm},
  data: () => ({
    showModalOperation: false,
    showModalTypeCheckList: false,
    operationForm: {},
    typeCheckListForm: {}
  })
}
</script>

<style>
</style>