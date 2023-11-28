import mgntAPI from "@/api/management";
import { defineStore } from "pinia";
import { IEmployee } from "@/models/employee";
import { useAuth } from "./authentication";
import { useConfig } from "./config";
import { $Fetch } from "ofetch";
import { IClasse } from "@/models/classe";
import { IPosition } from "@/models/position";
import { ILookups } from "@/models/lookup";

export interface IStoreManagement {
  laptops: [];
  routeurs: [];
  classes: IClasse[];
  lookups: ILookups[];
  error: any;
  myfetch?: $Fetch;
  documents: Array<any>;
  organizations: Array<IOrganization>;
  positions: Array<IPosition>;
  filieres?: Array<any>;
}

export const useManagement = defineStore("management", {
  state: (): IStoreManagement => ({
    laptops: [],
    error: "",
    routeurs: [],
    organizations: [],
    positions: [],
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
  }),

  actions: {
    async init() {
      try {
        const config = useConfig();
        this.myfetch = config.myfetch;

        await this.getAllClasses();
        await this.getAllLookups();
        await this.getAllDocuments();
        await this.getAllOrgs();
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
    async getAllOrgs() {
      this.organizations = [];
      try {
        const orgsALL = await this.myfetch!<Array<IOrganization>>(
          "/organizations",
          {
            method: "GET",
          }
        ); // await mgntAPI.getClasses()
        console.log({ orgsALL });

        console.log(
          `%cFetch successfully ${orgsALL.length} organizations !`,
          "color: #ff8040; font-weight: bold;"
        );

        if (orgsALL.length > 0) {
          orgsALL.forEach((classe) => this.organizations.unshift(classe));
        } else {
          this.organizations = orgsALL;
        }

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
    async addOrg(newOrg: IOrganization) {
      try {
        this.organizations.unshift(newOrg);
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
    orgs: (state) => state.organizations,
    errorCall: (state) => state.error,
    getLaptops: (state) => state.laptops,
    getRouteurs: (state) => state.routeurs,
    getdocuments: (state) => state.documents,
    currentClasse: (state) => state.classes.filter((e) => e.current === true),

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
    getLookups:
      (state) =>
      (classeID: string = "") =>
        classeID == ""
          ? state.lookups
          : state.lookups.filter((lookups) => lookups.classe_id == classeID),
  },
});
