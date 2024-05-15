<template>
  <v-sheet width="500" class=" my-4 mx-auto align-center justify-center fade-in" rounded="xl">
    <v-card title="Авторизация" rounded="xl" :elevation="4">
        <v-list>

          <v-list-item>
            <v-text-field label="Логин" :rules="[rules.required]" v-model="authData.login" clearable>
            </v-text-field>
            <v-text-field label="Пароль" :rules="[rules.required]" v-model="authData.password" clearable>
            </v-text-field>
          </v-list-item>

        </v-list>

      <v-divider></v-divider>

          <v-card-actions>
                  <v-btn class="mb-2" color="blue" width="200" min-width="100" @click="$router.push({name: 'Register'})">Регистрация</v-btn>
                <v-spacer></v-spacer>
                  <v-btn class="mb-2" color="green" width="200" min-width="100" @click="login" :disabled="btnDisabled">Войти</v-btn>
          </v-card-actions>

    </v-card>
  </v-sheet>
</template>

<script>

export default {

  data: () => ({

    authData: {
      login: '',
      password: ''
    },

    btnDisabled: true,

    rules: {
      required: value => !!value || 'Поле должно быть заполнено',
    }

  }),

  methods: {

    login() {

      this.$store.dispatch('User/authentication', this.authData)
          .catch(response => {
            console.log(response)
          })

    },

    validateForm() {

      for (let param in this.authData) {
        if (this.authData[param] === '' || this.authData[param] === null) {
          this.btnDisabled = true
          return
        }
      }

      this.btnDisabled = false

    }

  },

  watch: {
    authData: {
      handler(newValue){
        this.validateForm()
      },
      deep: true
    }
  }

}
</script>

<style>

</style>