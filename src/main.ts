import { createApp } from "vue"
import "./assets/css/style.css"
import "./assets/css/style2.css"
import App from "./App.vue"
import router from "./router/index"
import { createPinia } from "pinia"
import { useToast } from "vue-toastification"
const pinia = createPinia()
import("preline")
import("@headlessui/vue")
let app = createApp(App).use(pinia).use(router)
const useImage = (url) => {
  return new URL(`/src/${url}`, import.meta.url).href
}
app.config.globalProperties.$image = useImage
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
  console.log(`${err!}`, `${err}`)
}
app.config.warnHandler = (msg, instance, trace) => {
  console.log(instance, JSON.stringify(trace, null, 4))
  console.log(msg)
}

app.mount("#app")
