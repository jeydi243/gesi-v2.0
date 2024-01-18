interface IOrganization {
  _id?: string;
  name: string;
  code: string;
  description: string;
  createdAt?: Date;
  updatedBy?: string;
  organization_parent_id: string | null;
  lookup_id: string;
}
