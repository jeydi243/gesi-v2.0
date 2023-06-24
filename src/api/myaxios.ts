import { ofetch } from "ofetch"
import axios from "axios"

const baseURL = "http://localhost:9000"
axios.defaults.baseURL = baseURL //import.meta.env.VUE_APP_API_URL
axios.defaults.validateStatus = (status) => {
  return status < 300
}
// export default axios

const myfetch = ofetch.create({ baseURL })
export { myfetch, axios }
