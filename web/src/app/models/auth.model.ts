import { HttpStatusCode } from "@angular/common/http";

export interface IUser {
    id?: string;
    name: string;
    email: string;
    password: string;
    address?: string;
    phoneNumber?: string;
    store: IStore | null;
    role: UserRole;
    isActive?: boolean; // Added for user activation
    martId?: string; // Added for MART users
    companyId?: string; // Added for COMPANY users
}

export interface IStore {
  storeName: string;
  ownerName?: string;
  storeAddress?: string;
  storeRegistration?: string;
  martId?: string;
  companyId?: string;
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
