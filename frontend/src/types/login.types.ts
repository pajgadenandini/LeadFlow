export interface LogInFormData {
  email: string;
  password: string;
}

export interface LogInFormErrors {
  email: string;
  password: string;
}

export interface LoginErrorResponse {
  success:boolean;
  error?:string;
  message?:string;
  redirect?:string;
  type?:string;
}