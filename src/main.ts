import { createApp } from "vue"
import "./assets/css/style.css"
import "./assets/css/style2.css"
import App from "./App.vue"
import router from "./router/index"
import { createPinia } from "pinia"

const pinia = createPinia()

createApp(App).use(pinia).use(router).mount("#app")
