"use client"

import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Search } from "lucide-react"

interface FilterSectionProps {
  filters: {
    bedrooms: number
    bathrooms: number
    parking: number
    priceRange: number[]
  }
  setFilters: React.Dispatch<
    React.SetStateAction<{
      bedrooms: number
      bathrooms: number
      parking: number
      priceRange: number[]
    }>
  >
  onSearch: () => void
}

export default function FilterSection({ filters, setFilters, onSearch }: FilterSectionProps) {
  const formatPrice = (value: number) => {
    return `$${value.toLocaleString()}`
  }

  return (
    <div className="bg-white p-4 rounded-lg shadow mb-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
        <div>
          <Label htmlFor="bedrooms" className="mb-2 block">
            Bedrooms:
          </Label>
          <select
            id="bedrooms"
            className="w-full p-2 border rounded"
            value={filters.bedrooms}
            onChange={(e) => setFilters({ ...filters, bedrooms: Number(e.target.value) })}
          >
            {[1, 2, 3, 4, 5].map((num) => (
              <option key={`bed-${num}`} value={num}>
                {num}+
              </option>
            ))}
          </select>
        </div>

        <div>
          <Label htmlFor="bathrooms" className="mb-2 block">
            Bathrooms:
          </Label>
          <select
            id="bathrooms"
            className="w-full p-2 border rounded"
            value={filters.bathrooms}
            onChange={(e) => setFilters({ ...filters, bathrooms: Number(e.target.value) })}
          >
            {[1, 2, 3, 4, 5].map((num) => (
              <option key={`bath-${num}`} value={num}>
                {num}+
              </option>
            ))}
          </select>
        </div>

        <div>
          <Label htmlFor="parking" className="mb-2 block">
            Parking:
          </Label>
          <select
            id="parking"
            className="w-full p-2 border rounded"
            value={filters.parking}
            onChange={(e) => setFilters({ ...filters, parking: Number(e.target.value) })}
          >
            {[1, 2, 3, 4, 5, 6].map((num) => (
              <option key={`park-${num}`} value={num}>
                {num}+
              </option>
            ))}
          </select>
        </div>

        <div>
          <Button onClick={onSearch} className="w-full" variant="default">
            <Search className="h-4 w-4 mr-2" />
            Search
          </Button>
        </div>

        <div className="md:col-span-4 space-y-6">
          <div>
            <Label className="mb-2 block">
              Price Range: {formatPrice(filters.priceRange[0])} - {formatPrice(filters.priceRange[1])}
            </Label>
            <Slider
              min={100000}
              max={800000}
              step={10000}
              value={filters.priceRange}
              onValueChange={(value) => setFilters({ ...filters, priceRange: value })}
              className="my-4"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

