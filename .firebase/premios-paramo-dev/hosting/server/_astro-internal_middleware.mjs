import { d as defineMiddleware, s as sequence } from './chunks/index_06XZgFwV.mjs';
import './chunks/astro-designed-error-pages_CqnbI9am.mjs';
import './chunks/astro/server_DBYefAC-.mjs';

const onRequest$1 = defineMiddleware(async (context, next) => {
  const role = context.cookies.get("userRole")?.value || "";
  const pathname = context.url.pathname;
  console.log("📩 [Middleware] Nueva solicitud:");
  console.log("🔍 - Rol detectado:", role || "Sin rol");
  console.log("🔍 - URL solicitada:", pathname);
  if (pathname.startsWith("/admin")) {
    console.log("🛡️ [Middleware] Protegiendo acceso Admin.");
    if (!role) {
      console.warn("🚫 [Middleware] Sin rol. Redirigiendo a /login.");
      return new Response(null, {
        status: 302,
        headers: { Location: "/login" }
      });
    }
    if (role !== "admin") {
      console.warn("🚫 [Middleware] No admin. Redirigiendo a /acceso-denegado.");
      return new Response(null, {
        status: 302,
        headers: { Location: "/acceso-denegado" }
      });
    }
    console.log("✅ [Middleware] Acceso PERMITIDO a /admin para admin.");
  }
  if (pathname.startsWith("/jurado") && !pathname.startsWith("/jurado/registro")) {
    console.log("🛡️ [Middleware] Protegiendo acceso Jurado.");
    if (!role) {
      console.warn("🚫 [Middleware] Sin rol. Redirigiendo a /login.");
      return new Response(null, {
        status: 302,
        headers: { Location: "/login" }
      });
    }
    if (role !== "jurado" && role !== "admin") {
      console.warn("🚫 [Middleware] No jurado ni admin. Redirigiendo a /login.");
      return new Response(null, {
        status: 302,
        headers: { Location: "/login" }
      });
    }
    console.log(`✅ [Middleware] Acceso PERMITIDO a /jurado (${role}).`);
  }
  console.log("➡️ [Middleware] Continuando con la solicitud...");
  return next();
});

const onRequest = sequence(
	
	onRequest$1
	
);

export { onRequest };
