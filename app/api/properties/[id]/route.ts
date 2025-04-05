import { NextResponse } from "next/server"
import fs from "fs"
import path from "path"

export async function GET(_: Request, { params }: { params: { id: string } }) {
  try {
    const file = path.join(process.cwd(), "data/listings.json")
    const data = fs.readFileSync(file, "utf8")
    const properties = JSON.parse(data)

    const property = properties.find((p: any) => p.Id === parseInt(params.id))

    if (!property) {
      return NextResponse.json({ error: "Property not found" }, { status: 404 })
    }

    return NextResponse.json(property)
  } catch (err) {
    console.error("Read error:", err)
    return NextResponse.json({ error: "Failed to fetch property" }, { status: 500 })
  }
}
