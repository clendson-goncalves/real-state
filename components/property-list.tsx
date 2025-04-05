import type { PropertyType } from "@/types/property"
import PropertyCard from "@/components/property-card"

interface PropertyListProps {
  properties: PropertyType[]
  savedProperties: PropertyType[]
  setSavedProperties: React.Dispatch<React.SetStateAction<PropertyType[]>>
}

export default function PropertyList({
  properties,
  savedProperties,
  setSavedProperties,
}: PropertyListProps) {
  if (!properties.length) {
    return (
      <div className="text-center py-10">
        <p>No properties found matching your criteria.</p>
      </div>
    )
  }

  const toggleSave = (property: PropertyType) => {
    const isSaved = savedProperties.some((p) => p.Id === property.Id)
    const updated = isSaved
      ? savedProperties.filter((p) => p.Id !== property.Id)
      : [...savedProperties, property]

    setSavedProperties(updated)
    localStorage.setItem("savedProperties", JSON.stringify(updated))
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {properties.map((property) => (
        <PropertyCard
          key={property.Id}
          property={property}
          isSaved={savedProperties.some((p) => p.Id === property.Id)}
          onToggleSave={() => toggleSave(property)}
        />
      ))}
    </div>
  )
}
