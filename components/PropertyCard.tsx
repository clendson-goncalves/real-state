"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import type { PropertyType } from "@/types/property"
import { Bed, Bath, BookmarkPlus, BookmarkCheck } from "lucide-react"
import Image from "next/image"

/**
 * Props for the PropertyCard component
 * 
 * @interface PropertyCardProps
 * @property {PropertyType} property - The property data to display
 * @property {boolean} isSaved - Whether the property is saved to user favorites
 * @property {() => void} onToggleSave - Function to toggle saved status
 */
interface PropertyCardProps {
  property: PropertyType
  isSaved: boolean
  onToggleSave: () => void
}

/**
 * PropertyCard Component
 * 
 * Displays a property listing as a card with image, details and actions.
 * Features include property info, save/bookmark functionality, and navigation to detail page.
 * 
 * @param {PropertyCardProps} props - Component props
 * @returns {JSX.Element} Rendered property card
 */
export default function PropertyCard({ property, isSaved, onToggleSave }: PropertyCardProps) {
  const { Id, Title, Location, Bedrooms, Bathrooms, ThumbnailURL, ["Sale Price"]: price } = property

  return (
    <Card className="overflow-hidden h-full flex flex-col p-0">
      <div className="relative w-full h-48">
        <Link href={`/property/${Id}`} className="w-full">
          <Image
            src={ThumbnailURL}
            alt={Title}
            width={150}
            height={150}
            className="object-cover w-full h-full hover:opacity-80"
          />
        </Link>
        <Button
          variant="secondary"
          size="icon"
          onClick={(e) => {
            e.preventDefault()
            onToggleSave()
          }}
          className="absolute top-2 right-2 bg-white/60 text-slate-300 hover:bg-white hover:text-slate-900"
        >
          {isSaved ? (
            <BookmarkCheck className="h-4 w-4 text-slate-900" />
          ) : (
            <BookmarkPlus className="h-4 w-4" />
          )}
        </Button>
      </div>

      <CardContent className="pt-4 flex-grow">
        <div className="font-semibold text-lg line-clamp-1" title={Title}>
          {Title}
        </div>
        <p className="font-light text-sm text-muted-foreground">{Location}</p>

        <div className="flex items-center gap-1 mt-1 text-xs font-light text-muted-foreground">
          <div className="flex items-center gap-1">
            <Bed className="h-4 w-4" />
            <span>{Bedrooms} beds</span>
          </div>
          |
          <div className="flex items-center gap-1">
            <Bath className="h-4 w-4" />
            <span>{Bathrooms} baths</span>
          </div>
        </div>

        <p className="font-light text-2xl mt-2">
          {price ? `$${price.toLocaleString()}` : "N/A"}
        </p>
      </CardContent>

      <CardFooter className="mb-4">
        <Link href={`/property/${Id}`} className="w-full">
          <Button className="w-full">View Details</Button>
        </Link>
      </CardFooter>
    </Card>
  )
}
