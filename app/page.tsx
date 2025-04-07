"use client"

import { useState, useEffect } from "react"
import type { PropertyType } from "@/types/property"
import PropertyList from "@/components/PropertyList"
import FilterSection from "@/components/FilterSection"
import SavedPropertiesModal from "@/components/SavedPropertiesModal"
import { Button } from "@/components/ui/button"
import { BookmarkIcon } from "lucide-react"

/**
 * Home Page Component
 * 
 * The main page of the application displaying property listings with filtering capabilities.
 * Filters include bedrooms, bathrooms, parking, and price range.
 * The Card component is used to display the property listings.
 * The property details page is a separate page that displays detailed information about a specific property.
 * 
 * Additional features:
 * The main page has a Saved Properties button that opens a modal with the saved properties.
 * In the Card component, the property image is displayed as a link to the property details page.
 * In the Card was added a button to save the property.
 * 
 * @returns {JSX.Element} The rendered homepage with filters and property listings
 */
export default function Home() {
  const [properties, setProperties] = useState<PropertyType[]>([])
  const [filtered, setFiltered] = useState<PropertyType[]>([])
  const [saved, setSaved] = useState<PropertyType[]>([])
  const [showModal, setShowModal] = useState(false)
  const [filters, setFilters] = useState({
    bedrooms: 1,
    bathrooms: 1,
    parking: 1,
    priceRange: [100000, 800000],
  })

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/properties")
        const data = await res.json()
        setProperties(data)
        setFiltered(data)
      } catch (err) {
        console.error("Fetch error:", err)
      }
    }

    const loadSaved = () => {
      const savedData = localStorage.getItem("savedProperties")
      if (savedData) setSaved(JSON.parse(savedData))
    }

    fetchData()
    loadSaved()
  }, [])

  const handleSearch = () => {
    const results = properties.filter(p =>
      p.Bedrooms >= filters.bedrooms &&
      p.Bathrooms >= filters.bathrooms &&
      p.Parking >= filters.parking &&
      p["Sale Price"] >= filters.priceRange[0] &&
      p["Sale Price"] <= filters.priceRange[1]
    )

    setFiltered(results)
  }

  return (
    <main className="container max-w-screen-lg mx-auto px-4 py-8">
      <div className="flex justify-end">
        {saved.length > 0 && (
          <Button onClick={() => setShowModal(true)} variant="outline" className="flex items-center">
            <BookmarkIcon className="h-4 w-4" />
            Saved Properties ({saved.length})
          </Button>
        )}
      </div>

      <FilterSection filters={filters} setFilters={setFilters} onSearch={handleSearch} />

      <PropertyList
        properties={filtered}
        savedProperties={saved}
        setSavedProperties={setSaved}
      />

      {showModal && (
        <SavedPropertiesModal
          savedProperties={saved}
          setSavedProperties={setSaved}
          onClose={() => setShowModal(false)}
        />
      )}
    </main>
  )
}
