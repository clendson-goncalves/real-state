"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import type { PropertyType } from "@/types/property"
import { Bed, Bath, Car, BookmarkPlus, BookmarkCheck } from "lucide-react"

interface PropertyCardProps {
  property: PropertyType
  isSaved: boolean
  onToggleSave: () => void
}

export default function PropertyCard({ property, isSaved, onToggleSave }: PropertyCardProps) {
  return (
    <Card className="overflow-hidden h-full flex flex-col">
      <div className="relative h-48 w-full bg-muted">
        <img
          src={property.ThumbnailURL || "/placeholder.svg"}
          alt={property.Title}
          className="object-cover w-full h-full"
        />
        <Button
          variant="secondary"
          size="icon"
          className="absolute top-2 right-2 bg-white/80 hover:bg-white"
          onClick={(e) => {
            e.preventDefault()
            onToggleSave()
          }}
        >
          {isSaved ? <BookmarkCheck className="h-4 w-4 text-primary" /> : <BookmarkPlus className="h-4 w-4" />}
        </Button>
      </div>
      <CardContent className="pt-4 flex-grow">
        <h2 className="font-semibold text-lg line-clamp-1" title={property.Title}>
          {property.Title}
        </h2>
        <p className="text-muted-foreground">{property.Location}</p>
        <div className="flex items-center gap-4 mt-2 text-sm">
          <div className="flex items-center gap-1">
            <Bed className="h-4 w-4" />
            <span>{property.Bedrooms}</span>
          </div>
          <div className="flex items-center gap-1">
            <Bath className="h-4 w-4" />
            <span>{property.Bathrooms}</span>
          </div>
          <div className="flex items-center gap-1">
            <Car className="h-4 w-4" />
            <span>{property.Parking}</span>
          </div>
        </div>
        <p className="font-bold text-xl mt-2">${property["Sale Price"] ? property["Sale Price"].toLocaleString() : 'N/A'}</p>
      </CardContent>
      <CardFooter className="pt-0">
        <Link href={`/property/${property.Id}`} className="w-full">
          <Button variant="default" className="w-full">
            View Details
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
}

