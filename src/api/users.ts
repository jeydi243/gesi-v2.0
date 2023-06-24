import { axios, myfetch } from "./myaxios"

export default {
  login: async function (user) {
    // console.log("gg")
    return axios.post("/users/login", user)
  },
  logout: async function (userID, data) {
    return axios.put(`/users/logout`, data, { params: { userID } })
  },
}
