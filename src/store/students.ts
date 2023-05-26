import studentsAPI from "@/api/students"
import { useConfig } from "@/store/config"
import { defineStore } from "pinia"

export interface IStoreStudents {
  students: IStudent[]
}

export const useStudents = defineStore("students", {
  state: (): IStoreStudents => ({ students: [] }),
  actions: {
    async init() {
      try {
        await this.getAllStudents()
      } catch (er) {
        console.log("Error on init students: ", er)
      }
    },
    async getAllStudents() {
      try {
        const { data, status } = await studentsAPI.getAll()
        if (status == 200 || status == 201) {
          this.students = data
          return true
        }
      } catch (er) {
        console.log(er)
      }
    },
    async addStudent(newStudent: IPerson) {
      try {
        const { status, data, headers } = await studentsAPI.add(newStudent)

        if (status == 200 || status == 201) {
          this.students.unshift({ ...data, show: false })
          return true
        } else if (status == 304) {
          console.log("Student already exists. HEARDS=>%o", headers)
        }
        return false
      } catch (er) {
        console.log(er.data)
      }
    },
  },
  getters: {
    getListDocuments: (state) => state.listDocuments,
    mystudents(state) {
      const config = useConfig()
      return state.students.filter(
        (student: IStudent) => student.level.toLowerCase() == config.currentLevelShort.toLowerCase()
      )
    },
  },
})
