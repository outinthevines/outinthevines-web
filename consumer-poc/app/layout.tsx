import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Out in the Vines — Consumer POC',
  description: 'Mobile-first OITV consumer experience proof of concept'
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
