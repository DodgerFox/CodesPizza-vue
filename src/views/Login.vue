<template>
    <main class="main">
        <section class="auth">
            <div class="wrap">
                <form class="auth-form" @submit.prevent="submitHandler">
                    <p class="auth-text">Вход</p>
                    <input class="auth-input" type="email" v-model.trim="email" :class="{invalid: ($v.email.$dirty && $v.email.required) || ($v.email.$dirty && $v.email.email)}" placeholder="hedgehogofmom@gmail.com" name="email" required>
                    <input class="auth-input" type="password" v-model.trim="password" :class="{invalid: ($v.password.$dirty && $v.password.required) || ($v.password.$dirty && $v.password.minLength)}" placeholder="Приложи сетчатку глаза" required>
                    <!-- <div class="auth-social">
                        <img src="assets/images/icon_google.svg">
                        <p>Войти через Google</p>
                    </div> -->
                    <div class="auth-wrap">
                        <input class="auth-button" type="submit" value="Войти">
                        <router-link to="/registration" class="auth-link">Зарегистрироваться</router-link>
                    </div>
                </form>
            </div>
        </section>
    </main>
</template>

<script>
import {email, required, minLength} from 'vuelidate/lib/validators'


export default {
    name: 'login',
    metaInfo: {
        title: 'CodesPizza — Главная'
    },
    data: () => ({
        email: '',
        password: ''
    }),
    validations: {
        email: {email, required},
        password: {required, minLength: minLength(6)}
    },
    methods: {
        async submitHandler () {
            if (this.$v.$invalid){
                this.$v.$touch()
                return
            }else{
                const formData = {
                    email: this.email,
                    password: this.password
                }
                await this.$store.dispatch('login', formData);
                this.$router.push('/')
            }
            
        }
    }
}
</script>