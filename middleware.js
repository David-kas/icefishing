import { NextResponse } from 'next/server'

/** Crawlers: no GEO redirect so / stays directly reachable for indexing. */
const CRAWLER_UA =
  /Googlebot|AdsBot-Google|Mediapartners-Google|Google-InspectionTool|GoogleOther|Storebot-Google|Yandex|YandexBot|YandexImages|YandexVideo|Mail\.RU_Bot|bingbot|Slurp|DuckDuckBot|Baiduspider|facebookexternalhit|Twitterbot|LinkedInBot|Applebot|PetalBot|AhrefsBot|SemrushBot/i

export function middleware(request) {
  const url = new URL(request.url)
  const pathname = url.pathname

  if (pathname !== '/' && pathname !== '/index.html') {
    return NextResponse.next()
  }

  const ua = request.headers.get('user-agent') || ''
  if (CRAWLER_UA.test(ua)) {
    return NextResponse.next()
  }

  const country = request.headers.get('x-vercel-ip-country') || ''

  let prefix = '/en/'
  if (country === 'KZ') {
    prefix = '/kz/'
  } else if (country === 'UZ') {
    prefix = '/uz/'
  } else if (country === 'RU' || country === 'BY') {
    prefix = '/ru/'
  }

  url.pathname = prefix
  return NextResponse.redirect(url, 307)
}

export const config = {
  matcher: ['/', '/index.html'],
}
