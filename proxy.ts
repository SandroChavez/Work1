import { NextResponse, type NextRequest } from "next/server";

export async function proxy(request: NextRequest) {
    
    const sessionCookie = request.cookies.get("better-auth.session_token");

    console.log("RUTA:", request.nextUrl.pathname, "| ¿TIENE COOKIE?:", !!sessionCookie);

    const { pathname } = request.nextUrl;

    // IMPORTANTE: Better Auth usa muchas sub-rutas en /api/auth/...
    // Si solo pones /api/auth/login, bloquearás el resto de funciones.
    const publicRoutes = [
        "/login",
        "/register",
    ];

    // Verificamos si es una ruta pública exacta o si es parte de la API de Auth
    const isPublicPage = publicRoutes.includes(pathname);
    const isAuthApi = pathname.startsWith("/api/auth");

    // Si no hay sesión Y no es una página pública Y no es la API de auth -> Redirigir
    if (!sessionCookie && !isPublicPage && !isAuthApi) {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    return NextResponse.next();
}

export const config = {
    // Esta es la forma más segura de atrapar TODO, incluyendo la raíz "/"
    matcher: [
        /*
         * Coincide con todos los paths excepto los que empiezan por:
         * - _next/static (archivos estáticos)
         * - _next/image (optimización de imágenes)
         * - favicon.ico (icono)
         */
        '/((?!_next/static|_next/image|favicon.ico).*)',
    ],
};