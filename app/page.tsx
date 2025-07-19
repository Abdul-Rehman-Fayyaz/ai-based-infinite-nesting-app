"use client"

import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Plus, Lock } from "lucide-react"
import type { CollaboratorPermission } from "@/types" // Declare CollaboratorPermission here

// Components
import { SectionItem } from "@/components/SectionItem"
import { SectionModal } from "@/components/SectionModal"
import { ProjectStats } from "@/components/ProjectStats"
import { EmptyState } from "@/components/EmptyState"
import { AppLayout } from "@/components/layout/AppLayout"

// Hooks
import { useSections } from "@/hooks/useSections"
import { useExpandedSections } from "@/hooks/useExpandedSections"
import { useAuth } from "@/contexts/AuthContext"

// Data & Utils
import { initialSections } from "@/data/mockData"
import { findParentTitle } from "@/utils/sectionUtils"
import { checkGlobalPermissions, filterAccessibleSections } from "@/utils/permissionUtils"

// Types
import type { Section } from "@/types"

function ProjectManager() {
  const { sections, handleDelete, handleEdit, handleAddChild, handleAddRoot } = useSections(initialSections)
  const { user } = useAuth()
  const { expandedSections, toggleExpanded, expandSection } = useExpandedSections(["1", "2"])

  // Filter sections based on user access
  const accessibleSections = useMemo(() => {
    if (!user) return []
    return filterAccessibleSections(sections, user.name)
  }, [sections, user])

  // Check global permissions based on user role
  const globalPermissions = checkGlobalPermissions(user)

  // Modal state
  const [modalOpen, setModalOpen] = useState(false)
  const [editingSection, setEditingSection] = useState<Section | undefined>()
  const [parentForNew, setParentForNew] = useState<string | undefined>()

  // Modal handlers
  const openAddChildModal = (parentId: string) => {
    setParentForNew(parentId)
    setEditingSection(undefined)
    setModalOpen(true)
  }

  const openEditModal = (section: Section) => {
    setEditingSection(section)
    setParentForNew(undefined)
    setModalOpen(true)
  }

  const openAddRootModal = () => {
    if (globalPermissions.canCreateRoot) {
      setParentForNew(undefined)
      setEditingSection(undefined)
      setModalOpen(true)
    }
  }

  const closeModal = () => {
    setModalOpen(false)
    setEditingSection(undefined)
    setParentForNew(undefined)
  }

  const handleModalSave = (data: {
    title: string
    description: string
    author: string
    collaborators: CollaboratorPermission[]
  }) => {
    if (editingSection) {
      handleEdit(editingSection.id, data)
    } else if (parentForNew) {
      handleAddChild(parentForNew, data)
      expandSection(parentForNew)
    } else {
      handleAddRoot(data)
    }
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Your Projects</h2>
          <p className="text-gray-600 mt-1">Organize your work with infinite nesting</p>
        </div>

        {globalPermissions.canCreateRoot ? (
          <Button onClick={openAddRootModal} className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Add Root Section
          </Button>
        ) : (
          <Button disabled className="flex items-center gap-2" title="Only Authors can create root sections">
            <Lock className="h-4 w-4" />
            No Permission
          </Button>
        )}
      </div>

      {/* Stats - Use accessible sections for stats */}
      <ProjectStats sections={accessibleSections} />

      {/* Sections Tree - Only show accessible sections */}
      {accessibleSections.length > 0 ? (
        <div className="space-y-4">
          {accessibleSections.map((section) => (
            <SectionItem
              key={section.id}
              section={section}
              onEdit={openEditModal}
              onDelete={handleDelete}
              onAddChild={openAddChildModal}
              expandedSections={expandedSections}
              toggleExpanded={toggleExpanded}
            />
          ))}
        </div>
      ) : (
        <EmptyState onAddRoot={openAddRootModal} />
      )}

      {/* Modal */}
      <SectionModal
        section={editingSection}
        isOpen={modalOpen}
        onClose={closeModal}
        onSave={handleModalSave}
        parentTitle={findParentTitle(sections, parentForNew)}
      />
    </div>
  )
}

export default function App() {
  return (
    <AppLayout>
      <ProjectManager />
    </AppLayout>
  )
}
