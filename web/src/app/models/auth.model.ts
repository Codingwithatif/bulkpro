import { HttpStatusCode } from "@angular/common/http";

export interface IUser {
    id?: string;
    name: string;
    email: string;
    password: string;
    address?: string;
    phoneNumber?: string;
    role: UserRole;
    isActive?: boolean; // Added for user activation
    martId?: string; // Added for MART users
    companyId?: string; // Added for COMPANY users
}

export enum UserRole {
  MART = 'mart',
  COMPANY = 'company',
}

export interface IGenericResponse<T> {
    message: string;
    status: HttpStatusCode;
    data: T;
}
