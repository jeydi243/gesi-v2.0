import contentsAPI from "@/api/contents"
import { defineStore } from "pinia"
import { useAuth } from "./authentication"

export interface IStoreContent {
  contents: Array<IContent>
  defaultContent: IContent
}

export const useContents = defineStore("contents", {
  state: (): IStoreContent => ({
    contents: [],
    defaultContent: {
      parts: [],
      images: [],
      tags: [],
      title: "",
      description: "",
      type: "content",
      price: 0,
    },
  }),
  actions: {
    async init() {
      try {
        await this.getcontents()
      } catch (er) {
        console.log("Error initializing: ", er)
      }
    },
    async getcontents() {
      try {
        const { data, status } = await contentsAPI.getAll()
        if (status || 200 || status == 201) {
          console.log(`%cFetch successfully ${data.length} Contents !`, "color: #02f0fd; font-weight: bold;")
          for (let index = 0; index < data.length; index++) {
            const content = data[index]
            this.contents.push(content)
          }
          return true
        }
        return false
      } catch (er) {
        console.log(er)
      }
    },
    async updateContent({ idContent, update }) {
      try {
        const { status, data } = await contentsAPI.updateById(idContent, update)
        if (status == 200 || status == 201) {
          var foundIndex = this.contents.findIndex((t) => t.id == data.idContent)
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
    async addContent(content) {
      const auth = useAuth()

      try {
        const { status, data } = await contentsAPI.add({ ...this.defaultContent, ...content, authors: [auth.user._id], createdBy: auth.user._id })
        console.log({ data })
        if (status == 200 || status == 201) {
          this.contents.unshift(data)
          return true
        }
        return false
      } catch (err: any) {
        console.log({ err })
        //return err!?.data?.dto_validation_error
      }
    },
  },
  getters: {
    mycontents: (state) =>
      function (filter) {
        if (filter) {
          return state.contents.find((content: IContent) => content.title.toLowerCase().includes(filter.toLowerCase()))
        }
        return state.contents
      },
  },
})
