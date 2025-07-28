// src/types/User.ts

export interface LoginRequest {
  email: string;
  password: string;
}

export interface User {
  firstName: string;
  lastName: string;
  email: string;
  accessToken: string;
}
