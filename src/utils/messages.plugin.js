
import mitt from 'mitt'

const emitter = mitt()

export default {
    install(app) {
        app.config.globalProperties.$bus = emitter
        app.config.globalProperties.$message = (message) => emitter.emit('msg', message)
        app.config.globalProperties.$error = (err) => emitter.emit('err', err)
        app.provide('bus', emitter)
    }
}