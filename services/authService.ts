import type { User, LoginCredentials, SignupCredentials } from "@/types/auth"

// Mock users database - replace with actual json-server-auth
const mockUsers: User[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    role: "author",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    role: "author",
  },
  {
    id: "3",
    name: "Bob Wilson",
    email: "bob@example.com",
    role: "collaborator",
  },
]

const API_BASE = "http://localhost:3001"

class AuthService {
  async login(credentials: LoginCredentials): Promise<{ user: User; token: string }> {
    // Simulate API call - replace with actual json-server-auth
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Find user in mock database
    const user = mockUsers.find((u) => u.email === credentials.email)

    if (user && credentials.password === "password") {
      const token = "mock-jwt-token"

      // Store in localStorage
      localStorage.setItem("auth-token", token)
      localStorage.setItem("user", JSON.stringify(user))

      return { user, token }
    }

    throw new Error("Invalid credentials")
  }

  async signup(credentials: SignupCredentials): Promise<{ user: User; token: string }> {
    // Simulate API call - replace with actual json-server-auth
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Check if email already exists
    if (mockUsers.some((u) => u.email === credentials.email)) {
      throw new Error("Email already exists")
    }

    const user: User = {
      id: Date.now().toString(),
      name: credentials.name,
      email: credentials.email,
      role: credentials.role || "collaborator", // Default to collaborator
    }

    // Add to mock database
    mockUsers.push(user)

    const token = "mock-jwt-token"

    // Store in localStorage
    localStorage.setItem("auth-token", token)
    localStorage.setItem("user", JSON.stringify(user))

    return { user, token }
  }

  async getCurrentUser(): Promise<User | null> {
    const token = localStorage.getItem("auth-token")
    const userStr = localStorage.getItem("user")

    if (!token || !userStr) return null

    try {
      return JSON.parse(userStr)
    } catch {
      return null
    }
  }

  logout(): void {
    localStorage.removeItem("auth-token")
    localStorage.removeItem("user")
  }

  getToken(): string | null {
    return localStorage.getItem("auth-token")
  }
}

export const authService = new AuthService()
