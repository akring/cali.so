export const runtime = 'edge'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://akring.com'

const MARKDOWN_CONTENT = `# Akring

Developer, designer, and creator building products and sharing thoughts about technology, design, and life.

Site: ${siteUrl}

## Navigation

- [Blog](${siteUrl}/blog) - Articles about technology, design, and development
- [Projects](${siteUrl}/projects) - Personal projects and creations
- [Guestbook](${siteUrl}/guestbook) - Leave a message
- [Newsletter](${siteUrl}/newsletters) - Subscribe to email updates
- [About](${siteUrl}/about) - Background and bio
- [AMA](${siteUrl}/ama) - Ask Me Anything

## APIs

- \`GET /api/activity\` - Current app / focus activity
- \`GET /api/reactions\` - Emoji reactions for blog posts
- \`GET /feed.xml\` - RSS feed (application/rss+xml)

## Discovery

- [API Catalog](${siteUrl}/.well-known/api-catalog)
- [Agent Skills](${siteUrl}/.well-known/agent-skills/index.json)
- [MCP Server Card](${siteUrl}/.well-known/mcp/server-card.json)
- [RSS Feed](${siteUrl}/feed.xml)
`

export function GET() {
  return new Response(MARKDOWN_CONTENT, {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  })
}
