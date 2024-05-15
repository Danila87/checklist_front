<template>
    <v-card class="mx-auto pa-2" :elevation="5" style="min-width: 400px; max" rounded="xl">
        <v-card-title v-if="form.id">Изменение операции</v-card-title>
        <v-card-title v-else>Создание операции</v-card-title>
        <v-card-text>
            <v-row>
                <v-text-field v-model="form.name_operation" label="Название операции" placeholder="Название операции" required
                    clearable>
                </v-text-field>
            </v-row>
            <v-row>
                <v-text-field v-model="form.hint" label="Подсказка" placeholder="Подсказка" hint="Необязательное поле"
                    clearable>
                </v-text-field>
            </v-row>
        </v-card-text>
        <v-card-actions class="d-flex justify-space-between">
            <div><v-btn color="red" v-if="form.id" @click="remove">Удалить</v-btn></div>
            <div>

                <v-btn @click="$emit('onClose')">
                    Отмена
                </v-btn>

                <v-btn @click="submit">
                    Сохранить
                </v-btn>

            </div>

        </v-card-actions>
    </v-card>
</template>

<script>

import InformAlert from '../InformAlert.vue'

export default {

    components: { InformAlert },

    data: () => ({
        operation: {
            operation_name: '',
            hint: ''
        }
    }),

    props: ['modelValue'],

    emits: ['update:modelValue', 'onClose'],

    computed: {
        form: {
            set(value) {
                this.$emit('update:modelValue', value)
            },
            get() {
                return this.modelValue
            }
        }
    },

    methods: {

        submit() {

            this.$store.dispatch('Operations/saveOperation', this.form)
                .then(response => {

                  this.$store.commit('Toast/addMessage', {text: response.data.message, color: 'success'})
                  this.$store.dispatch('Operations/getOperations')
                  this.$emit('onClose')
                })
                .catch(response => {
                  this.$store.commit('Toast/addMessage', {text: response.response.data.detail, color: 'error'})
                })

        },

      remove() {

          this.$store.dispatch('Operations/removeOperation', this.form.id)
              .then(() => {

                this.$emit('onClose')
                this.$store.dispatch('Operations/getOperations')

              })
              .catch(() => {

              })
      },

    }
}
</script>

<style></style>