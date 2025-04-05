"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { CheckCircle2 } from "lucide-react"

export default function ContactForm() {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    comments: "",
  })
  const [success, setSuccess] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const isValid = Object.values(form).every(v => v.trim())
    if (!isValid) return

    setTimeout(() => {
      setSuccess(true)
      setForm({ fullName: "", email: "", phone: "", comments: "" })
    }, 500)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
      {success && (
        <div className="flex items-center p-3 text-sm bg-green-50 text-green-800 border border-green-200 rounded">
          <CheckCircle2 className="h-4 w-4 mr-2 text-green-600" />
          Message sent successfully.
        </div>
      )}

      <Input
        id="fullName"
        name="fullName"
        placeholder="Full Name *"
        value={form.fullName}
        onChange={handleChange}
        className="bg-white"
        required
      />

      <Input
        id="email"
        name="email"
        type="email"
        placeholder="Email *"
        value={form.email}
        onChange={handleChange}
        className="bg-white"
        required
      />

      <Input
        id="phone"
        name="phone"
        type="tel"
        placeholder="Phone Number *"
        value={form.phone}
        onChange={handleChange}
        className="bg-white"
        required
      />

      <Textarea
        id="comments"
        name="comments"
        placeholder="Comments *"
        value={form.comments}
        onChange={handleChange}
        className="bg-white"
        rows={4}
        required
      />

      <Button type="submit" className="w-full">
        Contact Now
      </Button>
    </form>
  )
}
