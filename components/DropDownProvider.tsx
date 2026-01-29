"use client";

import { useRouter } from "next/navigation"
import { authClient } from "@/lib/auth-client"
import { useState } from "react";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

import { GenerateAvatar } from "./avatar-generate";


export function UserMenu() {

  const {data , isPending} = authClient.useSession();

  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  if(!data){
    return;
  }

  const handleLogout = async() => {
    //e.preventDefault();
    setIsLoading(true);

    const { data, error } = await authClient.signOut({
      

    },{
      onSuccess: () => {
        router.push("/login");
        router.refresh();
      },
      onError: (ctxe) => {
        alert(ctxe.error?.message || "Error en cerrar sesión");
        setIsLoading(false); // Importante resetear el loading si hay error
      }
    });
  }

  return (

    <DropdownMenu>
      <DropdownMenuTrigger className="flex flex-row gap-1 p-3">
        {data.user.image ? (
          <Avatar>
            <AvatarImage src={data.user.image}></AvatarImage>
          </Avatar>
        
        ):(
          
          <GenerateAvatar
            seed={data.user.name}
            variant="initials"
            className="size-9"
          /> 
          
        )}
        <div className="flex flex-col gap-0.5 text-left flex-1 ">
          <p className="text-sm truncate w-full">
            {data.user.name}
          </p>
          <p className="text-xs truncute w-full">
            {data.user.email}
          </p>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" side="right" className="w-72">
        <DropdownMenuLabel>
          <span>Perfil</span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator/>
        <DropdownMenuItem>
          <Button 
            variant={"outline"}
            onClick={handleLogout}
          >Logout</Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

