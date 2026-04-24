export const runtime = 'edge'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://akring.com'

export function GET() {
  const catalog = {
    linkset: [
      {
        anchor: `${siteUrl}/api`,
        'service-doc': [{ href: `${siteUrl}/about`, type: 'text/html' }],
        item: [
          { href: `${siteUrl}/api/activity`, type: 'application/json' },
          { href: `${siteUrl}/api/reactions`, type: 'application/json' },
          { href: `${siteUrl}/api/guestbook`, type: 'application/json' },
          { href: `${siteUrl}/feed.xml`, type: 'application/rss+xml' },
        ],
      },
    ],
  }

  return new Response(JSON.stringify(catalog), {
    headers: {
      'Content-Type': 'application/linkset+json',
      'Cache-Control': 'public, max-age=3600',
    },
  })
}
