import { z } from "zod"
import { FC, useState } from "react"
import { WorkspaceSchema } from "@/schemas/WorkspaceSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button"
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

interface IEditWorkspaceFormProps {
  workspace: WorkspaceData | undefined
}

type NewWorkspaceData = {
  name: string;
  description?: string;
  active?: boolean;
}

const EditWorkspaceForm: FC<IEditWorkspaceFormProps> = ({ workspace }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [workspaceData, setWorkspaceData] = useState<NewWorkspaceData | null>(null);

  const form = useForm<z.infer<typeof WorkspaceSchema>>({
    resolver: zodResolver(WorkspaceSchema),
    defaultValues: {
      name: workspace?.name || "",
      description: workspace?.description || "",
      active: workspace?.active || false,
    },
  });

  const handleDialogContinue = () => {
    console.log(workspaceData)
  };

  function onSubmit(values: z.infer<typeof WorkspaceSchema>) {
    setIsDialogOpen(true);
    setWorkspaceData(values as NewWorkspaceData)
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
        <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <AlertDialogTrigger asChild>
            <Button type="button" className="text-xsm text-white" onClick={form.handleSubmit(onSubmit)}>Save Changes</Button>
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
              <AlertDialogAction onClick={handleDialogContinue}>
                Save
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </form>
    </Form>
  )
}

export default EditWorkspaceForm