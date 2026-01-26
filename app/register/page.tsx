"use client"
import { authClient } from "@/lib/auth-client"
import { useState } from "react"
import { useRouter } from "next/navigation"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

export default function RegisterPage() {
  const [name, setName] = useState(""); // Nuevo campo para el nombre
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const { data, error } = await authClient.signUp.email({
      email,
      password,
      name, // Enviamos el nombre a Better Auth
    }, {
      onSuccess: () => {
        router.push("/"); // Redirige a la raíz protegida
        router.refresh();
      },
      onError: (ctx) => {
        alert(ctx.error?.message || "Error al crear la cuenta");
        setIsLoading(false);
      }
    });
  }

  return (
    <div className="flex min-h-screen items-center justify-center">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Crear cuenta</CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleRegister} className="space-y-4">
            {/* Campo de Nombre */}
            <div className="space-y-2">
              <Label htmlFor="name">Nombre Completo</Label>
              <Input 
                id="name" 
                type="text" 
                placeholder="Tu nombre"
                onChange={(e) => setName(e.target.value)} 
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                type="email" 
                placeholder="correo@email.com"
                onChange={(e) => setEmail(e.target.value)} 
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Contraseña</Label>
              <Input 
                id="password" 
                type="password" 
                placeholder="••••••••"
                onChange={(e) => setPassword(e.target.value)} 
                required
              />
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Creando cuenta..." : "Registrarse"}
            </Button>
          </form>
          
          <div className="mt-4 text-center text-sm">
            ¿Ya tienes una cuenta?{" "}
            <button 
              onClick={() => router.push("/login")} 
              className="underline underline-offset-4 hover:text-primary"
            >
              Inicia sesión
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}