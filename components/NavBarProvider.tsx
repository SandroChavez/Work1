    "use client";

    import { Button } from "@/components/ui/button"
    import { useSidebar } from "@/components/ui/sidebar";
    import { CommandProvider } from "@/components/CommandProvider";

    import { PanelLeftCloseIcon, PanelLeftIcon, SearchIcon } from "lucide-react";
    import { useEffect, useState } from "react";

    export const NavBarProvider = () => {
        
        const { state, toggleSidebar, isMobile } = useSidebar();
        const [commandOpen, setCommandOpen] = useState(false);

        useEffect(() => {
            const down = (e:KeyboardEvent) => {
                if (e.key === "k" && (e.metaKey || e.ctrlKey)){
                    e.preventDefault()
                    setCommandOpen((open) => !open)
                }
            }
            document.addEventListener("keydown", down);
            return () => document.removeEventListener("keydown",down)
        },[])

        return (
            <>
                <CommandProvider open={commandOpen} setOpen={setCommandOpen} />
                <nav className="flex w-full p-3  bg-gray-50 border border-gray-100 gap-2">
                    <Button onClick={toggleSidebar} variant={"outline"} className="size-9">
                        {(state === "collapsed" || isMobile)
                        ? <PanelLeftIcon/>
                        : <PanelLeftCloseIcon/>
                        }
                    </Button>
                    <Button 
                        variant={"outline"}
                        className="w-[240px] justify-start text-muted-foreground hover:text-muted-foreground" >
                        <SearchIcon/>
                    </Button>
                </nav>
            </>
        )

    }