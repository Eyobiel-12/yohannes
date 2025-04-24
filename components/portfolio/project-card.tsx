import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ChevronRight, MapPin, Calendar } from "lucide-react"

interface ProjectCardProps {
  id: string
  title: string
  category: string
  location: string
  date: string
  excerpt: string
  tags: string[]
  thumbnail: string
  featured?: boolean
}

export default function ProjectCard({
  id,
  title,
  category,
  location,
  date,
  excerpt,
  tags,
  thumbnail,
  featured = false,
}: ProjectCardProps) {
  return (
    <Link href={`/portfolio/${id}`}>
      <Card className="overflow-hidden border-none shadow-lg hover:shadow-xl transition-shadow duration-300 h-full">
        <div className="relative h-64 w-full overflow-hidden">
          <Image
            src={thumbnail || "/placeholder.svg"}
            alt={title}
            fill
            className="object-cover transition-transform duration-500 hover:scale-105"
          />
          {featured && (
            <div className="absolute top-4 right-4">
              <Badge className="bg-primary hover:bg-primary/90">Uitgelicht</Badge>
            </div>
          )}
        </div>
        <CardContent className="p-6">
          <div className="flex items-center text-sm text-gray-500 mb-3 space-x-4">
            <div className="flex items-center">
              <MapPin className="h-4 w-4 mr-1" />
              <span>{location}</span>
            </div>
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-1" />
              <span>{date}</span>
            </div>
          </div>
          <h3 className="text-xl font-bold mb-2">{title}</h3>
          <p className="text-gray-600 mb-4">{excerpt}</p>
          <div className="flex flex-wrap gap-2 mb-4">
            {tags.slice(0, 3).map((tag, index) => (
              <Badge key={index} variant="outline" className="bg-primary/5 text-primary border-primary/20">
                {tag}
              </Badge>
            ))}
            {tags.length > 3 && (
              <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20">
                +{tags.length - 3}
              </Badge>
            )}
          </div>
          <div className="text-primary font-medium inline-flex items-center hover:underline">
            Bekijk Project <ChevronRight className="ml-1 h-4 w-4" />
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
