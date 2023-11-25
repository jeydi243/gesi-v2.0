import mgntAPI from "@/api/management";
import { defineStore } from "pinia";
import { IEmployee } from "@/models/employee";
import { useAuth } from "./authentication";
import { useConfig } from "./config";
import { $Fetch } from "ofetch";

export interface ILookups {
  _id?: string;
  classe_id: string;
  code: string;
  parent_lookups_id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  description: string;
}
export interface IClasse {
  _id?: string;
  code: string;
  parent_classe_id?: string;
  name: string;
  description: string;
  current: boolean;
}
export interface IStoreManagement {
  laptops: [];
  routeurs: [];
  classes: IClasse[];
  lookups: ILookups[];
  error: any;
  myfetch?: $Fetch;
  documents: Array<any>;
  organizations: Array<IOrganization>;
  employees: Array<IEmployee>;
  filieres?: Array<any>;
}

export const useManagement = defineStore("management", {
  state: (): IStoreManagement => ({
    laptops: [],
    error: "",
    routeurs: [],
    organizations: [],
    classes: [
      {
        name: "Type d'organisation",
        code: "LKP-001",
        _id: "2078er23",
        description: "Type d'organisation",
        current: false,
      },
      {
        name: "Type de Documents",
        code: "LKP-002",
        _id: "XPOG57",
        description: "Type de Documents",
        current: false,
      },
    ],
    lookups: [],
    documents: [],
    employees: [],
  }),

  actions: {
    async init() {
      try {
        const config = useConfig();
        this.myfetch = config.myfetch;

        await this.getAllLookups();
        await this.getAllDocuments();
        await this.getAllEmployees();
        await this.getAllClasses();
      } catch (error: any) {
        console.log(error);
      }
    },

    async getAllDocuments() {
      this.documents = [];
      try {
        const { data, status } = await mgntAPI.getDocuments();
        if (status == 200 || status == 201 || status == 304) {
          console.log("Fetch successfully %d Documents !", data.length);
          data
            .map((doc) => {
              doc["show"] = false;
              return doc;
            })
            .forEach((doc) => this.documents.unshift(doc));
          return true;
        }

        return false;
      } catch (er) {
        console.log(er);
      }
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
    async getAllClasses() {
      this.classes = [];
      try {
        const classes: Array<IClasse> = await this.myfetch!<Array<IClasse>>(
          mgntAPI.getClasses,
          { method: "GET" }
        ); // await mgntAPI.getClasses()
        if (classes) {
          if (classes.length > 0) {
            console.log(
              `%cFetch successfully ${classes.length} Classes !`,
              "color: #f44a68; font-weight: bold;"
            );
            classes.forEach((classe) => this.classes.unshift(classe));
          } else {
            this.classes = classes;
          }
          return true;
        }
        return false;
      } catch (er) {
        console.log(er);
      }
    },
    async getAllLookups() {
      this.lookups = [];
      try {
        const lookupsALL = await this.myfetch!<Array<ILookups>>("/lookups", {
          method: "GET",
        }); // await mgntAPI.getClasses()
        console.log({ lookupsALL });

        console.log(
          `%cFetch successfully ${lookupsALL.length} lookups !`,
          "color: #ff8040; font-weight: bold;"
        );

        if (lookupsALL.length > 0) {
          lookupsALL.forEach((classe) => this.lookups.unshift(classe));
        } else {
          this.lookups = lookupsALL;
        }

        return false;
      } catch (er) {
        console.log(er);
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

    /**
     * Adds new lookups to the management system.
     *
     * @param {ILookups} newLookups - The new lookups to be added.
     * @return {Promise<boolean>} - A boolean indicating if the lookups were successfully added.
     */
    async addLookups(newLookups: ILookups) {
      const { getCurrentUser } = useAuth();
      try {
        this.lookups!.unshift(newLookups);
      } catch (er) {
        console.log("POP:", er);
        return false;
      }
    },
    async addClasse(newClasse: IClasse) {
      const { getCurrentUser } = useAuth();
      try {
        const response: IClasse = await this.myfetch!<IClasse>("/classes", {
          method: "POST",
          body: { ...newClasse, createdBy: getCurrentUser._id },
        }); //mgntAPI.addLookups(id, lookups);
        console.log({ response });

        if (response) {
          // const index = this.classes.findIndex((lk) => lk._id == response._id)
          this.classes!.unshift(response);
          return true;
        }
        return false;
      } catch (er) {
        console.log(er);
        return false;
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
    async addEmergencyContact(employeeID, contact) {
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
    /**
     * Delete a contact.
     *
     * @param {type} employeeID - The ID of the employee.
     * @param {type} contactID - The ID of the contact.
     * @return {type} True if the contact was deleted successfully, false otherwise.
     */
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
    async addDocument(newDocument) {
      try {
        const { data, status } = await mgntAPI.addDocument(newDocument);
        if (status == 200 || status == 201) {
          this.documents.unshift({ ...data, show: false });
          return true;
        }
        return false;
      } catch (error: any) {
        console.log(error);
        return error["data"]["message"];
      }
    },
    async removeDocument(idDocument) {
      try {
        const { data, status } = await mgntAPI.removeDocument(idDocument);
        if (status == 200 || status == 201) {
          var index = this.documents.findIndex(
            (doc) => doc.idDocument == idDocument
          );
          this.documents.splice(index, 1);
          console.log(data);
          return true;
        }
        return false;
      } catch (er) {
        console.log(er);
      }
    },
    async deleteDocument(code) {
      try {
        const { data, status } = await mgntAPI.deleteDocument(code);
        console.log({ data }, { status });
        if (status == 200 || status == 201) {
          var index = this.documents.findIndex((doc) => doc.code == code);
          if (index != -1) this.documents.splice(index, 1);
          return true;
        }
        return false;
      } catch (er) {
        console.log(er);
        return false;
      }
    },
    async updateDocument(newValues) {
      try {
        const { data, status } = await mgntAPI.updateDocument(newValues);
        console.log({ data });
        if (status < 300) {
          var index = this.documents.findIndex((doc) => doc.code == data.code);
          if (index != -1) this.documents[index] = { ...data, show: true };
          return true;
        }
        return false;
      } catch (er) {
        console.log(er);
      }
    },
    async addFiliere(newFiliere) {
      try {
        const { data, status } = await mgntAPI.addFiliere(newFiliere);
        if (status < 300) {
          this.filieres.unshift({ ...data, show: false });
          return true;
        }
        console.log(data);
      } catch (er) {
        console.log(er);
      }
    },
    async removeFiliere(idFiliere) {
      try {
        const { data, status } = await mgntAPI.removeFiliere(idFiliere);
        if (status == 200 || status == 201) {
          var index = this.filieres.findIndex(
            (filiere) => filiere.id == data.id
          );
          this.filieres.splice(index, 1);
          console.log(data);
          return true;
        }
        return false;
      } catch (er) {
        console.log(er);
      }
    },
    async updateFiliere(newValues) {
      try {
        const { data, status } = await mgntAPI.updateFiliere(newValues);
        if (status == 200 || status == 201) {
          const index = this.filieres.findIndex(
            (filiere) => filiere.id == data.id
          );
          this.filieres[index] = data;
          return true;
        }
        return false;
      } catch (error: any) {
        console.log(error);
      }
    },
    async updateEmployeeConnexion(employeeID, values) {
      try {
        const { data, status } = await mgntAPI.updateEmployeeConnexion(
          employeeID,
          values
        );
        if (status == 200 || status == 201) {
          return true;
        }
        return false;
      } catch (er) {
        console.log(er);
      }
    },
  },
  getters: {
    filieres: (state) =>
      state.organizations.filter((fil) => fil.lookups_id == "10"),
    errorCall: (state) => state.error,
    getLaptops: (state) => state.laptops,
    getRouteurs: (state) => state.routeurs,
    getdocuments: (state) => state.documents,
    getEmployees: (state) => state.employees,
    getTeachers: (state) => (filter) => state.employees,
    currentClasse: (state) => state.classes.find((e) => e.current === true),
    getClasses:
      (state) =>
      (search = "") =>
        search == ""
          ? state.classes
          : state.classes.filter(
              (classe) =>
                classe.name.includes(search) ||
                classe.description.includes(search) ||
                classe.code.includes(search)
            ),
    getClasses2: (state) => state.classes, //: state.classes.filter((classe) => classe.name.includes(search) || classe.description.includes(search)),
    getLookups: (state) => (classeID?: string) =>
      classeID == ""
        ? state.lookups
        : state.lookups.filter((lookups) => lookups.classe_id == classeID),
  },
});
