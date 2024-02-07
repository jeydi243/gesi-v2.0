import { ILookups } from "./lookup";

interface IOrganization {
  _id?: string;
  name: string;
  code: string;
  description: string;
  createdAt?: Date;
  updatedBy?: string;
  organization_parent_id: string | null | IOrganization;
  lookup_id: string | ILookups;
}
