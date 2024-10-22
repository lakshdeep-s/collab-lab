import { UserData } from "@/types";
import { FC, useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { AccountSchema } from "@/schemas/AccountSchemas";
import { useForm } from "react-hook-form";
import { queryClient } from "@/config/reactQuery";

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
import { useMutation } from "@tanstack/react-query";

interface IUserDataSectionProps {
  user: UserData | undefined;
}

type NewUserData = {
  username: string
}

const UserDataSection: FC<IUserDataSectionProps> = ({ user }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [userData, setUserData] = useState<NewUserData | null>(null);

  // Implement updation of data later

  const form = useForm<z.infer<typeof AccountSchema>>({
    resolver: zodResolver(AccountSchema),
    defaultValues: {
      username: user?.username || "",
    },
  });

  const handleDialogContinue = () => {
    console.log(userData)
  };

  function onSubmit(values: z.infer<typeof AccountSchema>) {
    setIsDialogOpen(true);
    setUserData(values as NewUserData)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="Enter your username" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <AlertDialogTrigger asChild>
            <Button type="button" onClick={form.handleSubmit(onSubmit)}>Save Changes</Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action will update your account information. Do you want to continue?
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
  );
};

export default UserDataSection;