"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { CheckCircle2 } from "lucide-react"

export default function ContactForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    comments: "",
  })
  const [success, setSuccess] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Simple validation
    if (!formData.fullName.trim() || !formData.email.trim() || !formData.phone.trim() || !formData.comments.trim()) {
      return
    }

    // Simulate form submission
    setTimeout(() => {
      setSuccess(true)
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        comments: "",
      })
    }, 500)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
      {success && (
        <div className="text-sm bg-green-50 text-green-800 border border-green-200 p-3 rounded flex items-center">
          <CheckCircle2 className="h-4 w-4 text-green-600 mr-2" />
          <span>Message sent successfully.</span>
        </div>
      )}

      <div className="space-y-2">
        <Input id="fullName" name="fullName" className="bg-white" placeholder="Full Name *" value={formData.fullName} onChange={handleChange} required />
      </div>

      <div className="space-y-2">
        <Input id="email" name="email" className="bg-white" placeholder="Email *" type="email" value={formData.email} onChange={handleChange} required />
      </div>

      <div className="space-y-2">
        <Input id="phone" name="phone" className="bg-white" placeholder="Phone Number *" type="tel" value={formData.phone} onChange={handleChange} required />
      </div>

      <div className="space-y-2">
        <Textarea id="comments" name="comments" className="bg-white" placeholder="Comments *" value={formData.comments} onChange={handleChange} rows={4} required />
      </div>

      <Button type="submit" className="w-full">
        Contact Now
      </Button>
    </form>
  )
}

