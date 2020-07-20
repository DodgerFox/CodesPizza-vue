<template>
  <main class="main">
    <router-view/>
    <Messages />
  </main>
</template>

<style lang="stylus">
  @require 'assets/styles/common.styl'
</style>

<script>
import Messages from '@/components/Messages'
import messages from '@/utils/messages'

export default {
  computed: {
    error () {
      return this.$store.getters.getError;
    }
  },
  components: {Messages},
  watch: {
    error (message) {      
      this.$error(messages[message.code] || message.message)
    }
  }
}
</script>