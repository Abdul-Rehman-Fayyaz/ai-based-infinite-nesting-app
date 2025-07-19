import type { Section } from "@/types"

export const findSection = (sections: Section[], id: string): Section | null => {
  for (const section of sections) {
    if (section.id === id) return section
    const found = findSection(section.children, id)
    if (found) return found
  }
  return null
}

export const findParentTitle = (sections: Section[], parentId?: string): string | undefined => {
  if (!parentId) return undefined
  const parent = findSection(sections, parentId)
  return parent?.title
}

export const deleteSection = (sections: Section[], id: string): Section[] => {
  return sections.filter((section) => {
    if (section.id === id) return false
    section.children = deleteSection(section.children, id)
    return true
  })
}

export const updateSection = (sections: Section[], targetId: string, updates: Partial<Section>): Section[] => {
  return sections.map((section) => {
    if (section.id === targetId) {
      return {
        ...section,
        ...updates,
        updatedAt: new Date(),
      }
    }
    return {
      ...section,
      children: updateSection(section.children, targetId, updates),
    }
  })
}

export const addChildSection = (sections: Section[], parentId: string, newSection: Section): Section[] => {
  return sections.map((section) => {
    if (section.id === parentId) {
      return {
        ...section,
        children: [...section.children, newSection],
      }
    }
    return {
      ...section,
      children: addChildSection(section.children, parentId, newSection),
    }
  })
}

export const countTotalSections = (sections: Section[]): number => {
  return sections.reduce((count, section) => {
    return count + 1 + countTotalSections(section.children)
  }, 0)
}

export const getMaxDepth = (sections: Section[], currentDepth = 0): number => {
  if (sections.length === 0) return currentDepth

  return Math.max(...sections.map((section) => getMaxDepth(section.children, currentDepth + 1)))
}

export const getUniqueCollaborators = (sections: Section[]): string[] => {
  const collaboratorSet = new Set<string>()

  const addCollaborators = (sectionList: Section[]) => {
    sectionList.forEach((section) => {
      section.collaborators.forEach((collaborator) => collaboratorSet.add(collaborator.name))
      addCollaborators(section.children)
    })
  }

  addCollaborators(sections)
  return Array.from(collaboratorSet)
}
