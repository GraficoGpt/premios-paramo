import { defineMiddleware } from 'astro/middleware'

export const onRequest = defineMiddleware(async (context, next) => {
  const pathname = context.url.pathname

  // Para todas las demás rutas, procesamos normalmente
  const role = context.cookies.get('userRole')?.value || ''

  console.log('📩 [Middleware] Nueva solicitud:')
  console.log('🔍 - Rol detectado:', role || 'Sin rol')
  console.log('🔍 - URL solicitada:', pathname)

  // 🛡️ Protegemos todo /admin
  if (pathname.startsWith('/admin')) {
    console.log('🛡️ [Middleware] Protegiendo acceso Admin.')

    if (!role) {
      console.warn('🚫 [Middleware] Sin rol. Redirigiendo a /login.')
      return new Response(null, {
        status: 302,
        headers: { Location: '/login' },
      })
    }

    if (role !== 'admin') {
      console.warn('🚫 [Middleware] No admin. Redirigiendo a /acceso-denegado.')
      return new Response(null, {
        status: 302,
        headers: { Location: '/acceso-denegado' },
      })
    }

    console.log('✅ [Middleware] Acceso PERMITIDO a /admin para admin.')
  }

  // 🛡️ Protegemos todo /jurado excepto /jurado/registro
  if (
    pathname.startsWith('/jurado') &&
    !pathname.startsWith('/jurado/registro')
  ) {
    console.log('🛡️ [Middleware] Protegiendo acceso Jurado.')

    if (!role) {
      console.warn('🚫 [Middleware] Sin rol. Redirigiendo a /login.')
      return new Response(null, {
        status: 302,
        headers: { Location: '/login' },
      })
    }

    if (role !== 'jurado' && role !== 'admin') {
      console.warn('🚫 [Middleware] No jurado ni admin. Redirigiendo a /login.')
      return new Response(null, {
        status: 302,
        headers: { Location: '/login' },
      })
    }

    console.log(`✅ [Middleware] Acceso PERMITIDO a /jurado (${role}).`)
  }

  console.log('➡️ [Middleware] Continuando con la solicitud...')
  return next()
})
