"use client"

import type React from "react"

import { useRouter } from "next/navigation"
import type { PropertyType } from "@/types/property"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { X } from "lucide-react"

interface SavedPropertiesModalProps {
  savedProperties: PropertyType[]
  setSavedProperties: React.Dispatch<React.SetStateAction<PropertyType[]>>
  onClose: () => void
}

export default function SavedPropertiesModal({
  savedProperties,
  setSavedProperties,
  onClose,
}: SavedPropertiesModalProps) {
  const router = useRouter()

  const handleRemove = (id: number) => {
    const updated = savedProperties.filter((p) => p.Id !== id)
    setSavedProperties(updated)
    localStorage.setItem("savedProperties", JSON.stringify(updated))
  }

  const handleViewDetails = (id: number) => {
    router.push(`/property/${id}`)
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl max-h-[80vh] overflow-hidden">
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="text-xl font-bold">Saved Properties</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="overflow-y-auto p-4 max-h-[calc(80vh-80px)]">
          {savedProperties.length === 0 ? (
            <p className="text-center py-8 text-muted-foreground">No saved properties</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {savedProperties.map((property) => (
                <Card key={property.Id} className="overflow-hidden flex">
                  <div className="relative h-24 w-24 flex-shrink-0">
                    <img
                      src={property.ThumbnailURL || "/placeholder.svg"}
                      alt={property.Title}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div className="p-3 flex-grow flex flex-col justify-between">
                    <div>
                      <h3 className="font-medium line-clamp-1">{property.Title}</h3>
                      <p className="text-sm text-muted-foreground">{property.Location}</p>
                      <p className="font-bold">${property["Sale Price"].toLocaleString()}</p>
                    </div>
                    <div className="flex gap-2 mt-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1"
                        onClick={() => handleViewDetails(property.Id)}
                      >
                        View
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        className="flex-1"
                        onClick={() => handleRemove(property.Id)}
                      >
                        Remove
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

