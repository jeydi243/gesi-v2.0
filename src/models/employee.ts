export interface IEmployee extends IPerson {
  educations: Array<any>;
  contacts: Array<any>;
  images?: Array<string>;
  experiences?: Array<any>;
  telephones: Array<any>;
  biography?: string;
  hire_date?: string;
  onboarding?: any;
  resume_file: string;
}
