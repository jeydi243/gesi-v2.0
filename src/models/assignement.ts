export interface IAssignment {
  id?: string;
  lookup_id: string;
  employee_id: string;
  position_id: string;
  from: string | Date;
  to: string | Date;
}
