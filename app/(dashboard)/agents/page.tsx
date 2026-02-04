"use client";

import { trpc } from "@/trpc/routers/client"

import { StateLoanding } from "@/components/states/LoadingState";
import { StateError } from "@/components/states/ErrorState";

import React, { useEffect, useState } from "react";

const Page = () => {
    const { data, isLoading, isError} = trpc.agent.getAll.useQuery();


    const createAgent = trpc.agent.create.useMutation({
        onSuccess: () => {
            
            setName("");
            setInstructions("");
        },
    });

    const [name, setName] = useState("");
    const [instructions, setInstructions] = useState("");
    const [formError, setFormError] = useState("");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        console.log("Submitting form with name:", name, "and instructions:", instructions);
        
        setFormError("");
        if (!name.trim()) {
            setFormError("El nombre es requerido");
            return;
        }
        if (!instructions.trim()) {
            setFormError("Las instrucciones son requeridas");
            return;
        }
        try {
            await createAgent.mutateAsync({ name, instructions });
        } catch (err) {
            setFormError("Error al crear el agente");
        }
    };

    if (isLoading) {
        return (
            <StateLoanding tittle="Cargando..." description="Cargando los agentes" />
        );
    }

    if (isError) {
        return (
            <StateError tittle="Error" description="Error al cargar los agentes" />
        );
    }

    return (
        <div>
            <form onSubmit={handleSubmit} style={{ marginBottom: 24 }}>
                <input
                    type="text"
                    placeholder="Nombre del agente"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    style={{ marginRight: 8 }}
                />
                <input
                    type="text"
                    placeholder="Instrucciones"
                    value={instructions}
                    onChange={(e) => setInstructions(e.target.value)}
                    style={{ marginRight: 8 }}
                />
                <button type="submit" disabled={createAgent.status === 'pending'}>
                    {createAgent.status === 'pending' ? "Creando..." : "Crear agente"}
                </button>
                {formError && <div style={{ color: "red", marginTop: 8 }}>{formError}</div>}
            </form>
            <ul>
                {data?.map((agent) => (
                    <li key={agent.id}>
                        <p><b>{agent.name}</b></p>
                        {agent.instructions && <p>{agent.instructions}</p>}
                        <p>{agent.user.email}</p>
                    </li>
                ))}
            </ul>
        </div>
    );

};

export default Page;