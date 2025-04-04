"use client"

import { useState, useEffect } from "react"
import type { PropertyType } from "@/types/property"
import PropertyList from "@/components/property-list"
import FilterSection from "@/components/filter-section"
import SavedPropertiesModal from "@/components/saved-properties-modal"
import { Button } from "@/components/ui/button"
import { BookmarkIcon } from "lucide-react"

export default function Home() {
  const [properties, setProperties] = useState<PropertyType[]>([])
  const [filteredProperties, setFilteredProperties] = useState<PropertyType[]>([])
  const [savedProperties, setSavedProperties] = useState<PropertyType[]>([])
  const [showSavedModal, setShowSavedModal] = useState(false)
  const [filters, setFilters] = useState({
    bedrooms: 1,
    bathrooms: 1,
    parking: 1,
    priceRange: [100000, 800000],
  })

  // Fetch properties data and load saved properties
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await fetch("/api/properties")
        const data = await response.json()
        setProperties(data)
        setFilteredProperties(data)
      } catch (error) {
        console.error("Error fetching properties:", error)
      }
    }

    const loadSavedProperties = () => {
      const saved = localStorage.getItem("savedProperties")
      if (saved) {
        setSavedProperties(JSON.parse(saved))
      }
    }

    fetchProperties()
    loadSavedProperties()
  }, [])

  // Apply filters
  const handleSearch = () => {
    const filtered = properties.filter((property) => {
      return (
        property.Bedrooms >= filters.bedrooms &&
        property.Bathrooms >= filters.bathrooms &&
        property.Parking >= filters.parking &&
        property["Sale Price"] >= filters.priceRange[0] &&
        property["Sale Price"] <= filters.priceRange[1]
      )
    })

    setFilteredProperties(filtered)
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Real Estate Listings</h1>
        {savedProperties.length > 0 && (
          <Button onClick={() => setShowSavedModal(true)} variant="outline" className="flex items-center gap-2">
            <BookmarkIcon className="h-4 w-4" />
            Saved ({savedProperties.length})
          </Button>
        )}
      </div>

      <FilterSection filters={filters} setFilters={setFilters} onSearch={handleSearch} />

      <PropertyList
        properties={filteredProperties}
        savedProperties={savedProperties}
        setSavedProperties={setSavedProperties}
      />

      {showSavedModal && (
        <SavedPropertiesModal
          savedProperties={savedProperties}
          setSavedProperties={setSavedProperties}
          onClose={() => setShowSavedModal(false)}
        />
      )}
    </main>
  )
}

