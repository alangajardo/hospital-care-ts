export interface IAuthContextType{
    user: string | null;
    login: (role: string) => void;
    logout: () => void;
    isAuthenticated: boolean;
}