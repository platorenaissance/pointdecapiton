import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Point de Capiton - Infinite Animation',
  description: 'A smooth, responsive website featuring an infinite video animation',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
