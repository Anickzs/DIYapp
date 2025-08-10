import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Toaster } from 'react-hot-toast'
import { Providers } from '@/components/providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'AI Build Planner - Custom DIY Plans for Any Space',
  description: 'Transform any space and materials into custom DIY build plans with AI. Get step-by-step instructions, shopping lists, and tool requirements for your perfect project.',
  keywords: 'DIY, woodworking, build plans, AI, home improvement, furniture, custom plans',
  authors: [{ name: 'AI Build Planner' }],
  creator: 'AI Build Planner',
  publisher: 'AI Build Planner',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://aibuildplanner.com'),
  openGraph: {
    title: 'AI Build Planner - Custom DIY Plans for Any Space',
    description: 'Transform any space and materials into custom DIY build plans with AI.',
    url: 'https://aibuildplanner.com',
    siteName: 'AI Build Planner',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'AI Build Planner - Custom DIY Plans',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Build Planner - Custom DIY Plans for Any Space',
    description: 'Transform any space and materials into custom DIY build plans with AI.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="h-full">
      <body className={`${inter.className} h-full`}>
        <Providers>
          {children}
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: '#363636',
                color: '#fff',
              },
              success: {
                duration: 3000,
                iconTheme: {
                  primary: '#22c55e',
                  secondary: '#fff',
                },
              },
              error: {
                duration: 5000,
                iconTheme: {
                  primary: '#ef4444',
                  secondary: '#fff',
                },
              },
            }}
          />
        </Providers>
      </body>
    </html>
  )
} 