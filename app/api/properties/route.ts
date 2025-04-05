import { NextResponse } from "next/server"
import fs from "fs"
import path from "path"

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