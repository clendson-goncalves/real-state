"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import type { PropertyType } from "@/types/property"
import { Bed, Bath, BookmarkPlus, BookmarkCheck } from "lucide-react"

interface PropertyCardProps {
  property: PropertyType
  isSaved: boolean
  onToggleSave: () => void
}

export default function PropertyCard({ property, isSaved, onToggleSave }: PropertyCardProps) {
  return (
    <Card className="overflow-hidden h-full flex flex-col p-0">
      <div className="relative w-full h-48">
        <Link href={`/property/${property.Id}`} className="w-full">
          <img
            src={property.ThumbnailURL}
            alt={property.Title}
            className="object-cover w-full h-full hover:opacity-80"
          />
        </Link>
        <Button
          variant="secondary"
          size="icon"
          className="absolute top-2 right-2 bg-white/50 text-slate-400 hover:bg-white hover:text-slate-900"
          onClick={(e) => {
            e.preventDefault()
            onToggleSave()
          }}
        >
          {isSaved ? <BookmarkCheck className="h-4 w-4 text-slate-900" /> : <BookmarkPlus className="h-4 w-4" />}
        </Button>
      </div>
      <CardContent className="pt-4 flex-grow">
        <div className="font-light text-lg line-clamp-1" title={property.Title}>
          {property.Title}
        </div>
        <p className="font-light text-sm text-muted-foreground">{property.Location}</p>
        <div className="flex justify-start items-center gap-1 mt-1 text-xs font-light text-muted-foreground">
          <div className="flex items-center gap-1">
            <Bed className="h-4 w-4" />
            <span>{property.Bedrooms} beds</span>
          </div>
          |
          <div className="flex items-center gap-1">
            <Bath className="h-4 w-4" />
            <span>{property.Bathrooms} baths</span>
          </div>
        </div>
        <p className="font-light text-2xl mt-2">${property["Sale Price"] ? property["Sale Price"].toLocaleString() : 'N/A'}</p>
      </CardContent>
      <CardFooter className="mb-4">
        <Link href={`/property/${property.Id}`} className="w-full">
          <Button variant="default" className="w-full">
            View Details
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
}

