export interface LoginPayload {
  email: string;
  password: string;
  role: 'Admin' | 'Beneficiary';
}
