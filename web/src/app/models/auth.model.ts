import { HttpStatusCode } from "@angular/common/http";

export interface IUser {
    id?: string;
    name: string;
    email: string;
    password: string;
    address?: string;
    phoneNumber?: string;
    role: UserRole;
}

export enum UserRole {
  MART = 'mart',
  COMPANY = 'company',
}

export interface IGenericResponse<T> {
    message: string;
    status: HttpStatusCode;
    data: T
}
