/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation.
 * This is especially useful for Docker builds.
 */
!process.env.SKIP_ENV_VALIDATION && (await import('./env.mjs'))

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        port: '',
        pathname: `/images/${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}/**`,
      }
    ],
  },

  experimental: {
    taint: true,
  },

  async headers() {
    return [
      {
        source: '/',
        headers: [
          {
            key: 'Link',
            value: [
              '</.well-known/api-catalog>; rel="api-catalog"',
              '</.well-known/agent-skills/index.json>; rel="agent-skills"',
              '</.well-known/mcp/server-card.json>; rel="mcp-server-card"',
            ].join(', '),
          },
          {
            key: 'Vary',
            value: 'Accept',
          },
        ],
      },
    ]
  },

  redirects() {
    return [
      {
        "source": "/twitter",
        "destination": "https://x.com/thecalicastle",
        "permanent": true
      },
      {
        "source": "/x",
        "destination": "https://x.com/thecalicastle",
        "permanent": true
      },
      {
        "source": "/youtube",
        "destination": "https://youtube.com/@calicastle",
        "permanent": true
      },
      {
        "source": "/tg",
        "destination": "https://t.me/cali_so",
        "permanent": true
      },
      {
        "source": "/linkedin",
        "destination": "https://www.linkedin.com/in/calicastle/",
        "permanent": true
      },
      {
        "source": "/github",
        "destination": "https://github.com/CaliCastle",
        "permanent": true
      },
      {
        "source": "/bilibili",
        "destination": "https://space.bilibili.com/8350251",
        "permanent": true
      }
    ]
  },

  rewrites() {
    return {
      beforeFiles: [
        // 当 Accept 头包含 text/markdown 时，返回 markdown 版本（RFC 7231 内容协商）
        {
          source: '/',
          has: [{ type: 'header', key: 'accept', value: 'text/markdown' }],
          destination: '/api/markdown',
        },
      ],
      afterFiles: [
        {
          source: '/favicon.ico',
          destination: '/favicon.png',
        },
        {
          source: '/apple-touch-icon.png',
          destination: '/favicon.png',
        },
        {
          source: '/feed',
          destination: '/feed.xml',
        },
        {
          source: '/rss',
          destination: '/feed.xml',
        },
        {
          source: '/rss.xml',
          destination: '/feed.xml',
        },
      ],
    }
  },
}

export default nextConfig
