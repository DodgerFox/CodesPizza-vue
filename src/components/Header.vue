<template>
  <header class="header">
    <div class="user" @click="openMenu()" :class="{open: menu}">
      <div class="user__avatar" :style="{ backgroundImage: 'url('+'assets/images/avatars/' + avatar + '.jpg'+')' }"></div>
      <div class="user__name">{{ userName }}</div>
      <ul class="user-list">
        <li class="user-list__item history def">
          <router-link to="/history" tag="div" class="user-container">
            <img src="assets/images/icon_history.svg">
            <p>Использованные</p>
          </router-link>
        </li>
        <li class="user-list__item logout" @click="logout()">
          <div class="user-container">
            <img src="assets/images/icon_logout.svg">
            <p>Выйти</p>
          </div>
        </li>
      </ul>
    </div>
    <div class="panel">
      <div class="panel-add" @click="$emit('adder')">
        <div class="panel-add__icon">
          <img src="assets/images/icon_plus.svg">
        </div>
        <p>Добавить коды</p>
      </div>
    </div>
  </header>
</template>

<script>


  export default {
    name: 'Header',
    data: () => ({
      menu: false,
      profile: {}
    }),
    methods: {
      openMenu () {
        this.menu = !this.menu;
      },
      async logout () {
          await this.$store.dispatch('logout')
          this.$router.push('/login')
      }
    },
    computed: {
        userName () {
            const infoData = this.$store.getters.info;
            const name = infoData.firstname + ' ' + infoData.lastname;
            
            return name;
        },
        avatar () {
          const avatar = this.$store.getters.info.avatar;
          return avatar;
        }
    },
    async beforeCreate () {
      if (!Object.keys(this.$store.getters.info).length) {
        await this.$store.dispatch("fetchInfo");
        this.$emit('loader')
      }
    }
  }
</script>

