import type { Metadata } from 'next'
import './migration.css'

export const metadata: Metadata = {
  title: 'Out in the Vines',
  description: 'An inclusive guide to Temecula wine country.'
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://outinthevines.github.io/outinthevines-web/styles.css" />
      </head>
      <body>{children}</body>
    </html>
  )
}
