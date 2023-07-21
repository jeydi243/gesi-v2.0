/// <reference types="vite/client" />
import { createFetch } from "@vueuse/core"
declare module "*.vue" {
  import type { DefineComponent } from "vue"
  const component: DefineComponent<{}, {}, any>
  export default component
  interface ComponentCustomProperties {
    $fetch: typeof createFetch
  }
}
