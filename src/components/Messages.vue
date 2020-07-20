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
    beforeCreate () {
        this.$root.$on('msg', message => {
            this.messages.push({message: message, color: ''})
        })
        this.$root.$on('err', err => {
            this.messages.push({message: err, color: 'error'})
        })
    }
}
</script>