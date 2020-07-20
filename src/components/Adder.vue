<template>
    <section class="add">
        <div class="add-close" @click="$emit('close')">
            <img src="assets/images/icon_close.svg">
        </div>
        <div class="wrap">
            <form class="add-form" @submit.prevent="pushCodes">
                <p class="add-text">Каждый код с новой строки</p>
                <textarea v-model="codes" class="add-codes"></textarea>
                <input class="add-button" type="submit" value="Добавить">
            </form>
        </div>
    </section>
</template>

<script>
export default {
    name: 'Adder',
    data: () => ({
        codes: '',
    }),
    methods: {
        async pushCodes () {
            const codes = this.arrayCodes();            
            await this.$store.dispatch('addCodes', codes)
            this.codes = ''
            this.$emit('added')
            this.$message(`Добавлено ${codes.length} новых кодов`)
        },
        arrayCodes () {
            const strings = this.codes.split('\n');
            return strings.map((element) => {
                const obj = {
                    promo: element,
                    date: this.getDate(),
                    status: true
                }
                return obj
            })
        },
        getDate () {
            const todayDate = new Date(),
            currYear = todayDate.getFullYear(),
            currMonth = todayDate.getMonth()+1,
            currDay = todayDate.getDate(),
            date = currDay + ":" + currMonth + ":" + currYear;
            
            return date
        }
    }
    }
</script>
