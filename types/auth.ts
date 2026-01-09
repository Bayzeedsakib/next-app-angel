export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  displayName?: string;
  bio?: string;
}

export interface AuthResponse {
  access_token: string;
  moderator?: Moderator;
}

export interface Moderator {
  id: number;
  email: string;
  status: 'active' | 'inactive';
  profile?: Profile;
}

export interface Profile {
  id: number;
  displayName?: string;
  bio?: string;
}

export interface AuthContextType {
  user: Moderator | null;
  loading: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

