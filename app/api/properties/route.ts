import { NextResponse } from "next/server"
import fs from "fs"
import path from "path"

/**
 * GET Handler for all properties
 * 
 * Retrieves all property listings from the data file.
 * Serves as the endpoint for fetching the complete property catalog.
 * 
 * @returns {Promise<NextResponse>} JSON response with array of all properties or error message
 */
export async function GET() {
  try {
    const file = path.join(process.cwd(), "data/listings.json")
    const data = JSON.parse(fs.readFileSync(file, "utf8"))
    return NextResponse.json(data)
  } catch (err) {
    console.error("Read error:", err)
    return NextResponse.json({ error: "Failed to fetch properties" }, { status: 500 })
  }
}