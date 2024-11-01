import { deleteWorkspace } from "@/lib/api";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
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
} from "@/components/ui/alert-dialog"
import { useState } from "react";
import { Button } from "../ui/button";
import useWorkspace from "@/hooks/useWorkspace";

const DeleteWorkspaceToggle = () => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const {activeWorkspace} = useWorkspace()

    const {
        mutate: deleteWorkspaceMutation,
        isPending
    } = useMutation({
        mutationFn: deleteWorkspace,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["workspaces"] });
            navigate("/", {
                replace: true,
            });
        },
    })

    const handleDialogContinue = () => {
        deleteWorkspaceMutation(activeWorkspace?._id!);
    };

    const handleDelete = () => {
        setIsDialogOpen(true);
        console.log("About to delete")
    }

    return (
        <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <AlertDialogTrigger asChild>
                <Button disabled={isPending} className="border border-red-500/50 bg-red-600/5 hover:bg-red-600/10 text-red-600" type="button" onClick={handleDelete}>Delete Workspace</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action will delete your workspace forever. Do you want to continue?
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleDialogContinue} disabled={isPending}>
                        Delete
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default DeleteWorkspaceToggle