"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { CheckCircle2 } from "lucide-react"

/**
 * ContactForm Component
 * 
 * A form component for user inquiries about properties.
 * Features client-side validation for all fields and displays success message on submission.
 * 
 * @returns {JSX.Element} Rendered form with input fields for full name, email, phone, and comments
 */
export default function ContactForm() {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    comments: "",
  })

  const [errors, setErrors] = useState<{
    fullName?: string
    email?: string
    phone?: string
    comments?: string
  }>({})

  const [success, setSuccess] = useState(false)

  const isValidEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

  const validateAllFields = () => {
    const newErrors: typeof errors = {}

    if (form.fullName.trim().length < 3) {
      newErrors.fullName = "Must be at least 3 characters."
    }

    if (!isValidEmail(form.email)) {
      newErrors.email = "Please enter a valid email address."
    }

    if (!/^\d{8,}$/.test(form.phone)) {
      newErrors.phone = "Must contain at least 8 digits and only numbers."
    }

    if (form.comments.trim().length < 10) {
      newErrors.comments = "Must be at least 10 characters."
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleBlur = () => {
    validateAllFields()
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const isValid = validateAllFields()

    if (!isValid) return

    setTimeout(() => {
      setSuccess(true)
      setForm({ fullName: "", email: "", phone: "", comments: "" })
      setErrors({})
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

      <div>
        <Input
          name="fullName"
          placeholder="Full Name *"
          value={form.fullName}
          onChange={(e) => setForm({ ...form, fullName: e.target.value })}
          onBlur={handleBlur}
          className="bg-white"
          required
        />
        {errors.fullName && (
          <p className="text-xs text-red-600 mt-1 px-2">{errors.fullName}</p>
        )}
      </div>

      <div>
        <Input
          name="email"
          type="email"
          placeholder="Email *"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          onBlur={handleBlur}
          className="bg-white"
          required
        />
        {errors.email && (
          <p className="text-xs text-red-600 mt-1 px-2">{errors.email}</p>
        )}
      </div>

      <div>
        <Input
          name="phone"
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          placeholder="Phone Number *"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
          onBlur={handleBlur}
          className="bg-white"
          required
        />
        {errors.phone && (
          <p className="text-xs text-red-600 mt-1 px-2">{errors.phone}</p>
        )}
      </div>

      <div>
        <Textarea
          name="comments"
          placeholder="Comments *"
          value={form.comments}
          onChange={(e) => setForm({ ...form, comments: e.target.value })}
          onBlur={handleBlur}
          className="bg-white h-32"
          rows={4}
          required
        />
        {errors.comments && (
          <p className="text-xs text-red-600 mt-1 px-2">{errors.comments}</p>
        )}
      </div>

      <Button type="submit" className="w-full mt-4">
        Contact Now
      </Button>
    </form>
  )
}
