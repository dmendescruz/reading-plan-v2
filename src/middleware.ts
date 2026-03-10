import { auth } from "@/lib/auth"
import { NextResponse } from "next/server"

export default auth((req) => {
  const isLoggedIn = !!req.auth
  const isAuthPage = req.nextUrl.pathname.startsWith("/login")
  const isApiAuth = req.nextUrl.pathname.startsWith("/api/auth")

  // Deixar passar rotas públicas
  if (isApiAuth) return NextResponse.next()

  // Redirecionar para login se não autenticado
  if (!isLoggedIn && !isAuthPage) {
    return NextResponse.redirect(new URL("/login", req.nextUrl))
  }

  // Redirecionar para home se já autenticado e tentou acessar login
  if (isLoggedIn && isAuthPage) {
    return NextResponse.redirect(new URL("/", req.nextUrl))
  }

  return NextResponse.next()
})

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
}