<template>
    <main class="main">
        <section class="auth">
            <div class="wrap">
                <form class="auth-form" @submit.prevent="submitHandler">
                    <p class="auth-text">Вход</p>
                    <input class="auth-input" type="email" v-model.trim="email" :class="{invalid: v$.email.$dirty && v$.email.$invalid}" placeholder="hedgehogofmom@gmail.com" name="email" required>
                    <input class="auth-input" type="password" v-model.trim="password" :class="{invalid: v$.password.$dirty && v$.password.$invalid}" placeholder="Приложи сетчатку глаза" required>
                    <!-- <div class="auth-social">
                        <img src="/assets/images/icon_google.svg">
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
import { useHead } from '@vueuse/head'
import useVuelidate from '@vuelidate/core'
import { email, required, minLength } from '@vuelidate/validators'

export default {
    name: 'login',
    setup () {
        useHead({
            title: 'CodesPizza — Главная'
        })

        return { v$: useVuelidate() }
    },
    data: () => ({
        email: '',
        password: ''
    }),
    validations () {
        return {
            email: { email, required },
            password: { required, minLength: minLength(6) }
        }
    },
    methods: {
        async submitHandler () {
            if (this.v$.$invalid) {
                this.v$.$touch()
                return
            }

            const formData = {
                email: this.email,
                password: this.password
            }
            await this.$store.dispatch('login', formData)
            this.$router.push('/')
        }
    }
}
</script>