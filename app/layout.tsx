import './globals.css'
import './clerk.css'
import './prism.css'

import { ClerkProvider } from '@clerk/nextjs'
import type { Metadata, Viewport } from 'next'
import Script from 'next/script'

import { ThemeProvider } from '~/app/(main)/ThemeProvider'
import { url } from '~/lib'
import { zhCN } from '~/lib/clerkLocalizations'
import { sansFont } from '~/lib/font'
import { seo } from '~/lib/seo'

export const metadata: Metadata = {
  metadataBase: seo.url,
  icons: {
    icon: [{ url: '/favicon.png', type: 'image/png', sizes: 'any' }],
    apple: [{ url: '/favicon.png', type: 'image/png', sizes: '180x180' }],
    shortcut: '/favicon.png',
  },
  title: {
    template: '%s | Akring',
    default: seo.title,
  },
  description: seo.description,
  keywords: 'Akring,独立开发者,创作者,细节控,长期主义者,macOS,iOS',
  manifest: '/site.webmanifest',
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
  openGraph: {
    title: {
      default: seo.title,
      template: '%s | Akring',
    },
    description: seo.description,
    siteName: 'Akring',
    locale: 'zh_CN',
    type: 'website',
    url: 'https://akring.com',
  },
  twitter: {
    site: '@ddflj3310',
    creator: '@ddflj3310',
    card: 'summary_large_image',
    title: seo.title,
    description: seo.description,
  },
  alternates: {
    canonical: url('/'),
    types: {
      'application/rss+xml': [{ url: 'rss', title: 'RSS 订阅' }],
    },
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: dark)', color: '#000212' },
    { media: '(prefers-color-scheme: light)', color: '#fafafa' },
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <ClerkProvider localization={zhCN}>
      <html
        lang="zh-CN"
        className={`${sansFont.variable} m-0 h-full p-0 font-sans antialiased`}
        suppressHydrationWarning
      >
        <head>
          <Script
            src="https://umami.akring.com/script.js"
            data-website-id="671cd127-5a59-4867-ad25-0da9bc110a67"
            strategy="lazyOnload"
          />
          <Script
            src="https://ackee.akring.com/tracker.js"
            data-ackee-server="https://ackee.akring.com"
            data-ackee-domain-id="4980de88-47e9-4ddf-b0e9-dfa5b38c713e"
            strategy="lazyOnload"
          />
          {/* WebMCP: expose site tools to AI agents integrated into the browser */}
          <Script
            id="webmcp-tools"
            strategy="lazyOnload"
            dangerouslySetInnerHTML={{
              __html: `
                if (typeof navigator !== 'undefined' && navigator.modelContext) {
                  navigator.modelContext.provideContext({
                    tools: [
                      {
                        name: 'get_blog_posts',
                        description: 'Get recent blog posts and articles from akring.com',
                        inputSchema: { type: 'object', properties: {} },
                        execute: async () => {
                          const res = await fetch('/api/activity');
                          return res.json();
                        }
                      },
                      {
                        name: 'get_page_as_markdown',
                        description: 'Get the homepage content as markdown',
                        inputSchema: { type: 'object', properties: {} },
                        execute: async () => {
                          const res = await fetch('/api/markdown');
                          return res.text();
                        }
                      }
                    ]
                  }).catch(() => {});
                }
              `,
            }}
          />
        </head>
        <body className="flex h-full flex-col">
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}
