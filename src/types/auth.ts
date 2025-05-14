export interface User {
  email: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
}
