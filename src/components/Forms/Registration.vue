  <template>
    <v-sheet width="500" class=" my-4 mx-auto align-center justify-center fade-in" rounded="xl">
      <v-card title="Регистрация" rounded="xl" :elevation="4">
        <v-list>

          <v-list-item>
            <v-text-field label="Логин" placeholder="Danila87" :rules='[rules.required]' v-model="registrationData.username" clearable>
            </v-text-field>
            <v-text-field label="Почта" placeholder="johndoe@gmail.com" type="email" :rules='[rules.required, rules.email]' v-model="registrationData.email" clearable>
            </v-text-field>
            <v-text-field label="Пароль" type="password" :rules='[rules.required]' v-model="registrationData.password" clearable>
            </v-text-field>
            <v-text-field label="Повторите пароль" type="password" :rules='[rules.required, rules.password(registrationData.password, repeatPassword)]' v-model="repeatPassword" clearable>
            </v-text-field>
          </v-list-item>

        </v-list>

        <v-divider></v-divider>
        <v-card-actions>
          <v-btn class="mb-2" color="blue" width="200" min-width="100" @click="$router.push({name: 'Auth'})">Уже есть аккаунт</v-btn>
          <v-spacer></v-spacer>
          <v-btn class="mb-2" color="green" width="200" min-width="100" :disabled="btnDisabled" @click="submit">Регистрация</v-btn>

        </v-card-actions>

      </v-card>
    </v-sheet>
  </template>

  <script>

    export default {
      data: () => ({

        registrationData: {
          username: '',
          email: '',
          password: '',
        },

        repeatPassword: '',
        btnDisabled: true,

        rules: {
          email: value => {
            const email_pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            return email_pattern.test(value) || 'Email невалидный'
          },
          required: value => !!value || 'Поле должно быть заполнено',
          password: (password_1, password_2) => { return password_1 === password_2 || 'Пароли не совпадают'}
        }

    }),

      methods: {

        submit() {

          this.$store.dispatch('User/registerUser', this.registrationData)
              .then(response => {
                this.$store.commit('Toast/addMessage', {text: response.response.data.detail, color: 'success'})
              })
              .catch(response => {
                this.$store.commit('Toast/addMessage', {text: response.response.data.detail, color: 'error'})
              })
        },

        validateForm() {

          for (let param in this.registrationData) {

            if (this.registrationData[param] === '' || this.registrationData[param] === null || this.repeatPassword === '' || this.repeatPassword === null) {
              this.btnDisabled = true
              return
            }

          }

          this.btnDisabled = this.registrationData.password !== this.repeatPassword;

        },
      },

      watch: {

        registrationData: {
          handler(newValue) {
            this.validateForm()
          },
          deep: true
        },

        repeatPassword: {
          handler(newValue) {
            this.validateForm()
          },
          deep: true
        }
      }
    }
  </script>

  <style>

  </style>
