"use client"

import type React from "react"
import { cn } from "@/lib/utils"
import { Home, Building2, TreePine, Construction } from "lucide-react"

interface ProjectTypeSelectorProps {
  value: string
  onValueChange: (value: string) => void
}

interface ProjectTypeOption {
  id: string
  label: string
  icon: React.ReactNode
  description: string
}

const projectTypes: ProjectTypeOption[] = [
  {
    id: "particuliere-tuin",
    label: "Particuliere Tuin",
    icon: <Home className="h-6 w-6" />,
    description: "Tuinontwerp, aanleg of onderhoud voor woningen",
  },
  {
    id: "bedrijfstuin",
    label: "Bedrijfstuin",
    icon: <Building2 className="h-6 w-6" />,
    description: "Groenvoorziening voor bedrijven en kantoren",
  },
  {
    id: "openbare-ruimte",
    label: "Openbare Ruimte",
    icon: <TreePine className="h-6 w-6" />,
    description: "Groenvoorziening voor gemeenten en openbare ruimtes",
  },
  {
    id: "civiele-werken",
    label: "Civiele Werken",
    icon: <Construction className="h-6 w-6" />,
    description: "Bestrating, drainage en andere civiele projecten",
  },
]

export function ProjectTypeSelector({ value, onValueChange }: ProjectTypeSelectorProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {projectTypes.map((type) => (
        <div
          key={type.id}
          className={cn(
            "border rounded-lg p-4 cursor-pointer transition-all",
            value === type.id
              ? "border-primary bg-primary/5 shadow-sm"
              : "border-gray-200 hover:border-gray-300 hover:bg-gray-50",
          )}
          onClick={() => onValueChange(type.id)}
        >
          <div className="flex items-start">
            <div
              className={cn(
                "rounded-full p-2 mr-3",
                value === type.id ? "bg-primary/10 text-primary" : "bg-gray-100 text-gray-500",
              )}
            >
              {type.icon}
            </div>
            <div>
              <h3 className="font-medium">{type.label}</h3>
              <p className="text-sm text-gray-500">{type.description}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
