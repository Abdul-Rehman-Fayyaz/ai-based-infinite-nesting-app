"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Folder, Users, FileText } from "lucide-react"
import { countTotalSections, getMaxDepth, getUniqueCollaborators } from "@/utils/sectionUtils"
import type { Section } from "@/types"

interface ProjectStatsProps {
  sections: Section[]
}

export function ProjectStats({ sections }: ProjectStatsProps) {
  const totalSections = countTotalSections(sections)
  const maxDepth = getMaxDepth(sections)
  const uniqueCollaborators = getUniqueCollaborators(sections)

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-2">
            <Folder className="h-5 w-5 text-blue-500" />
            <div>
              <p className="text-sm text-muted-foreground">Total Sections</p>
              <p className="text-2xl font-bold">{totalSections}</p>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-2">
            <Users className="h-5 w-5 text-green-500" />
            <div>
              <p className="text-sm text-muted-foreground">Collaborators</p>
              <p className="text-2xl font-bold">{uniqueCollaborators.length}</p>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-purple-500" />
            <div>
              <p className="text-sm text-muted-foreground">Max Depth</p>
              <p className="text-2xl font-bold">{maxDepth}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
