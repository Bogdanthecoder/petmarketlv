'use client'
import { supabase } from '@/lib/supabaseClient'
import { useState, useEffect } from 'react'

export default function ListingCard({ listing }) {
  const [images, setImages] = useState([])

  useEffect(() => {
    let cancelled = false
    const load = async () => {
      const { data } = await supabase
        .from('listing_images')
        .select('*')
        .eq('listing_id', listing.id)
        .limit(1)
      if (!cancelled) setImages(data || [])
    }
    load()
    return () => { cancelled = true }
  }, [listing.id])

  const imgPath = images?.[0]?.path
  const imgUrl = imgPath
    ? `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/listing-images/${imgPath}`
    : 'https://placehold.co/600x400?text=No+image'

  return (
    <div className="card">
      <img src={imgUrl} alt={listing.title} className="w-full h-56 object-cover rounded-md mb-3" />
      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-semibold text-lg">{listing.title}</h3>
          <p className="text-sm muted">{listing.species}{listing.breed ? ` • ${listing.breed}` : ''} • {listing.age_weeks ? `${listing.age_weeks}w` : 'age n/a'}</p>
          <p className="mt-1">{listing.price ? `${listing.price} €` : 'Price on request'}</p>
          <p className="text-sm muted">{listing.location || '—'}</p>
        </div>
      </div>
    </div>
  )
}
