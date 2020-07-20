
export default {
    install(Vue){
        Vue.prototype.$message = function(message) {
            this.$root.$emit('msg', message)
        }
        Vue.prototype.$error = function(err) {
            this.$root.$emit('err', err)
        }
    }
}