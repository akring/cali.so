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
      issuer,
      authorization_endpoint: `${issuer}/oauth/authorize`,
      token_endpoint: `${issuer}/oauth/token`,
      jwks_uri: `${issuer}/.well-known/jwks.json`,
      response_types_supported: ['code'],
      grant_types_supported: ['authorization_code', 'refresh_token'],
      token_endpoint_auth_methods_supported: ['client_secret_basic'],
      scopes_supported: ['openid', 'profile', 'email'],
    },
    { headers: { 'Cache-Control': 'public, max-age=3600' } }
  )
}
