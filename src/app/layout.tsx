import type { Metadata } from 'next'
import './globals.css'
import { Layout } from '@/components/Layout/Layout'

export const metadata: Metadata = {
  title: 'AlphaBuddy Pro - Trading Account Manager',
  description: 'Comprehensive trading account management webapp',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="font-sans">
        <Layout>
          {children}
        </Layout>
      </body>
    </html>
  )
}