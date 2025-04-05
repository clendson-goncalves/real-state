"use client"

import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Search } from "lucide-react"

type Filters = {
  bedrooms: number
  bathrooms: number
  parking: number
  priceRange: number[]
}

interface FilterSectionProps {
  filters: Filters
  setFilters: React.Dispatch<React.SetStateAction<Filters>>
  onSearch: () => void
}

export default function FilterSection({ filters, setFilters, onSearch }: FilterSectionProps) {
  const formatPrice = (value: number) => `$${value.toLocaleString()}`

  const handleChange = (key: keyof typeof filters) => (e: React.ChangeEvent<HTMLSelectElement>) =>
    setFilters({ ...filters, [key]: Number(e.target.value) })

  const renderSelect = (
    id: string,
    label: string,
    key: keyof typeof filters,
    options: number[]
  ) => (
    <div className="grid grid-cols-2 items-baseline">
      <Label htmlFor={id} className="justify-end px-2">
        {label}:
      </Label>
      <select
        id={id}
        className="w-3/4 p-2 border rounded-md"
        value={filters[key] as number}
        onChange={handleChange(key)}
      >
        {options.map((n) => (
          <option key={n} value={n}>
            {n}+
          </option>
        ))}
      </select>
    </div>
  )

  return (
    <div className="py-4 mb-8">
      <div className="grid grid-cols-3 md:grid-cols-6 space-y-4 px-6 md:px-4 items-center font-light text-sm">
        {renderSelect("bedrooms", "Bedrooms", "bedrooms", [1, 2, 3, 4, 5])}
        {renderSelect("bathrooms", "Bathrooms", "bathrooms", [1, 2, 3, 4, 5])}
        {renderSelect("parking", "Parking", "parking", [1, 2, 3, 4, 5, 6])}

        <div className="col-span-2 md:col-span-2">
          <Label className="px-2">
            Price Range: {formatPrice(filters.priceRange[0])} - {formatPrice(filters.priceRange[1])}
          </Label>
          <Slider
            min={100000}
            max={800000}
            step={10000}
            value={filters.priceRange}
            onValueChange={(val) => setFilters({ ...filters, priceRange: val })}
            className="my-4 w-[95%]"
          />
        </div>

        <div>
          <Button onClick={onSearch} className="w-full">
            <Search className="h-4 w-4 mr-2" />
            Search
          </Button>
        </div>
      </div>
    </div>
  )
}
