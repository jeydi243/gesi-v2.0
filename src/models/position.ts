export interface IPosition {
  id: string;
  _id?: string;
  title: string;
  code: string;
  job_description: string;
  org_id: string | IOrganization;
  report_to: string;
  employment_type: string;
  status: string;
  startDate: Date;
  endDate: Date;
  createdAt: Date;
}
