export const runtime = 'edge'

function getClerkDomain(): string | null {
  const key = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
  if (!key) return null
  const parts = key.split('_')
  if (parts.length < 3) return null
  try {
    const decoded = atob(parts[2])
    return decoded.replace(/\$$/, '').trim()
  } catch {
    return null
  }
}

export function GET() {
  const clerkDomain = getClerkDomain()
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://akring.com'
  const issuer = clerkDomain ? `https://${clerkDomain}` : siteUrl

  return Response.json(
    {
      resource: siteUrl,
      authorization_servers: [issuer],
      scopes_supported: ['openid', 'profile', 'email'],
      bearer_methods_supported: ['header'],
    },
    { headers: { 'Cache-Control': 'public, max-age=3600' } }
  )
}
