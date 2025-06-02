import { UserStatus } from '../../core/enums/role.enum';

export interface Beneficiary {
  id: string;
  name: string;
  budget: number;
  age: number;
  gender: string;
  contact: string;
  status: UserStatus; // Status of the beneficiary
  email?: string; // Optional field for email
}
