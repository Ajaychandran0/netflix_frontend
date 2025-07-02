export interface User {
  email: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  role?: 'ADMIN' | 'USER';
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
}

export interface SignInForm {
  email: string;
  password: string;
}

export interface SignUpForm {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
}
