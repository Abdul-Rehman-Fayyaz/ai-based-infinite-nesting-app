"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { SectionHeader } from "./SectionHeader"
import { SectionActions } from "./SectionActions"
import { SectionMetadata } from "./SectionMetadata"
import { RoleIndicator } from "./RoleIndicator"
import { checkSectionPermissions } from "@/utils/permissionUtils"
import { useAuth } from "@/contexts/AuthContext"
import type { Section } from "@/types"

interface SectionItemProps {
  section: Section
  level?: number
  onEdit: (section: Section) => void
  onDelete: (id: string) => void
  onAddChild: (parentId: string) => void
  expandedSections: Set<string>
  toggleExpanded: (id: string) => void
}

export function SectionItem({
  section,
  level = 0,
  onEdit,
  onDelete,
  onAddChild,
  expandedSections,
  toggleExpanded,
}: SectionItemProps) {
  const { user } = useAuth()
  const isExpanded = expandedSections.has(section.id)
  const hasChildren = section.children.length > 0
  const indentLevel = level * 24
  const permissions = checkSectionPermissions(section, user?.name || "")

  const handleEdit = () => {
    if (permissions.canEdit) {
      onEdit(section)
    }
  }

  const handleDelete = () => {
    if (permissions.canDelete) {
      onDelete(section.id)
    }
  }

  const handleAddChild = () => {
    if (permissions.canCreate) {
      onAddChild(section.id)
    }
  }

  return (
    <div className="w-full">
      <Card className="mb-2" style={{ marginLeft: `${indentLevel}px` }}>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <SectionHeader
                title={section.title}
                description={section.description}
                hasChildren={hasChildren}
                isExpanded={isExpanded}
                onToggleExpanded={() => toggleExpanded(section.id)}
              />
              <RoleIndicator section={section} currentUserName={user?.name || ""} />
            </div>

            <SectionActions
              section={section}
              onAddChild={handleAddChild}
              onEdit={handleEdit}
              onDelete={handleDelete}
              level={level}
            />
          </div>
        </CardHeader>

        <CardContent className="pt-0">
          <SectionMetadata
            author={section.author}
            collaborators={section.collaborators}
            updatedAt={section.updatedAt}
          />
        </CardContent>
      </Card>

      {/* Recursive rendering of children */}
      {isExpanded && hasChildren && (
        <div className="ml-4">
          {section.children.map((child) => (
            <SectionItem
              key={child.id}
              section={child}
              level={level + 1}
              onEdit={onEdit}
              onDelete={onDelete}
              onAddChild={onAddChild}
              expandedSections={expandedSections}
              toggleExpanded={toggleExpanded}
            />
          ))}
        </div>
      )}
    </div>
  )
}
