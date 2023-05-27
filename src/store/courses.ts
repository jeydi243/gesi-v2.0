import coursesAPI from "@/api/courses"
import { defineStore } from "pinia"
import { useAuth } from "./authentication"

export interface IStoreContent {
  contents: Array<IContent>
  defaultContent: IContent
}

export const useCourses = defineStore("courses", {
  state: (): IStoreContent => ({ contents: [], defaultContent: { parts: [], images: [], tags: [], title: "", description: "", type: "course", price: 0 } }),
  actions: {
    async init() {
      try {
        await this.getcourses()
      } catch (er) {
        console.log("Error initializing: ", er)
      }
    },
    async getcourses() {
      try {
        const { data, status } = await coursesAPI.getAll()
        if (status || 200 || status == 201) {
          console.log(data)
          data.forEach((element: IContent) => {
            this.contents.unshift(element)
            setTimeout(() => {}, 1000)
          })
          return true
        }
        return false
      } catch (er) {
        console.log(er)
      }
    },
    async updateCourse({ idCourse, update }) {
      try {
        const { status, data } = await coursesAPI.updateById(idCourse, update)
        if (status == 200 || status == 201) {
          var foundIndex = this.contents.findIndex((t) => t.id == data.idCourse)
          if (foundIndex) {
            this.contents[foundIndex] = data
          }
          return true
        }
        return false
      } catch (er) {
        console.log(er)
      }
    },
    async addCourse(course) {
      const auth = useAuth()
      // let dat
      try {
        const { status, data } = await coursesAPI.add({ ...this.defaultContent, ...course, authors: [auth.user.id], createdBy: auth.user.id })
        console.log({ data })
        // dat = data
        if (status == 200 || status == 201) {
          this.contents.unshift(data)
          return true
        }
        return false
      } catch (err) {
        // console.log({ err })
        //return err!?.data?.dto_validation_error
      }
    },
  },
  getters: {
    mycourses: (state) =>
      function (filter) {
        if (filter) {
          return state.contents.find((content: IContent) => content.title.toLowerCase().includes(filter.toLowerCase()))
        }
        return state.contents
      },
  },
})
