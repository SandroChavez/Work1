"use client";

import { trpc } from "@/trpc/routers/client"

import { StateLoanding } from "@/components/states/LoadingState";
import { StateError } from "@/components/states/ErrorState";

const Page = () => {

    const { data, isLoading, isError } = trpc.agent.getAll.useQuery();

    if (isLoading){
        return(
            <StateLoanding tittle="Cargando..." description="Cargando los agentes"/>
        )
    }

    if (isError){
        return (
            <StateError tittle="Error" description="Error al cargar los agentes" />
        )
    }

    return (
        <div>
            {data?.map((agent) => (
                <li key={agent.id}>
                    <p>{agent.name}</p>
                </li>
            ))}
        </div>
    )

}

export default Page