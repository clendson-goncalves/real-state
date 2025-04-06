/**
 * PropertyType Interface
 * 
 * Defines the structure of a property listing in the application.
 * Used across components for type safety and property data representation.
 * 
 * @interface PropertyType
 * @property {number} Id - Unique identifier for the property
 * @property {string} DateListed - Date when the property was listed
 * @property {string} Title - Property title or name
 * @property {string} Description - Detailed description of the property
 * @property {number} "Sale Price" - Property price in dollars
 * @property {string} ThumbnailURL - URL to the property thumbnail image
 * @property {string} PictureURL - URL to the full-size property image
 * @property {string} Location - Property location or address
 * @property {number} Sqft - Square footage of the property
 * @property {number} Bedrooms - Number of bedrooms
 * @property {number} Bathrooms - Number of bathrooms
 * @property {number} Parking - Number of parking spaces
 * @property {number} YearBuilt - Year the property was built
 */
export interface PropertyType {
  Id: number
  DateListed: string
  Title: string
  Description: string
  "Sale Price": number
  ThumbnailURL: string
  PictureURL: string
  Location: string
  Sqft: number
  Bedrooms: number
  Bathrooms: number
  Parking: number
  YearBuilt: number
}

