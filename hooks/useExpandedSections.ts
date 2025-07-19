"use client"

import { useState } from "react"

export const useExpandedSections = (initialExpanded: string[] = []) => {
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(initialExpanded))

  const toggleExpanded = (id: string) => {
    setExpandedSections((prev) => {
      const newExpanded = new Set(prev)
      if (newExpanded.has(id)) {
        newExpanded.delete(id)
      } else {
        newExpanded.add(id)
      }
      return newExpanded
    })
  }

  const expandSection = (id: string) => {
    setExpandedSections((prev) => new Set([...prev, id]))
  }

  const collapseSection = (id: string) => {
    setExpandedSections((prev) => {
      const newExpanded = new Set(prev)
      newExpanded.delete(id)
      return newExpanded
    })
  }

  return {
    expandedSections,
    toggleExpanded,
    expandSection,
    collapseSection,
  }
}
