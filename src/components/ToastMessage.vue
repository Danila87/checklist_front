<template>
    <v-snackbar rounded="pill"  v-model="snackbar" :color="colors[message.color]" class="fade-in-bottom">
        <p>{{ message.text }}</p>
    </v-snackbar>
</template>

<script>
export default {

    data: () => ({

        colors: {
            'error': 'red',
            'success': 'green',
            'notify': 'blue'
        },

        message: {
            text: '',
            color: ''
        },

        messages: [],

        snackbar: false

    }),

    computed: {
        queue() {
            return this.$store.state.Toast.messagesStack
        }
    },
    watch: {

        queue: {
            handler(queue) {
                // Есть косяк в том, что новые сообщения удалятся из очереди если старое не обработалось
                if (queue.length > 0) {
                    const msg = this.$store.state.Toast.messagesStack.shift()
                    this.message.text = msg.text
                    this.message.color = msg.color
                    this.snackbar = true
                    setTimeout(() => {
                        this.handler
                    }, 2000)
                }
            },
            deep: true,
        }
    }
}
</script>

<style>

.fade-in-bottom {
  -webkit-animation: fade-in-bottom 0.6s cubic-bezier(0.390, 0.575, 0.565, 1.000) both;
  animation: fade-in-bottom 0.6s cubic-bezier(0.390, 0.575, 0.565, 1.000) both;
}

@-webkit-keyframes fade-in-bottom {
  0% {
    -webkit-transform: translateY(50px);
    transform: translateY(50px);
    opacity: 0;
  }
  100% {
    -webkit-transform: translateY(0);
    transform: translateY(0);
    opacity: 1;
  }
}
@keyframes fade-in-bottom {
  0% {
    -webkit-transform: translateY(50px);
    transform: translateY(50px);
    opacity: 0;
  }
  100% {
    -webkit-transform: translateY(0);
    transform: translateY(0);
    opacity: 1;
  }
}

</style>