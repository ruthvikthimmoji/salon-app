'use client'

import React, { useEffect, useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { supabase } from '@/lib/supabase'
import router from 'next/router'



interface Customers {
  id: string
  name: string
  phone: string
  services: string
  lastvisit?: string
  email?: string
  owner_id?: string
}

export default function ContactDetailsPage() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    services: '',
    lastvisit: '',
    email: '',
    owner_id: ''
  })

  const [loading, setLoading] = useState(false)
  const [customers, setCustomers] = useState<Customers[]>([])
  const [filteredCustomers, setFilteredCustomers] = useState<Customers[]>([])
  const [searchText, setSearchText] = useState('')

  useEffect(() => {
    const init = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession()

      if (!session) {
        router.push('/login')
        return
      }

      const owner_id = session.user.id
      setFormData(prev => ({ ...prev, owner_id }))

      const { data, error } = await supabase.rpc('get_unique_customers_by_phone', {
        owner_uuid: owner_id, 
      });
        

      if (error) {
        console.error('Error fetching customers:', error.message)
      } else {
        setCustomers(data || [])
        setFilteredCustomers(data || [])
      }

      setLoading(false)
    }

    setLoading(false)
    init()
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async () => {
    if (!formData.name || !formData.phone || !formData.services || !formData.lastvisit) {
      alert('Please fill all required fields.')
      return
    }

    setLoading(true)

    const session = await supabase.auth.getSession()
    formData.owner_id = session.data.session?.user.id || ''

    const { error } = await supabase.from('customers').insert([formData])
    setLoading(false)

    if (error) {
      console.error('Error inserting data:', error)
      alert('❌ Failed to submit data. Check console for details.')
    } else {
      alert('✅ Customer data submitted successfully!')
      handleClear()
    }
  }

  const handleClear = () => {
    setFormData({
      name: '',
      phone: '',
      services: '',
      lastvisit:'',
      email: '',
      owner_id: formData.owner_id // retain owner_id
    })
  }

  const handleSearchText = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearchText(value)

    const filtered = customers.filter(customer =>
      customer.phone.includes(value))
  
    setFilteredCustomers(filtered)
  }

  const chooseCustomer = (customer: Customer) => {
    setFormData({
      name: customer.name,
      phone: customer.phone,
      services: customer.services,
      lastvisit: '',
      email: customer.email || '',
      owner_id: customer.owner_id || ''
    })
  }

  return (
    <main className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10 min-h-screen bg-gray-50 px-4">
      <Card className="w-full max-w-xl p-6 shadow-xl">
        <h2 className="text-2xl font-bold mb-6 text-center">Add Customer Details</h2>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="name">Name *</Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Customer name"
            />
          </div>
          <div>
            <Label htmlFor="phone">Phone Number *</Label>
            <Input
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Phone number"
            />
          </div>
          <div>
            <Label htmlFor="services">Services Availed *</Label>
            <Input
              id="services"
              name="services"
              value={formData.services}
              onChange={handleChange}
              placeholder="Haircut, Facial, etc."
            />
          </div>
          <div>
            <Label htmlFor="lastvisit">Last Visit Date *</Label>
            <Input
              id="lastvisit"
              type="date"
              name="lastvisit"
              value={formData.lastvisit}
              onChange={handleChange}
            />
          </div>
          <div>
            <Label htmlFor="email">Email (optional)</Label>
            <Input
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email address"
            />
          </div>
          <div className="flex justify-between pt-4">
            <Button onClick={handleSubmit} disabled={loading}>
              {loading ? 'Submitting...' : 'Submit'}
            </Button>
            <Button variant="secondary" onClick={handleClear}>Clear</Button>
          </div>
        </CardContent>
      </Card>

      <div>
        <Card className="p-4 shadow-lg">
          <div className="mb-4">
            <Input
              id="search"
              type="text"
              name="search"
              placeholder="Search by name..."
              value={searchText}
              onChange={handleSearchText}
            />
          </div>

          <div className="bg-white shadow-md rounded-lg overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-gray-100 border-b font-semibold">
                <tr>
                  <th className="py-3 px-4">Name</th>
                  <th className="py-3 px-4">Phone</th>
                  <th className="py-3 px-4">Services</th>
                  <th className="py-3 px-4">Last Visit</th>
                </tr>
              </thead>
              <tbody>
                {filteredCustomers.length > 0 ? (
                  filteredCustomers.map((customer) => (
                    <tr
                      key={customer.id}
                      onClick={() => chooseCustomer(customer)}
                      className="border-b hover:bg-gray-50 cursor-pointer"
                    >
                      <td className="py-3 px-4">{customer.name}</td>
                      <td className="py-3 px-4">{customer.phone}</td>
                      <td className="py-3 px-4">{customer.services}</td>
                      <td className="py-3 px-4">{customer.lastvisit || 'N/A'}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="text-center py-3">No customers available</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </main>
  )
}
