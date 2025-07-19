import type { Section, User } from "@/types"

export const mockUser: User = {
  id: "1",
  name: "John Doe",
  email: "john@example.com",
  role: "author",
}

export const initialSections: Section[] = [
  {
    id: "1",
    title: "Project Alpha",
    description: "Main project for Q1 2024",
    children: [
      {
        id: "2",
        title: "Frontend Development",
        description: "React application development",
        parentId: "1",
        children: [
          {
            id: "3",
            title: "Component Library",
            description: "Reusable UI components",
            parentId: "2",
            children: [
              {
                id: "4",
                title: "Button Components",
                parentId: "3",
                children: [],
                author: "John Doe",
                collaborators: [{ name: "Jane Smith", permission: "edit" }],
                createdAt: new Date("2024-01-15"),
                updatedAt: new Date("2024-01-20"),
              },
            ],
            author: "John Doe",
            collaborators: [
              { name: "Jane Smith", permission: "edit" },
              { name: "Bob Wilson", permission: "view" },
            ],
            createdAt: new Date("2024-01-10"),
            updatedAt: new Date("2024-01-18"),
          },
        ],
        author: "John Doe",
        collaborators: [{ name: "Jane Smith", permission: "view" }], // View-only access
        createdAt: new Date("2024-01-05"),
        updatedAt: new Date("2024-01-15"),
      },
      {
        id: "5",
        title: "Backend API",
        description: "REST API development",
        parentId: "1",
        children: [],
        author: "Jane Smith",
        collaborators: [{ name: "John Doe", permission: "view" }], // View-only access
        createdAt: new Date("2024-01-08"),
        updatedAt: new Date("2024-01-12"),
      },
    ],
    author: "John Doe",
    collaborators: [
      { name: "Jane Smith", permission: "edit" },
      { name: "Bob Wilson", permission: "view" },
    ],
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-10"),
  },
]
