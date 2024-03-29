import { axios } from "@/api/myaxios"
import { myfetch } from "@/api/myfetch"
import usersAPI from "@/api/users"
import { defineStore } from "pinia"

export interface IUser {
  _id: string
  token?: string | null
  username?: string
}
export interface StoreAuthentication {
  user: IUser
  authResponse: any
}
export const useAuth = defineStore("authentication", {
  state: (): StoreAuthentication => ({ user: { _id: "647371e67535e423ab920fcf", token: null }, authResponse: null }),

  actions: {
    async init() {
      // await this.getAllStudents()
    },
    async logout() {
      // return await usersAPI.logout()
    },
    async login(payload) {
      console.log({ payload })
      try {
        const { data, status } = await usersAPI.login(payload)
        if (/*data.token && */ status == 200 || status == 201) {
          console.log({ token: data.token })
          this.user.token = data.token
          this.user = data.user
          return this.setAxiosInterceptor()
        } else console.log("No token for this user")
      } catch (error: any) {
        this.authResponse = error.response
      }
    },
    setAxiosInterceptor() {
      axios.interceptors.request.use( (config) => {
        config.headers!.Authorization = `Bearer ${this.user.token}`
        return config
      })
      axios.interceptors.response.use(
        function (response) {
          //   console.info(`%c[Axios ${response.status}] `, "color: #0080ff; font-weight: bold;")
          return response
        },
        function (error: any) {
          console.log(`%c[Axios] Error ${JSON.stringify(error)}`, "color: #ff0000; font-weight: bold;")
          return Promise.reject(error)
        }
      )
    },
  },
  getters: {
    getCurrentUser: (state) => state.user,
    getToken: (state) => state.user.token,
    getAuthResponse: (state) => state.authResponse,
  },
})
