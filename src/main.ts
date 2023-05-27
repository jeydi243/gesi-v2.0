import { createApp } from "vue"
import "./assets/css/style.css"
import "./assets/css/style2.css"
import App from "./App.vue"
import router from "./router/index"
import { createPinia } from "pinia"
import { useToast } from "vue-toastification"
const pinia = createPinia()

let app = createApp(App).use(pinia).use(router)

app.config.globalProperties.filters = {
  firstUpper(value) {
    return value.charAt(0).toUpperCase() + value.slice(1)
  },
  toiso(value) {
    return new Date(value).getFullYear()
  },
}
app.config.globalProperties.toast = useToast()

app.config.errorHandler = (err, vm, info) => {
  console.log(`${err.message}`, `${err.stack}`)
}
app.config.warnHandler = (msg, instance, trace) => {
  console.log(msg, JSON.stringify(trace, null, 4))
}

app.mount("#app")
