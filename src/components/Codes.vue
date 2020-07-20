<template>
    <section class="codes">
        <div class="wrap">
            <p class="codes-counter" v-if="length === 0">Добавьте новые промокоды</p>
            <p class="codes-counter" v-if="length !== 0">Осталось {{length}}</p>
            <div class="codes-body">
                <Code 
                v-for="code of unused" 
                :key="code.promo" 
                :code="code" 
                @copyPromo="useCode"
                :class="{used: !code.status}" />
            </div>
            <a class="autograph" href="http://alexey-chernov.ru/" target="_blank">
                <img src="assets/images/logo.svg">
            </a>
        </div>
    </section>
</template>

<script>
import Code from '@/components/Code';

export default {
    name: 'Codes',
    components: {
        Code
    },
    data: () => ({
        data: '',
        codes: '',
        unused: '',
        length: ''
    }),
    async mounted () {
        this.getCodes()
    },
    methods: {
        async getCodes () {            
            this.data = await this.$store.dispatch('fetchCodes')
            const unused = [], codes = [];
            for (let date in this.data) {
                const block = this.data[date];

                for (let key in block) {
                    const array = block[key];

                    array.forEach(element => {
                        (element.status) ? unused.push(element) : '';
                        codes.push(element);
                    });
                } 
            }
            this.codes = codes;
            this.unused = unused.slice().reverse();
            this.length = unused.length;
            this.$emit('loader')
        },
        async useCode(code){
            let head = '',
                message;
            if (code.status) {
                this.$copyText(code.promo)
                message = 'Код скопирован'
            }else{
                message = 'Код отменен'
            }

            for (let date in this.data) {
                const block = this.data[date];
                head = date;                

                for (let key in block) {
                    const array = block[key];

                    await array.forEach(element => {
                        if (element.promo === code.promo) {
                            element.status = !element.status;
                            element.used = this.getDate();
                            (element.status) ? this.length++ : this.length--;
                            return
                        }
                    });
                }
            }
            await this.$store.dispatch('updateCodes', {
                codes: this.data,
                date: head
            });
            this.$message(message)
        },
        getDate () {
            const todayDate = new Date ();
            const year = todayDate.getFullYear();
            const month = todayDate.getMonth()+1;
            const day = todayDate.getDate();
            const hour = todayDate.getHours();
            const minutes = todayDate.getMinutes();
            return day + "/" + month + "/" + year + " в " + hour + ':' + minutes;

        }
    }
}
</script>
