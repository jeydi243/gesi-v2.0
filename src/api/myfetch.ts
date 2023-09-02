import { createFetch } from "@vueuse/core"
import { log } from "console"

const myfetch = createFetch({
  baseUrl: "http://localhost:9000",
  options: {
    async beforeFetch({ options }) {
      const myToken = ""
      options["headers"]!["Authorization"] = `Bearer ${myToken}`
      return { options }
    },
    async onFetchError(ctx) {
      console.log({ ctx })
    },
  },
  fetchOptions: {
    mode: "cors",
  },
})
export { myfetch }
