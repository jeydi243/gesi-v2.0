import { ofetch } from "ofetch"
import axios from "axios"

const baseURL = "http://localhost:9000"
axios.defaults.baseURL = baseURL //import.meta.env.VUE_APP_API_URL
axios.defaults.validateStatus = (status) => {
  return status < 300
}
// export default axios

// const myfetch = ofetch.create({
//   baseURL,
//   onRequestError(context) {
//     console.log({ context })
//   },
//   /**
//    * A description of the entire function.
//    *
//    * @param {any} context - the context parameter
//    * @return {void} no return value
//    */
//   onResponseError(context) {
//     console.log(context)
//   },
// })
export { axios }
