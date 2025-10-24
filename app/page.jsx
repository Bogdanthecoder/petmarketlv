'use client'
import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'
import ListingCard from '../components/ListingCard'

export default function HomePage() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false
    const load = async () => {
      const { data, error } = await supabase
        .from('listings')
        .select('*')
        .eq('published', true)
        .order('created_at', { ascending: false })
        .limit(50)
      if (!cancelled) {
        setItems(data || [])
        setLoading(false)
      }
    }
    load()
    return () => { cancelled = true }
  }, [])

  if (loading) return <p>Loading…</p>

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {items.map(item => <ListingCard key={item.id} listing={item} />)}
      {items.length === 0 && <p>No listings yet. Be the first to post!</p>}
    </div>
  )
}
