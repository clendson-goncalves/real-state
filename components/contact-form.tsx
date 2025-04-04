"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CheckCircle2 } from "lucide-react"

export default function ContactForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    comments: "",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [success, setSuccess] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSuccess(false)

    // Simple validation
    const newErrors: Record<string, string> = {}

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required"
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address"
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required"
    } else if (!/^[0-9]+$/.test(formData.phone)) {
      newErrors.phone = "Phone number should contain only digits"
    }

    if (!formData.comments.trim()) {
      newErrors.comments = "Please enter your message"
    }

    setErrors(newErrors)

    // If no errors, submit the form
    if (Object.keys(newErrors).length === 0) {
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
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
      {success && (
        <Alert className="bg-green-50 text-green-800 border-green-200">
          <CheckCircle2 className="h-4 w-4 text-green-600" />
          <AlertDescription>Message sent successfully!</AlertDescription>
        </Alert>
      )}

      <div className="space-y-2">
        <Label htmlFor="fullName">
          Full Name <span className="text-red-500">*</span>
        </Label>
        <Input id="fullName" name="fullName" value={formData.fullName} onChange={handleChange} />
        {errors.fullName && <p className="text-sm text-red-500">{errors.fullName}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">
          Email <span className="text-red-500">*</span>
        </Label>
        <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} />
        {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone">
          Phone Number <span className="text-red-500">*</span>
        </Label>
        <Input id="phone" name="phone" type="tel" value={formData.phone} onChange={handleChange} />
        {errors.phone && <p className="text-sm text-red-500">{errors.phone}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="comments">
          Comments <span className="text-red-500">*</span>
        </Label>
        <Textarea id="comments" name="comments" value={formData.comments} onChange={handleChange} rows={4} />
        {errors.comments && <p className="text-sm text-red-500">{errors.comments}</p>}
      </div>

      <Button type="submit" className="w-full">
        Contact Now
      </Button>
    </form>
  )
}

