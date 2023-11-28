import { defineStore } from "pinia";
import { IAffectation } from "../models/affectations";
import { IEmployee } from "@/models/employee";


export interface IStoreEmployee {
  affectationsEmployees: Array<IAffectation>;
  employees: Array<IEmployee>;
}

export const useEmployee = defineStore("employee", {});
