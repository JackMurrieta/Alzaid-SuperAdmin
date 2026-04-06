export type UserRole =
    | 'superadmin'
    | 'admin'
    | 'formal_caregiver'
    | 'informal_caregiver'
    | 'coordinator'
    | 'nurse';

export interface User {
    id?: string;
    name: string;
    lastName: string;
    lastNameSecond?: string;
    email: string;
    username: string;
    password?: string;
    phone: string;
    role: UserRole;
    centerId?: string;

    active?: boolean;
    blocked?: boolean;
    forcePasswordChange?: boolean;
}