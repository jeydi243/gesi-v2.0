import { $Fetch, FetchContext, ofetch } from "ofetch"
import { axios, myfetch } from "@/api/myaxios"
import { defineStore } from "pinia"
import { useStudents } from "./students"
import { useContents } from "./contents"
import { useManagement } from "./management"
import { toast } from "@/utils/index"
import router from "@/router/index"
import { TYPE } from "vue-toastification"
import { createFetch, useFetch } from "@vueuse/core"
export interface IMenu {
  text: string
  to: string
  icon: string
  active: boolean
  mouseHover: boolean
  children?: Array<IMenu>
}

export interface ILevel {
  id: string
  name: string
  short: string
  color: string
  current: boolean
}
export interface IStoreConfig {
  layout: any
  organizations: Array<IOrganization>
  config: {}
  isOpen: boolean
  sideMenus: Array<IMenu>
  listLevel: Array<ILevel>
  requestError: any
  myfetch?: $Fetch
  // useMyFetch: typeof useFetch | null
  baseURL: string
  responseError: any
  token: string
  listStatus: Array<any>
}
export const useConfig = defineStore("config", {
  state: (): IStoreConfig => ({
    organizations: [],
    baseURL: "http://localhost:9000",
    layout: "main",
    // useMyFetch: null,
    isOpen: false,
    config: {},
    token: "",
    sideMenus: [
      { text: "Home", to: "/home", icon: "home", active: true, mouseHover: false },
      { text: "Students", to: "/students", icon: "group", active: false, mouseHover: false },
      { text: "Teachers", to: "/teachers", icon: "adjust", active: false, mouseHover: false },
      { text: "Calendar", to: "/calendar", icon: "message-square", active: false, mouseHover: false },
      { text: "Library", to: "/library", icon: "library", active: false, mouseHover: false },
      {
        text: "Management",
        to: "/management",
        icon: "book",
        active: false,
        mouseHover: false,
        children: [
          { text: "Contents", to: "/contents", icon: "message-square", active: false, mouseHover: false },
          { text: "Filieres", to: "/filieres", icon: "message-square", active: false, mouseHover: false },
          { text: "Employees", to: "/employees", icon: "message-square", active: false, mouseHover: false },
          { text: "Documents", to: "/documents", icon: "message-square", active: false, mouseHover: false },
          // { text: "Classes", to: "/classes", icon: "message-square", active: false, mouseHover: false },
          { text: "Lookups", to: "/lookups", icon: "message-square", active: false, mouseHover: false },
        ],
      },
      { text: "Settings", to: "/settings", icon: "cog", active: false, mouseHover: false },
    ],
    listLevel: [
      { id: "TmhGq7H", name: "Candidat", short: "Candidat", color: "#8B70D8", current: true },
      { id: "smhsq8g", name: "Préparatoire", short: "Prépa", color: "#8B70D3", current: false },
      { id: "o3ah53j", name: "Graduat 1", short: "G1", color: "#CA3444", current: false },
      { id: "7imqgyt", name: "Graduat 2", short: "G2", color: "#D194F7", current: false },
      { id: "7imy5y7", name: "Graduat 3", short: "G3", color: "#E199F9", current: false },
    ],
    listStatus: ["Etudiant", "Abandon", "Diplomé", "Candidat", "Renvoi"],
    requestError: null,
    responseError: null,
  }),

  actions: {
    async init() {
      // this.setAxios()
      this.setMyFetch()
      const students = useStudents()
      const contents = useContents()
      const mngt = useManagement()

      try {
        await mngt.init()
        await students.init()
        await contents.init()
      } catch (error: any) {
        console.log(error)
      }
    },
    setAxios() {
      axios.interceptors.request.use(
        (config) => {
          if (this.token) {
            config!.headers!.Authorization = `Bearer ${this.token}`
          }
          return config
        },
        (error: any) => {
          // Do something with request error
          this.requestError = error
          return Promise.reject(error)
        }
      )
      axios.interceptors.response.use(
        (response) => {
          // console.info(`[AXIOS] Response ${JSON.stringify(response.data)}`)
          this.responseError = null
          return response
        },
        (error: any) => {
          this.responseError = error.response.data
          console.log("AXIOS INTERCEPTORS: %o", error.response)
          if (error.code == "ECONNABORTED") {
            toast.error("La requete a pris trop de temps. Verifier votre connexion et retenter dans quelques temps", { pauseOnHover: true })
            console.log({ error })
          } else if (error.code === "ERR_CONNECTION_REFUSED") {
            console.log("[ECONNABORTED] Impossible de contacter le serveur :", {
              error,
            })
            router.push({ name: "error" })
          } else if (error.code === "ERR_FAILED") {
            console.log("[ERR_FAILED] Impossible de contacter le serveur :", {
              error,
            })
            router.push({ name: "error" })
          } else {
            // console.log("Error code:", JSON.stringify(error))
            // this.errorCall = error.response.data
          }
          return Promise.reject(error.response)
        }
      )
    },
    setMyFetch() {
      this.myfetch = ofetch.create({
        baseURL: this.baseURL,
        // onRequestError: this.onRequestError,
        // onResponseError: this.onResponseError,
        ignoreResponseError: false,
      })
      // this.useMyFetch = createFetch({
      //   baseUrl: "http://localhost:9000",
      //   options: {
      //     async beforeFetch({ options }) {
      //       const myToken = ""
      //       options["headers"]!["Authorization"] = `Bearer ${myToken}`
      //       return { options }
      //     },
      //   },
      //   fetchOptions: {
      //     mode: "cors",
      //   },
      // })
    },
    onRequestError({ response }: FetchContext) {
      console.log({ response })
    },
    onResponseError({ response }: FetchContext) {
      console.log(`Data on response Error:${response!["_data"]}`)
    },
    add() {
      this.sideMenus.push({ text: "Management", to: "/management", icon: "book", active: false, mouseHover: false })
    },
    rem() {
      this.sideMenus.pop()
    },
    changeLayout(data) {
      this.layout = data
    },
    changeActive(path) {
      var currentIndex = this.sideMenus.findIndex((item) => item.active == true)
      var nextIndex = this.sideMenus.findIndex((item) => item.to == path)
      if (nextIndex != -1) {
        // if we came from a page which is not in the list of side menus, we need to add it
        if (currentIndex != -1) {
          this.sideMenus[currentIndex].active = false
        }
        this.sideMenus[nextIndex].active = true
      } else {
        this.sideMenus[currentIndex].active = false
      }
    },
    changeLevel(id) {
      var currentIndex = this.listLevel.findIndex((item) => item.current == true)
      var nextIndex = this.listLevel.findIndex((item) => item.id == id)
      if (nextIndex != -1) {
        // if we came from a page which is not in the list of side menus, we need to add it
        if (currentIndex != -1) {
          this.listLevel[currentIndex].current = false
        }
        this.listLevel[nextIndex].current = true
      } else {
        this.listLevel[currentIndex].current = false
      }
    },
  },
  getters: {
    rootOrg: (state) => state.organizations.find((org) => org.organization_parent_id == null),
    getLayout: (state) => state.layout,
    getConfig: (state) => state.config,
    getListLevel: (state) => state.listLevel,
    getListStatus: (state) => state.listStatus,
    currentLevel(state) {
      return state.listLevel.find((tabLevel) => tabLevel.current == true)!.name
    },
    sideActive(state) {
      return state.sideMenus.find((side) => side.active == true)
    },
    currentLevelShort(state) {
      return state.listLevel.find((tabLevel) => tabLevel.current == true)!.short
    },
  },
})
