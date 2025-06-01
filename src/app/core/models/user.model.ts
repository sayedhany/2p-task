import { UserRole } from '../enums/role.enum';
export interface User {
  id: number;
  name: string;
  email: string;
  password?: string; // Omit when sending user data to frontend
  role: UserRole;

  // Beneficiary-specific fields
  age?: number;
  gender?: 'Male' | 'Female' | 'Other';
  contact?: string;

  // Optional: Ratings received (avg or list)
  averageRating?: number;
  ratingsCount?: number;
}
