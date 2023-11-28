interface IOrganization {
  _id: string;
  name: string;
  code: string;
  description: string;
  created: string;
  updatedBy: string;
  organization_parent_id: string | null;
  lookup_id: string;
}
