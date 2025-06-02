export interface Beneficiary {
  id: string;
  name: string;
  budget: number;
  age: number;
  gender: string;
  contact: string;
  email?: string; // Optional field for email
}
