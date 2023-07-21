import { createFetch } from "@vueuse/core"

const myfetch = createFetch({
  baseUrl: "http://localhost:9000",
  options: {
    async beforeFetch({ options }) {
      const myToken = ""
      options["headers"]!["Authorization"] = `Bearer ${myToken}`
      return { options }
    },
  },
  fetchOptions: {
    mode: "cors",
  },
})
export { myfetch }
