import { NextResponse } from "next/server"
import fs from "fs"
import path from "path"

/**
 * GET Handler for single property by ID
 * 
 * Retrieves a specific property listing from the data file based on its ID.
 * Serves as the endpoint for fetching individual property details.
 * 
 * @param {Request} _ - The request object (unused)
 * @param {Object} context - The route context object
 * @param {Object} context.params - The route parameters
 * @param {string} context.params.id - The property ID to retrieve
 * @returns {Promise<NextResponse>} JSON response with property data or error message
 */
export async function GET(_: Request, context: { params: { id: string } }) {
  const { id } = await context.params
  try {
    const file = path.join(process.cwd(), "data/listings.json")
    const data = fs.readFileSync(file, "utf8")
    const properties = JSON.parse(data)

    const property = properties.find((p: any) => p.Id === parseInt(id))

    if (!property) {
      return NextResponse.json({ error: "Property not found" }, { status: 404 })
    }

    return NextResponse.json(property)
  } catch (err) {
    console.error("Read error:", err)
    return NextResponse.json({ error: "Failed to fetch property" }, { status: 500 })
  }
}
