export interface IEmployee extends IPerson {
  _id?: string;
  id?: string;
  educations: Array<any>;
  contacts: Array<any>;
  images?: Array<string>;
  experiences?: Array<any>;
  skills?: Array<any>;
  telephones: Array<any>;
  biography?: string;
  hire_date?: string;
  onboarding?: any;
  resume_file: string;
}
