import { z } from "zod"
import { FC, useState } from "react"
import { WorkspaceSchema } from "@/schemas/WorkspaceSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button"
import { useQueryClient } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";
import { updateWorkspace } from "@/lib/api";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
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
import { WorkspaceData } from "@/types";
import DeleteWorkspaceToggle from "./DeleteWorkspaceToggle";
import { NewWorkSpaceData } from "./NewWorkspaceForm";

interface IEditWorkspaceFormProps {
  workspace: WorkspaceData | undefined
}

const EditWorkspaceForm: FC<IEditWorkspaceFormProps> = ({ workspace }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [workspaceData, setWorkspaceData] = useState<NewWorkSpaceData>({name: workspace?.name!, description: workspace?.description, isActive: workspace?.active});
  const queryClient = useQueryClient();

  const {
    mutate: updateWorkspaceMutation,
    isPending
  } = useMutation({
    mutationFn: ({ workspaceId, workspaceData }: { workspaceId: string, workspaceData: NewWorkSpaceData }) =>
      updateWorkspace(workspaceId, workspaceData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["workspaces"] });
      window.location.reload();
    },
  })

  const form = useForm<z.infer<typeof WorkspaceSchema>>({
    resolver: zodResolver(WorkspaceSchema),
    defaultValues: {
      name: workspace?.name || "",
      description: workspace?.description || "",
      active: workspace?.active || false,
    },
  });

  const handleDialogContinue = () => {
    updateWorkspaceMutation({ workspaceId: workspace?._id!, workspaceData })
  };

  function onSubmit(values: z.infer<typeof WorkspaceSchema>) {
    setIsDialogOpen(true);
    setWorkspaceData(values as NewWorkSpaceData)
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
                <Input placeholder="Enter workspace name" {...field} />
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
                <Input placeholder="Enter workspace description" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-between items-center">
          <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <AlertDialogTrigger asChild>
              <Button disabled={isPending} type="button" className="text-xsm text-white" onClick={form.handleSubmit(onSubmit)}>Save Changes</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action will update your workspace settings. Do you want to continue?
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleDialogContinue} disabled={isPending}>
                  Save
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
          <DeleteWorkspaceToggle />
        </div>
      </form>
    </Form>
  )
}

export default EditWorkspaceForm