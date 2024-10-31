import React from 'react';
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { WorkspaceSchema } from "@/schemas/WorkspaceSchema";
import { useForm } from "react-hook-form";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Textarea } from "@/components/ui/textarea";

import { createWorkspace } from "@/lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import useWorkspacesWithActive from "@/hooks/useWorkspaceWithActive";

export type NewWorkSpaceData = {
    name: string;
    description?: string;
    isActive?: boolean
}

export default function NewWorkspaceForm() {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [workspaceData, setWorkspaceData] = useState<NewWorkSpaceData | null>(null);
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const { handleWorkspaceChange } = useWorkspacesWithActive();

    const {
        mutate: createWorkspaceMutation,
        isPending,
    } = useMutation({
        mutationFn: createWorkspace,
        onSuccess: (newWorkspace) => {
            
            queryClient.invalidateQueries({ queryKey: ["workspaces"] });
            
            //@ts-ignore
            handleWorkspaceChange(newWorkspace?.name)
            
            navigate("/");
        },
        onError: (error) => {
            console.error("Error creating workspace:", error);
        }
    });

    const form = useForm<z.infer<typeof WorkspaceSchema>>({
        resolver: zodResolver(WorkspaceSchema),
        defaultValues: {
            name: "",
            description: "",
        },
    });

    const handleDialogContinue = () => {
        createWorkspaceMutation(workspaceData!);
        setIsDialogOpen(false);
    };

    function onSubmit(values: z.infer<typeof WorkspaceSchema>) {
        setIsDialogOpen(true);
        setWorkspaceData(values as NewWorkSpaceData);
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Workspace Name</FormLabel>
                            <FormControl>
                                <Input placeholder="Workspace Name" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                                <Textarea placeholder="Description (Max 100 Words).." {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <AlertDialogTrigger asChild>
                        <Button
                            type="button"
                            onClick={form.handleSubmit(onSubmit)}
                            disabled={isPending}
                        >
                            {isPending ? 'Creating...' : 'Create Workspace'}
                        </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                                This action will create a new workspace and set it as active. Do you want to continue?
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={handleDialogContinue} disabled={isPending}>
                                {isPending ? 'Creating...' : 'Continue'}
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </form>
        </Form>
    );
}