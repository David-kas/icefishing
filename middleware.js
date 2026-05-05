import { NextResponse } from 'next/server'

export function middleware(request) {
  const url = request.nextUrl.clone()

  // Получаем страну
  const country = request.headers.get('x-vercel-ip-country')

  // Если уже в языковой папке — не трогаем
  if (
    url.pathname.startsWith('/ru') ||
    url.pathname.startsWith('/kz') ||
    url.pathname.startsWith('/uz') ||
    url.pathname.startsWith('/en')
  ) {
    return NextResponse.next()
  }

  // Редиректы по GEO
  if (country === 'KZ') {
    url.pathname = '/kz' + url.pathname
  } else if (country === 'UZ') {
    url.pathname = '/uz' + url.pathname
  } else if (country === 'RU' || country === 'BY' || country === 'KZ') {
    url.pathname = '/ru' + url.pathname
  } else {
    url.pathname = '/en' + url.pathname
  }

  return NextResponse.redirect(url)
}
