export interface IPosition {
    _id?: string;
    id?: string;
    code: string;
    name: string;
    description: string;
    organisationID: string;
    parent_position_id: string;
    createdAt: Date;
    updatedAt: Date;
  }