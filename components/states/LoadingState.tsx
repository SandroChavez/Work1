
import { Loader2Icon } from "lucide-react"

interface Props{
    tittle: string;
    description: string;
}

export const StateLoanding = ({
    tittle,
    description
}: Props) => {


    return(
        <div className="p-4 flex flex-1 items-center justify-center">
            <div className="flex flex-col items-center justify-center gap-6 rounded-lg p-10 ">
                <Loader2Icon className="size-6 animate-spin text-primary" />
                <div className="flex flex-col gap-2 text-center">
                    <h6 className="text-lg">{tittle}</h6>
                    <p className="text-sm">{description}</p>
                </div>
            </div>
        </div>
    )

}