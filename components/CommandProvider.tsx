"use-client"

import { CommandDialog, CommandInput, CommandList, CommandItem } from "@/components/ui/command";
import { Dispatch, SetStateAction } from "react";

interface CommandProps{
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>
}

export const CommandProvider = ({
    open,
    setOpen
}: CommandProps) => {
    return (
        <CommandDialog open={open} onOpenChange={setOpen}>
            <CommandInput 
                placeholder="Find something"
            />
            <CommandList>
                <CommandItem>
                    Test
                </CommandItem>
            </CommandList>
        </CommandDialog>
    )
}
