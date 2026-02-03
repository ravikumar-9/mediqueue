export interface User {
    firstName: string,
    lastName: string,
    email: string,
    phone: string,
    id:string,
    isDeactivated:boolean,
    createdAt: string
  }
  
  export interface ApiResponse<T> {
    status: boolean;
    data: T;
    message?: string;
  }
  