export const metadata = {
  title: 'Pet Marketplace',
  description: 'Simple Latvian pet marketplace',
}

import './globals.css'
import Link from 'next/link'

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <header className="border-b bg-white">
          <nav className="container py-4 flex gap-4 items-center">
            <Link href="/" className="font-semibold">PetMarket</Link>
            <div className="ml-auto flex gap-3">
              <Link href="/post" className="btn">Post listing</Link>
              <Link href="/legal/terms" className="text-sm">Terms</Link>
              <Link href="/legal/privacy" className="text-sm">Privacy</Link>
            </div>
          </nav>
        </header>
        <main className="container py-6">{children}</main>
        <footer className="container py-10 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} PetMarket — A simple classifieds site. Not the seller of listed animals.
        </footer>
      </body>
    </html>
  )
}
