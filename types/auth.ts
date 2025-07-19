export interface User {
  id: string
  name: string
  email: string
  role: "author" | "collaborator" // Only two roles needed
}

export interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<void>
  signup: (name: string, email: string, password: string, role?: "author" | "collaborator") => Promise<void>
  logout: () => void
  loading: boolean
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface SignupCredentials {
  name: string
  email: string
  password: string
  role?: "author" | "collaborator"
}
