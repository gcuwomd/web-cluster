export interface RegistrationModel {
  username: string;
  name: string;
  phone: string;
  password: string;
  email: string;
  code: string;
  departmentId:string;
}

export interface RegisterModel extends RegistrationModel {
  verifyPassword: string;
}

export interface ResponseModel<T> {
  code: number;
  data: T;
  message: string;
}