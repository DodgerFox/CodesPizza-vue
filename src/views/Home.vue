<template>
  <main class="main">
    <Loader v-if="loading" />
    <Header @adder="openAdder" @loader="loading = !loading" />
    <Codes :key="update" />
    <Adder @close="openAdder" @added="newCodes" :class="{open: adder}" />
  </main>
</template>

<script>
import Header from '@/components/Header'
import Codes from '@/components/Codes'
import Adder from '@/components/Adder'

export default {
  name: 'Home',
  metaInfo: {
    title: 'CodesPizza — Главная'
  },
  data: () => ({
    loading: true,
    adder: false,
    update: false
  }),
  components: {
    Header,
    Codes,
    Adder
  },
  methods: {
    openAdder () {
      this.adder = !this.adder
    },
    newCodes () {
      this.openAdder()  
      this.update += 1;
    }
  }
}
</script>
