<template>
    <section class="auth">
        <div class="wrap">
            <form class="auth-form" @submit.prevent="submitHandler">
                <p class="auth-text">Регистрация</p>
                <div class="auth-container">
                    <input class="auth-input" type="text" name="firstname" v-model.trim="firstname" placeholder="Имя" required>
                    <span>Это поле должно иметь только буквы</span>
                </div>
                <div class="auth-container">
                    <input class="auth-input" type="text" name="lastname" v-model.trim="lastname" placeholder="Фамилия" required>
                    <span>Это поле должно иметь только буквы</span>
                </div>
                <div class="auth-container">
                    <input class="auth-input" type="email" name="email" v-model.trim="email" :class="{invalid: ($v.email.$dirty && $v.email.required) || ($v.email.$dirty && $v.email.email)}" placeholder="hedgehogofmom@gmail.com" required>
                </div>
                <div class="auth-container">
                    <input class="auth-input" type="password" name="password" v-model.trim="password" :class="{invalid: ($v.password.$dirty && $v.password.required) || ($v.password.$dirty && $v.password.minLength)}" placeholder="Приложи сетчатку глаза" required>
                </div>
                <div class="auth-container">
                    <input class="auth-input" type="password" name="password" v-model.trim="repeatPassword" placeholder="Приложи сетчатку носа" :class="{invalid: ($v.password.$dirty && $v.password.required) || ($v.password.$dirty && $v.password.minLength)}" required>
                </div>
                <!-- <div class="auth-social">
                    <img src="assets/images/icon_google.svg">
                    <p>Войти через Google</p>
                </div> -->
                <div class="auth-checkbox">
                    <input type="checkbox" required id="policy-checkbox">
                    <label for="policy-checkbox">Я соглашаюсь с <a href="#">политикой обработки персональных данных</a>
                    </label>
                </div>
                <div class="auth-wrap">
                    <input class="auth-button" type="submit" value="Зарегистрироваться">
                    <router-link to="/login" class="auth-link">Войти</router-link>
                </div>
            </form>
        </div>
    </section>
</template>

<script>
import {email, required, sameAs, minLength, helpers} from 'vuelidate/lib/validators'

const alpha = helpers.regex('alpha', /^[а-яА-Яa-zA-Z\s]*$/);

export default {
    name: 'Registration',
    metaInfo: {
        title: 'CodesPizza — Регистрация'
    },
    data: () => ({
        email: '',
        password: '',
        repeatPassword: {
            sameAsPassword: sameAs('password')
        },
        firstname: '',
        lastname: ''
    }),
    validations: {
        email: {email, required},
        password: {required, minLength: minLength(6)},
        repeatPassword: {required, minLength: minLength(6)},
        firstname: {required, alpha},
        lastname: {required, alpha}
    },
    methods: {
        async submitHandler () {
            if (this.$v.$invalid){
                this.$v.$touch()
                console.log(this.$v);
                
                return
            }else{
                const formData = {
                    email: this.email,
                    password: this.password,
                    firstname: this.firstname,
                    lastname: this.lastname,
                    avatar: this.generateAvatar()
                }
                try{
                    await this.$store.dispatch('register', formData);
                    this.$router.push('/');
                } catch (e) {e}
            }
            
        },
        generateAvatar () {
            const links = [
                'animal-deer.jpg',
                'animal-dog.jpg',
                'animal-cham.jpg',
                'animal-horse.jpg'
            ];
            function randomInteger(min, max) {
                let rand = min + Math.random() * (max + 1 - min);
                return Math.floor(rand);
            }
            const number = randomInteger(0, 3);
            const avatar = links[number]
            return avatar;
        }
    }

}
</script>