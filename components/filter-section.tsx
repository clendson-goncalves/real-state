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
    <div className="py-4 mb-8">
      <div className="grid grid-cols-3 md:grid-cols-6 space-y-4 px-6 md:px-4 items-center font-light text-sm">

        <div className="grid grid-cols-2 items-baseline">
          <Label htmlFor="bedrooms" className="justify-end px-2">
            Bedrooms:
          </Label>
          <select
            id="bedrooms"
            className="w-3/4 p-2 border rounded-md"
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

        <div className="grid grid-cols-2 items-baseline">
          <Label htmlFor="bathrooms" className="justify-end px-2">
            Bathrooms:
          </Label>
          <select
            id="bathrooms"
            className="w-3/4 p-2 border rounded-md"
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

        <div className="grid grid-cols-2 items-baseline">
          <Label htmlFor="parking" className="justify-end px-2">
            Parking:
          </Label>
          <select
            id="parking"
            className="w-3/4 p-2 border rounded-md"
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

          <div className="col-span-2 md:col-span-2">
            <Label className="px-2">
              Price Range: {formatPrice(filters.priceRange[0])} - {formatPrice(filters.priceRange[1])}
            </Label>
            <Slider
              min={100000}
              max={800000}
              step={10000}
              value={filters.priceRange}
              onValueChange={(value) => setFilters({ ...filters, priceRange: value })}
              className="my-4 w-[95%]"
            />
          </div>
        <div>
          <Button onClick={onSearch} className="w-full" variant="default">
            <Search className="h-4 w-4 mr-2" />
            Search
          </Button>
        </div>

      </div>
    </div>
  )
}

