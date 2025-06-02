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
  ratings?: {
    id: string; // Unique identifier for the rating
    ratingsrId: number; // ID of the rater (could be a user or admin)
    ratingsdId: number; // ID of the rated beneficiary
    score: number; // Rating score, e.g., 1-5
  }[];
  role?: string; // Optional field for role, if needed
}
