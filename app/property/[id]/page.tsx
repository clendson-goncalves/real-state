"use client"

import { useState, useEffect, use } from "react"
import { useRouter } from "next/navigation"
import type { PropertyType } from "@/types/property"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Bed, Bath, Car, Calendar, Home, ArrowLeft, BookmarkPlus, BookmarkCheck, BookmarkIcon } from "lucide-react"
import ContactForm from "@/components/ContactForm"
import SavedPropertiesModal from "@/components/SavedPropertiesModal"

export default function PropertyDetails({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter()
  const [property, setProperty] = useState<PropertyType | null>(null)
  const [loading, setLoading] = useState(true)
  const [saved, setSaved] = useState<PropertyType[]>([])
  const [showModal, setShowModal] = useState(false)

  const { id: propertyId } = use(params)

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const res = await fetch(`/api/properties/${propertyId}`)
        if (!res.ok) throw new Error("Not found")
        const data = await res.json()
        setProperty(data)
      } catch (err) {
        console.error("Fetch error:", err)
      } finally {
        setLoading(false)
      }
    }

    const loadSaved = () => {
      const stored = localStorage.getItem("savedProperties")
      if (stored) setSaved(JSON.parse(stored))
    }

    fetchProperty()
    loadSaved()
  }, [propertyId])

  const formatDate = (str: string) =>
    new Date(str).toLocaleDateString("en-US", {
      year: "numeric", month: "short", day: "numeric",
    })

  const isSaved = () => property ? saved.some(p => p.Id === property.Id) : false

  const toggleSave = () => {
    if (!property) return

    const updated = isSaved()
      ? saved.filter(p => p.Id !== property.Id)
      : [...saved, property]

    setSaved(updated)
    localStorage.setItem("savedProperties", JSON.stringify(updated))
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

  return (
    <main className="container max-w-screen-lg mx-auto px-4 py-8">
      <Button onClick={() => router.push("/")} variant="outline" className="mb-6">
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to listings
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-2xl w-2/3 sm:w-full font-semibold">{property.Title}</p>
              <p className="text-sm font-light text-muted-foreground">{property.Location}</p>
            </div>
            <div className="text-right">
              <p className="text-3xl font-light">${property["Sale Price"]?.toLocaleString() ?? "N/A"}</p>
              <p className="text-xs font-light text-muted-foreground">
                Date Listed: {formatDate(property.DateListed)}
              </p>
            </div>
          </div>

          <div className="flex justify-between mb-6">
            <Button onClick={toggleSave} variant={isSaved() ? "default" : "outline"}>
              {isSaved() ? (
                <>
                  <BookmarkCheck className="mr-2 h-4 w-4" /> Saved
                </>
              ) : (
                <>
                  <BookmarkPlus className="mr-2 h-4 w-4" /> Save Property
                </>
              )}
            </Button>

            {saved.length > 0 && (
              <Button onClick={() => setShowModal(true)}>
                 <BookmarkIcon className="h-4 w-4" />
                Saved Properties ({saved.length})
              </Button>
            )}

            {showModal && (
              <SavedPropertiesModal
                savedProperties={saved}
                setSavedProperties={setSaved}
                onClose={() => setShowModal(false)}
              />
            )}
          </div>

          <div className="relative h-[400px] w-full mb-6 bg-muted rounded-lg overflow-hidden">
            <img
              src={property.PictureURL || "/placeholder.svg"}
              alt={property.Title}
              className="object-cover w-full h-full"
            />
          </div>

          <div className="grid grid-cols-5 gap-4 mb-6 text-center">
            {[
              { Icon: Bed, label: "BED", value: property.Bedrooms },
              { Icon: Bath, label: "BATH", value: property.Bathrooms },
              { Icon: Car, label: "PARKING", value: property.Parking },
              { Icon: Home, label: "SQFT", value: property.Sqft },
              { Icon: Calendar, label: "YEAR BUILT", value: property.YearBuilt },
            ].map(({ Icon, label, value }) => (
              <div key={label} className="p-4 bg-muted rounded-lg">
                <Icon className="h-6 w-6 mx-auto mb-2" />
                <p className="font-bold text-xl">{value}</p>
                <p className="text-xs text-muted-foreground">{label}</p>
              </div>
            ))}
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Description</h2>
            <p className="text-muted-foreground">{property.Description}</p>
          </div>
        </div>

        <div className="lg:col-span-1">
          <Card className="p-4 bg-muted">
            <p className="text-xl font-semibold mb-4 text-center">Contact Agent</p>
            <ContactForm />
          </Card>
        </div>
      </div>
    </main>
  )
}
