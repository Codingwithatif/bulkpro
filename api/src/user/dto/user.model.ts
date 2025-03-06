export interface IUser {
    id: string;
    name?: string;
    email: string;
    password: string;
    address?: string;
    phoneNumber?: string;
    role: UserRole;
    isActive: boolean;
}

export enum UserRole {
  MART = 'mart',
  COMPANY = 'company',
}