import { defineStore } from "pinia";
import { IAffectation } from "../models/affectations";
import { IEmployee } from "@/models/employee";
import mgntAPI from "@/api/management";
import { $Fetch } from "ofetch";
import { useManagement } from "./management";
import { useConfig } from "./config";

export interface IStoreEmployee {
  affectationsEmployees: Array<IAffectation>;
  myfetch?: $Fetch;
  employees: Array<IEmployee>;
}

export const useEmployee = defineStore("employee", {
  state: (): IStoreEmployee => ({
    employees: [],
    affectationsEmployees: [],
  }),
  actions: {
    async init() {
      try {
        const config = useConfig();
        this.myfetch = config.myfetch;
        await this.getAllEmployees();
      } catch (error) {}
    },
    async getAllEmployees() {
      this.employees = [];
      try {
        const employees: Array<IEmployee> = await this.myfetch!<
          Array<IEmployee>
        >(mgntAPI.getEmployees, { method: "GET" });
        console.log(
          `%cFetch successfully ${employees.length} Employees !`,
          "color: #0080c0; font-weight: bold;"
        );
        if (employees) {
          if (employees.length > 0) {
            employees.forEach((em) => this.employees.unshift(em));
          } else {
            this.employees = employees;
          }
          return true;
        }
        return false;
      } catch (er) {
        console.log(er);
      }
    },
    async addEducation(employeeID, education) {
      try {
        const { data, status } = await mgntAPI.addEducation(
          employeeID,
          education
        );
        if (status == 201 || status === 200) {
          let index = this.employees.findIndex((em) => em._id == employeeID);
          this.employees[index].educations.push(data);
          return true;
        }
        return false;
      } catch (err) {
        console.log(err);
        return false;
      }
    },
    async addContact(employeeID, contact) {
      try {
        const { data, status } = await mgntAPI.addEmergencyContact(
          employeeID,
          contact
        );
        if (status == 201 || status === 200) {
          let index = this.employees.findIndex((em) => em._id == employeeID);
          this.employees[index].contacts.unshift(data);
          return true;
        }
        return false;
      } catch (err) {
        console.log(err);
        return false;
      }
    },
    async deleteEducation(employeeID, educationID) {
      try {
        const { data, status, headers } = await mgntAPI.deleteEducation(
          employeeID,
          educationID
        );
        console.log(status);
        if ((status == 200 || status == 201) && data != "") {
          const indexEmp = this.employees.findIndex(
            (emp) => emp._id == employeeID
          );
          const indexEduc = this.employees[indexEmp].educations.findIndex(
            (educ) => educ.id == educationID
          );
          if (indexEduc != -1) {
            this.employees[indexEmp].educations.splice(indexEduc, 1);
            return true;
          } else {
            return false;
          }
        } else if (status == 304) {
          console.log({ headers });
        }
        return false;
      } catch (er) {
        console.log(er);
        return false;
      }
    },
    async deleteContact(employeeID, contactID) {
      try {
        const { data, status, headers } = await mgntAPI.deleteContact(
          employeeID,
          contactID
        );
        if ((status == 200 || status == 201) && data != "") {
          const indexEmp = this.employees.findIndex(
            (emp) => emp._id == employeeID
          );
          const indexContact = this.employees[indexEmp].contacts.findIndex(
            (educ) => educ.id == contactID
          );
          if (indexContact != -1) {
            this.employees[indexEmp].contacts.splice(indexContact, 1);
            return true;
          } else {
            console.log("Ce contact n'exige déja plus");
            return false;
          }
        } else if (status == 304) {
          console.log({ headers });
        }
        return false;
      } catch (er) {
        console.log(er);
        return false;
      }
    },
    async deleteExperience(employeeID, experienceID) {
      try {
        const { status, headers } = await mgntAPI.deleteExperience(
          employeeID,
          experienceID
        );
        if (status == 200 || status == 201) {
          const index = this.employees.findIndex(
            (emp) => emp._id == employeeID
          );
          console.log({ index });
          const indexExp = this.employees[index].educations.findIndex(
            (educ) => educ.id == experienceID
          );
          if (indexExp != -1) {
            this.employees[index].educations.splice(indexExp, 1);
            return true;
          } else {
            return false;
          }
        } else if (status == 304) {
          console.log({ headers });
          return false;
        }
        return false;
      } catch (er) {
        console.log(er);
        return false;
      }
    },
    async updateExperience(employeeID, experienceID, experience) {
      try {
        const { data, status, headers } = await mgntAPI.updateExperience(
          employeeID,
          { id: experienceID, ...experience }
        );
        console.log({ data, status, headers });
        if ((status == 200 || status == 201) && data != "") {
          const index = this.employees.findIndex(
            (emp) => emp._id == employeeID
          );
          const indexExp = this.employees[index]!.experiences!.findIndex(
            (exp) => exp.id == experienceID
          );
          if (indexExp != -1) {
            this.employees[index]!.experiences![indexExp] = data;
          } else {
            return false;
          }
          return true;
        } else if (status == 304) {
          console.log("Experience already exists ", headers);
          return false;
        }
      } catch (er) {
        console.log(er);
        return false;
      }
    },
    async updateEducation(employeeID, educationID, education) {
      try {
        const { data, status, headers } = await mgntAPI.updateEducation(
          employeeID,
          { id: educationID, ...education }
        );
        if ((status == 200 || status == 201) && data != "") {
          const index = this.employees.findIndex(
            (emp) => emp._id == employeeID
          );
          const indexExp = this.employees[index].educations.findIndex(
            (educ) => educ.id == educationID
          );
          if (indexExp != -1) {
            this.employees[index].educations[indexExp] = data;
          } else {
            return false;
          }
          return true;
        } else if (status == 304) {
          console.log("Education can't be updated ", headers);
          return false;
        }
      } catch (er) {
        console.log(er);
        return false;
      }
    },
    async deleteEmployee(employeeID) {
      try {
        const { status } = await mgntAPI.deleteEmployee(employeeID);
        if (status == 200 || status == 201) {
          const index = this.employees.findIndex(
            (emp) => emp._id == employeeID
          );
          if (index != -1) this.employees.splice(index, 1);
          else {
            console.log("Can't find this employee");
            return false;
          }
          return true;
        }
        return false;
      } catch (er) {
        console.log(er);
        return false;
      }
    },
    async employeeById(employeeID) {
      try {
        const { data, status } = await mgntAPI.employeeBy(employeeID);
        if (status == 200 || status == 201) {
          const index = this.employees.findIndex(
            (emp) => emp._id == employeeID
          );
          this.employees[index] = data[0];
          return true;
        }
        return false;
      } catch (er) {
        console.log(er);
      }
    },
    async addExperience(id, experience) {
      try {
        const { data, status } = await mgntAPI.addExperience(id, experience);
        if (status == 200 || status == 201) {
          const index = this.employees.findIndex((emp) => emp._id == data.id);
          this.employees[index]!.experiences!.unshift(data);
          return true;
        }
        return false;
      } catch (er) {
        console.log(er);
        return false;
      }
    },
    async addEmployee(newEmployee) {
      try {
        const { data, status, headers } = await mgntAPI.addEmployee(
          newEmployee
        );
        if (status == 200 || status == 201) {
          console.log({ data });
          this.employees.unshift({ ...data, show: false });
          return true;
        } else if (status == 304) {
          console.log("Employee already exists. HEARDS=>", headers);
        }
        console.log(data);
        return false;
      } catch (er) {
        console.log(er);
      }
    },
    async changedoc(employeeID, newDoc) {
      try {
        const { data, status } = await mgntAPI.updateDocument({
          employeeID,
          ...newDoc,
        });
        if ((status == 200 || status == 201) && data != "") {
          const index = this.employees.findIndex(
            (emp) => emp._id == employeeID
          );
          if (index != -1) {
            this.employees[index]!.resume_file = data; //link to file on server
          } else {
            return false;
          }
          return true;
        } else if (status == 304) {
          console.log("Biography can't be updated ");
          return false;
        }
      } catch (er) {
        console.log(er);
      }
    },
    async updateOnboarding(employeeID, onboarding) {
      try {
        const { data, status } = await mgntAPI.updateOnboarding(
          employeeID,
          onboarding
        );
        if ((status == 200 || status == 201) && data != "") {
          const index = this.employees.findIndex(
            (emp) => emp._id == employeeID
          );
          if (index != -1) {
            this.employees[index].onboarding = onboarding;
          } else {
            return false;
          }
          return true;
        } else if (status == 304) {
          console.log("Onboarding can't be updated ");
          return false;
        }
      } catch (er) {
        console.log(er);
      }
    },
    async addAffectation(newAffectation: IAffectation) {
      try {
        this.affectationsEmployees.unshift(newAffectation);
      } catch (er) {
        console.log("POP:", er);
        return false;
      }
    },
    async updateBiography(employeeID, biography) {
      try {
        const { data, status } = await mgntAPI.updateBiography(
          employeeID,
          biography
        );
        if ((status == 200 || status == 201) && data != "") {
          const index = this.employees.findIndex(
            (emp) => emp._id == employeeID
          );
          if (index != -1) {
            this.employees[index].biography = biography;
          } else {
            return false;
          }
          return true;
        } else if (status == 304) {
          console.log("Biography can't be updated ");
          return false;
        }
      } catch (er) {
        console.log(er);
      }
    },
  },
  getters: {
    getEmployees: (state) => state.employees,
    getTeachers: (state) => (filter) => state.employees,
    positionsInOrg: (state) => (orgID) => {
      const store = useManagement();
      return store.positions.filter((e) => e.organisationID === orgID);
    },
    getPositions: (state) => (filter) => {
      const store = useManagement();
      return store.positions.filter((e) => e.name == filter);
    },
  },
});
