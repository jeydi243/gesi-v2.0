import axios from "axios"

axios.defaults.baseURL = 'http://localhost:9000' //import.meta.env.VUE_APP_API_URL
axios.defaults.validateStatus = (status) => {
  return status < 300
}
export default axios
