"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import type { PropertyType } from "@/types/property"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Bed, Bath, Car, Calendar, Home, ArrowLeft, BookmarkPlus, BookmarkCheck } from "lucide-react"
import ContactForm from "@/components/contact-form"
import SavedPropertiesModal from "@/components/saved-properties-modal"

export default function PropertyDetails({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [property, setProperty] = useState<PropertyType | null>(null)
  const [loading, setLoading] = useState(true)
  const [savedProperties, setSavedProperties] = useState<PropertyType[]>([])
  const [showSavedModal, setShowSavedModal] = useState(false)

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const response = await fetch(`/api/properties/${params.id}`)
        if (!response.ok) throw new Error("Property not found")
        const data = await response.json()
        setProperty(data)
      } catch (error) {
        console.error("Error fetching property:", error)
      } finally {
        setLoading(false)
      }
    }

    // Load saved properties from localStorage
    const loadSavedProperties = () => {
      const saved = localStorage.getItem("savedProperties")
      if (saved) setSavedProperties(JSON.parse(saved))
    }

    fetchProperty()
    loadSavedProperties()
  }, [params.id])

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  const isPropertySaved = () => {
    return property ? savedProperties.some((p) => p.Id === property.Id) : false
  }

  const handleSaveProperty = () => {
    if (!property) return

    if (isPropertySaved()) {
      // Remove from saved
      const updated = savedProperties.filter((p) => p.Id !== property.Id)
      setSavedProperties(updated)
      localStorage.setItem("savedProperties", JSON.stringify(updated))
    } else {
      // Add to saved
      const updated = [...savedProperties, property]
      setSavedProperties(updated)
      localStorage.setItem("savedProperties", JSON.stringify(updated))
    }
  }

  if (loading) {
    return <div className="container mx-auto p-8 text-center">Loading property details...</div>
  }

  if (!property) {
    return (
      <div className="container mx-auto p-8 text-center">
        <p className="mb-4">Property not found</p>
        <Button onClick={() => router.push("/")} variant="outline">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to listings
        </Button>
      </div>
    )
  }

  const saved = isPropertySaved()

  return (
    <main className="container mx-auto px-4 py-8">
      <Button onClick={() => router.push("/")} variant="outline" className="mb-6">
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to listings
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h1 className="text-3xl font-bold">{property.Title}</h1>
              <p className="text-muted-foreground">{property.Location}</p>
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold">${property["Sale Price"].toLocaleString()}</p>
              <p className="text-sm text-muted-foreground">Date Listed: {formatDate(property.DateListed)}</p>
            </div>
          </div>

          <Button onClick={handleSaveProperty} className="mb-6" variant={saved ? "secondary" : "default"}>
            {saved ? (
              <>
                <BookmarkCheck className="mr-2 h-4 w-4" /> Saved
              </>
            ) : (
              <>
                <BookmarkPlus className="mr-2 h-4 w-4" /> Save Property
              </>
            )}
          </Button>

          <div className="relative h-[400px] w-full mb-6 bg-muted rounded-lg overflow-hidden">
            <img
              src={property.PictureURL || "/placeholder.svg"}
              alt={property.Title}
              className="object-cover w-full h-full"
            />
          </div>

          <div className="grid grid-cols-5 gap-4 mb-6 text-center">
            <div className="p-4 bg-muted rounded-lg">
              <Bed className="h-6 w-6 mx-auto mb-2" />
              <p className="font-bold text-xl">{property.Bedrooms}</p>
              <p className="text-xs text-muted-foreground">BED</p>
            </div>
            <div className="p-4 bg-muted rounded-lg">
              <Bath className="h-6 w-6 mx-auto mb-2" />
              <p className="font-bold text-xl">{property.Bathrooms}</p>
              <p className="text-xs text-muted-foreground">BATH</p>
            </div>
            <div className="p-4 bg-muted rounded-lg">
              <Car className="h-6 w-6 mx-auto mb-2" />
              <p className="font-bold text-xl">{property.Parking}</p>
              <p className="text-xs text-muted-foreground">PARKING</p>
            </div>
            <div className="p-4 bg-muted rounded-lg">
              <Home className="h-6 w-6 mx-auto mb-2" />
              <p className="font-bold text-xl">{property.Sqft}</p>
              <p className="text-xs text-muted-foreground">SQFT</p>
            </div>
            <div className="p-4 bg-muted rounded-lg">
              <Calendar className="h-6 w-6 mx-auto mb-2" />
              <p className="font-bold text-xl">{property.YearBuilt}</p>
              <p className="text-xs text-muted-foreground">YEAR BUILT</p>
            </div>
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Description</h2>
            <p className="text-muted-foreground">{property.Description}</p>
          </div>
        </div>

        <div className="lg:col-span-1">
          <Card className="p-6 bg-muted/30">
            <h2 className="text-xl font-semibold mb-4 text-center">Contact Agent</h2>
            <ContactForm />
          </Card>
        </div>
      </div>

      {showSavedModal && (
        <SavedPropertiesModal
          savedProperties={savedProperties}
          setSavedProperties={setSavedProperties}
          onClose={() => setShowSavedModal(false)}
        />
      )}

      {savedProperties.length > 0 && (
        <div className="fixed bottom-4 right-4">
          <Button onClick={() => setShowSavedModal(true)}>Saved Properties ({savedProperties.length})</Button>
        </div>
      )}
    </main>
  )
}

