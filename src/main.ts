import "./assets/css/style.css"
import "./assets/css/style2.css"
import "vue-toastification/dist/index.css"
import App from "./App.vue"
import Toast from "vue-toastification"
import router from "./router/index"
import("preline")
import("@headlessui/vue")
import { createApp } from "vue"
import { configure } from "vee-validate"
import { createPinia } from "pinia"

const pinia = createPinia()
let app = createApp(App)
const useImage = (url) => {
  return new URL(`/src/${url}`, import.meta.url).href
}

// configure({
//   validateOnBlur: true, // controls if `blur` events should trigger validation with `handleChange` handler
//   validateOnChange: true, // controls if `change` events should trigger validation with `handleChange` handler
//   validateOnInput: false, // controls if `input` events should trigger validation with `handleChange` handler
//   validateOnModelUpdate: true, // controls if `update:modelValue` events should trigger validation with `handleChange` handler
// })
app.config.globalProperties.image = useImage
app.config.globalProperties.filters = {
  firstUpper(value) {
    return value.charAt(0).toUpperCase() + value.slice(1)
  },
  toiso(value) {
    return new Date(value).getFullYear()
  },
}
app.config.errorHandler = (err, vm, info) => {
  console.log(`${err!}`, `${err}`)
}
app.config.warnHandler = (msg, instance, trace) => {
  console.log(instance, JSON.stringify(trace, null, 4))
  console.log(msg)
}
app.use(Toast)
app.use(pinia)
app.use(router)
app.mount("#app")
