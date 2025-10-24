'use client'
import { useState } from 'react'
import { supabase } from '../../lib/supabaseClient'

export default function ReportPage() {
  const [listingId, setListingId] = useState('')
  const [contact, setContact] = useState('')
  const [reason, setReason] = useState('')

  async function submit(e) {
    e.preventDefault()

    if (!listingId.trim() || !reason.trim()) {
      alert('Please fill in the listing ID and reason.')
      return
    }

    const { error } = await supabase.from('reports').insert([
      {
        listing_id: listingId.trim(),
        reporter_contact: contact.trim() || null,
        reason: reason.trim(),
      },
    ])

    if (error) {
      console.error(error)
      alert('Something went wrong. Try again.')
      return
    }

    alert('Thanks for the report — we’ll review it soon.')
    setListingId('')
    setContact('')
    setReason('')
  }

  return (
    <div className="max-w-lg mx-auto">
      <h1 className="text-2xl font-semibold mb-4">Report a Listing</h1>
      <form
        onSubmit={submit}
        className="bg-white rounded-xl shadow p-4 space-y-3"
      >
        <input
          className="w-full border rounded-md px-3 py-2"
          placeholder="Listing ID"
          value={listingId}
          onChange={(e) => setListingId(e.target.value)}
        />
        <input
          className="w-full border rounded-md px-3 py-2"
          placeholder="Your contact (optional)"
          value={contact}
          onChange={(e) => setContact(e.target.value)}
        />
        <textarea
          className="w-full border rounded-md px-3 py-2"
          rows="4"
          placeholder="Reason for report"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
        />
        <button
          className="px-4 py-2 bg-black text-white rounded-md hover:opacity-90"
          type="submit"
        >
          Send Report
        </button>
      </form>
      <p className="text-sm text-gray-500 mt-3">
        Tip: you can find the listing ID in the URL or from the admin panel.
      </p>
    </div>
  )
}
