'use client'
import { useState } from 'react'
import { supabase } from '../../lib/supabaseClient'

export default function PostPage() {
  const [title, setTitle] = useState('')
  const [species, setSpecies] = useState('dog')
  const [name, setName] = useState('')
  const [contact, setContact] = useState('')
  const [agree, setAgree] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    if (!agree) return alert('You must confirm compliance.')
    if (!name || !contact) return alert('Please enter your name and contact.')

    const { data: sellers } = await supabase
      .from('sellers')
      .select('*')
      .eq('contact', contact)
      .limit(1)
    let seller_id = sellers?.[0]?.id
    if (!seller_id) {
      const { data: sInsert } = await supabase
        .from('sellers')
        .insert([{ name, contact }])
        .select()
      seller_id = sInsert[0].id
    }

    await supabase.from('listings').insert([{ seller_id, title, species, published: true }])
    alert('Listing published!')
    window.location.href = '/'
  }

  return (
    <div className="max-w-xl mx-auto">
      <h1 className="text-2xl font-semibold mb-4">Post a listing</h1>
      <form onSubmit={handleSubmit} className="space-y-3 bg-white p-4 rounded-xl shadow">
        <input className="w-full border rounded-md px-3 py-2" placeholder="Title" value={title} onChange={e=>setTitle(e.target.value)} />
        <select className="w-full border rounded-md px-3 py-2" value={species} onChange={e=>setSpecies(e.target.value)}>
          <option value="dog">Dog</option>
          <option value="cat">Cat</option>
          <option value="other">Other</option>
        </select>
        <input className="w-full border rounded-md px-3 py-2" placeholder="Your name" value={name} onChange={e=>setName(e.target.value)} />
        <input className="w-full border rounded-md px-3 py-2" placeholder="Email or phone" value={contact} onChange={e=>setContact(e.target.value)} />
        <label className="flex items-start gap-2 text-sm">
          <input type="checkbox" checked={agree} onChange={e=>setAgree(e.target.checked)} />
          <span>I confirm this animal is microchipped, vaccinated (if applicable), registered according to Latvian law, and meets the legal age for sale. I understand I am responsible for compliance and that the platform is only a classifieds service.</span>
        </label>
        <button className="px-4 py-2 bg-black text-white rounded-md">Publish</button>
      </form>
    </div>
  )
}
