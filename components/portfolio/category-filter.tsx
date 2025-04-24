"use client"

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface Category {
  id: string
  name: string
}

interface CategoryFilterProps {
  categories: Category[]
  activeCategory: string
  onChange: (value: string) => void
}

export default function CategoryFilter({ categories, activeCategory, onChange }: CategoryFilterProps) {
  return (
    <Tabs value={activeCategory} onValueChange={onChange} className="w-full">
      <div className="flex justify-center mb-12">
        <TabsList className="grid grid-cols-2 md:grid-cols-5 w-full max-w-4xl">
          {categories.map((category) => (
            <TabsTrigger key={category.id} value={category.id}>
              {category.name}
            </TabsTrigger>
          ))}
        </TabsList>
      </div>
    </Tabs>
  )
}
