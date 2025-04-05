"use client"

import { useRouter } from "next/navigation"
import type { PropertyType } from "@/types/property"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { X } from "lucide-react"
import Image from "next/image"

interface Props {
  savedProperties: PropertyType[]
  setSavedProperties: React.Dispatch<React.SetStateAction<PropertyType[]>>
  onClose: () => void
}

export default function SavedPropertiesModal({
  savedProperties,
  setSavedProperties,
  onClose,
}: Props) {
  const router = useRouter()

  const remove = (id: number) => {
    const updated = savedProperties.filter(p => p.Id !== id)
    setSavedProperties(updated)
    localStorage.setItem("savedProperties", JSON.stringify(updated))
  }

  const viewDetails = (id: number) => {
    router.push(`/property/${id}`)
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl max-h-[80vh] overflow-hidden">
        <div className="px-4 py-2 flex justify-between items-center">
          <h2 className="text-xl font-bold">Saved Properties</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="px-4 mb-4">
          {savedProperties.length === 0 ? (
            <p className="text-center py-8 text-muted-foreground">No saved properties</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {savedProperties.map(({ Id, Title, Location, ThumbnailURL, ["Sale Price"]: price }) => (
                <Card key={Id} className="overflow-hidden flex p-0">
                  <div className="relative w-full h-36 flex-shrink-0">
                    <Image 
                      src={ThumbnailURL} 
                      alt={Title} 
                      className="object-cover w-full h-full" 
                      width={150}
                      height={150}
                    />
                  </div>
                  <div className="p-3 flex-grow flex flex-col justify-between">
                    <div>
                      <p className="font-semibold line-clamp-1">{Title}</p>
                      <p className="text-xs font-light text-muted-foreground">{Location}</p>
                      <p className="font-light text-lg">
                        {price ? `$${price.toLocaleString()}` : "N/A"}
                      </p>
                    </div>
                    <div className="flex gap-2 mt-2">
                      <Button size="sm" variant="outline" className="flex-1" onClick={() => viewDetails(Id)}>
                        View
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        className="flex-1 bg-red-700 hover:bg-red-800"
                        onClick={() => remove(Id)}
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
