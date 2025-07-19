"use client"

import { useState } from "react"
import type { Section, SectionModalData } from "@/types"
import { deleteSection, updateSection, addChildSection } from "@/utils/sectionUtils"

export const useSections = (initialSections: Section[]) => {
  const [sections, setSections] = useState<Section[]>(initialSections)

  const handleDelete = (id: string) => {
    setSections((prev) => deleteSection(prev, id))
  }

  const handleEdit = (id: string, data: SectionModalData) => {
    setSections((prev) =>
      updateSection(prev, id, {
        title: data.title,
        description: data.description,
        author: data.author,
        collaborators: data.collaborators,
      }),
    )
  }

  const handleAddChild = (parentId: string, data: SectionModalData) => {
    const newSection: Section = {
      id: Date.now().toString(),
      title: data.title,
      description: data.description,
      parentId,
      children: [],
      author: data.author,
      collaborators: data.collaborators,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    setSections((prev) => addChildSection(prev, parentId, newSection))
  }

  const handleAddRoot = (data: SectionModalData) => {
    const newSection: Section = {
      id: Date.now().toString(),
      title: data.title,
      description: data.description,
      children: [],
      author: data.author,
      collaborators: data.collaborators,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    setSections((prev) => [...prev, newSection])
  }

  return {
    sections,
    handleDelete,
    handleEdit,
    handleAddChild,
    handleAddRoot,
  }
}
