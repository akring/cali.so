import { authMiddleware } from '@clerk/nextjs'
import { get } from '@vercel/edge-config'
import { type NextRequest, NextResponse } from 'next/server'

import { kvKeys } from '~/config/kv'
import { env } from '~/env.mjs'
import countries from '~/lib/countries.json'
import { getIP } from '~/lib/ip'
import { redis } from '~/lib/redis'

export const config = {
  matcher: ['/((?!_next|studio|.*\\..*).*)'],
}

function isBotRequest(req: NextRequest) {
  const userAgent = req.headers.get('user-agent') || ''
  const botPatterns = [
    'bot',
    'crawler',
    'spider',
    'scraper',
    'scan',
    'audit',
    'lighthouse',
    'pagespeed',
    ' GTmetrix',
    'Pingdom',
    'seoscanners',
    'security',
    'wp-cron',
    'curl',
    'wget',
    'python-requests',
    'node-fetch',
    'axios',
    'postman',
  ]
  return botPatterns.some((pattern) =>
    userAgent.toLowerCase().includes(pattern.toLowerCase())
  )
}

const PUBLIC_PATHS = [
  '/',
  '/blog',
  '/projects',
  '/guestbook',
  '/newsletters',
  '/about',
  '/rss',
  '/feed',
  '/ama',
  '/confirm',
  '/api',
  '/studio',
]

function isPublicPath(pathname: string) {
  return PUBLIC_PATHS.some(
    (p) => pathname === p || pathname.startsWith(p + '/') || pathname.startsWith(p + '?')
  )
}

async function beforeAuthMiddleware(req: NextRequest) {
  const { geo, nextUrl } = req
  const isApi = nextUrl.pathname.startsWith('/api/')

  // 无 session 的公开路由或 bot 请求直接跳过 Clerk 认证（必须返回 false，NextResponse.next() 不会跳过）
  // 有 session cookie 的请求仍走 Clerk 正常流程，保证已登录用户的 auth() 上下文
  const hasSession = req.cookies.has('__session') || req.cookies.has('__client_uat')
  if ((isPublicPath(nextUrl.pathname) && !hasSession) || isBotRequest(req)) {
    return false
  }

  if (process.env.EDGE_CONFIG) {
    const blockedIPs = await get<string[]>('blocked_ips')
    const ip = getIP(req)

    if (blockedIPs?.includes(ip)) {
      if (isApi) {
        return NextResponse.json(
          { error: 'You have been blocked.' },
          { status: 403 }
        )
      }

      nextUrl.pathname = '/blocked'
      return NextResponse.rewrite(nextUrl)
    }

    if (nextUrl.pathname === '/blocked') {
      nextUrl.pathname = '/'
      return NextResponse.redirect(nextUrl)
    }
  }

  if (geo && !isApi && env.VERCEL_ENV === 'production') {
    const country = geo.country
    const city = geo.city

    const countryInfo = countries.find((x) => x.cca2 === country)
    if (countryInfo) {
      const flag = countryInfo.flag
      await redis.set(kvKeys.currentVisitor, { country, city, flag })
    }
  }

  return NextResponse.next()
}

export default authMiddleware({
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  beforeAuth: beforeAuthMiddleware as any,
  publicRoutes: [
    '/',
    '/studio(.*)',
    '/api(.*)',
    '/blog(.*)',
    '/confirm(.*)',
    '/projects',
    '/guestbook',
    '/newsletters(.*)',
    '/about',
    '/rss',
    '/feed',
    '/ama',
  ],
})
