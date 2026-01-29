import { createAvatar } from "@dicebear/core"
import { botttsNeutral, initials } from "@dicebear/collection"

import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface GeneratedAvatarProps{
    seed: string;
    className?: string;
    variant: "botttsNeutral" | "initials"
}

export const GenerateAvatar = ({
    seed,
    className,
    variant
}: GeneratedAvatarProps) => {
    let avatar

    if(variant === "initials"){
        avatar = createAvatar(initials,{
            seed,
            fontSize: 42,
            fontWeight: 500
        })
    }else{
        avatar = createAvatar(botttsNeutral,{
            seed,
        })
    }


    return (
        <Avatar className={cn(className)}>
            <AvatarImage/>
            <AvatarFallback>{seed.charAt(0).toUpperCase()}</AvatarFallback> 
        </Avatar>
    )
}
