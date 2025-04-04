import { NextResponse } from "next/server"
import fs from "fs"
import path from "path"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const filePath = path.join(process.cwd(), "data/listings.json")
    const fileContents = fs.readFileSync(filePath, "utf8")
    const properties = JSON.parse(fileContents)

    const property = properties.find((p: any) => p.Id === Number.parseInt(params.id))

    if (!property) {
      return NextResponse.json({ error: "Property not found" }, { status: 404 })
    }

    return NextResponse.json(property)
  } catch (error) {
    console.error("Error reading property data:", error)
    return NextResponse.json({ error: "Failed to fetch property" }, { status: 500 })
  }
}

