'use client'
import { useState } from 'react'
import { supabase } from '../lib/supabaseClient'

export default function ReportPage() {
  const [listingId, setListingId] = useState('')
  const [contact, setContact] = useState('')
  const [reason, setReason] = useState('')

  async function submit(e) {
    e.preventDefault()
    const { error } = await supabase.from('reports').insert([{ listing_id: listingId, reporter_contact: contact, reason }])
    if (error) return alert('Error: ' + error.message)
    alert('Thanks for the report. We will review it.')
    setListingId(''); setContact(''); setReason('')
  }

  return (
    <div className="max-w-lg mx-auto">
      <h1 className="text-2xl font-semibold mb-4">Report listing</h1>
      <form onSubmit={submit} className="card space-y-3">
        <input className="input" placeholder="Listing ID" value={listingId} onChange={e=>setListingId(e.target.value)} />
        <input className="input" placeholder="Your email or phone (optional)" value={contact} onChange={e=>setContact(e.target.value)} />
        <textarea className="input" placeholder="Reason" value={reason} onChange={e=>setReason(e.target.value)} />
        <button className="btn">Send report</button>
      </form>
      <p className="mt-4 text-sm muted">Tip: in MVP you can copy the listing ID from Supabase dashboard.</p>
    </div>
  )
}
