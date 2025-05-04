'use client'

import React, { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'

export default function ContactDetailsPage() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    services: '',
    lastVisit: '',
    email: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = () => {
    if (!formData.name || !formData.phone || !formData.services || !formData.lastVisit) {
      alert('Please fill all required fields.')
      return
    }

    console.log('Form Data:', formData)
    alert('Customer data submitted!')
  }

  const handleClear = () => {
    setFormData({
      name: '',
      phone: '',
      services: '',
      lastVisit: '',
      email: '',
    })
  }

  return (
    <main className="flex justify-center items-center min-h-screen bg-gray-50 px-4">
      <Card className="w-full max-w-xl p-6 shadow-xl">
        <h2 className="text-2xl font-bold mb-6 text-center">Add Customer Details</h2>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="name">Name *</Label>
            <Input id="name" name="name" value={formData.name} onChange={handleChange} placeholder="Customer name" />
          </div>
          <div>
            <Label htmlFor="phone">Phone Number *</Label>
            <Input id="phone" name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone number" />
          </div>
          <div>
            <Label htmlFor="services">Services Availed *</Label>
            <Input id="services" name="services" value={formData.services} onChange={handleChange} placeholder="Haircut, Facial, etc." />
          </div>
          <div>
            <Label htmlFor="lastVisit">Last Visit Date *</Label>
            <Input id="lastVisit" type="date" name="lastVisit" value={formData.lastVisit} onChange={handleChange} />
          </div>
          <div>
            <Label htmlFor="email">Email (optional)</Label>
            <Input id="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email address" />
          </div>
          <div className="flex justify-between pt-4">
            <Button onClick={handleSubmit}>Submit</Button>
            <Button variant="secondary" onClick={handleClear}>Clear</Button>
          </div>
        </CardContent>
      </Card>
    </main>
  )
}
