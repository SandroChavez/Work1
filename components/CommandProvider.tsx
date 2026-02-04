"use-client"

import { CommandDialog, CommandInput, CommandList, CommandItem, Command } from "@/components/ui/command";
import { useIsMobile } from "@/hooks/use-mobile";
import { Dispatch, SetStateAction } from "react";
import { 
    Drawer,
    DrawerContent,
    DrawerDescription,
    DrawerHeader,
    DrawerTitle
 } from "@/components/ui/drawer";
import { title } from "process";

interface CommandProps{
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>
}

export const CommandProvider = ({
    open,
    setOpen
}: CommandProps) => {

    const isMobile = useIsMobile();

    if(isMobile){

        return(
        <Drawer open={open} onOpenChange={setOpen}>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Sancha</DrawerTitle>
            </DrawerHeader>
            
            <Command className="border-none">
              <CommandInput placeholder="Find something" />
              <CommandList>
                <CommandItem>Test</CommandItem>
              </CommandList>
            </Command>
          </DrawerContent>
        </Drawer>
        )

    }


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
