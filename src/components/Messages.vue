<template>
    <section class="messages">
        <div v-for="(item, index) in messages" :key="index" class="message" :class="item.color" >{{ item.message }}</div>
    </section>
</template>

<script>
export default {
    data: () => ({
        messages: []
    }),
    created () {
        this.$bus.on('msg', this.onMessage)
        this.$bus.on('err', this.onError)
    },
    beforeUnmount () {
        this.$bus.off('msg', this.onMessage)
        this.$bus.off('err', this.onError)
    },
    methods: {
        onMessage (message) {
            this.messages.push({ message, color: '' })
        },
        onError (err) {
            this.messages.push({ message: err, color: 'error' })
        }
    }
}
</script>