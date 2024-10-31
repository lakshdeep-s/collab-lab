import { SignupFormSchema } from "@/schemas/AuthSchemas"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useMutation } from "@tanstack/react-query"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormLabel,
    FormItem,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { registerUserAndJoinTeam } from "@/lib/api"
import { RiAlertLine, RiLoader4Line } from "react-icons/ri"
import { Alert, AlertDescription } from "../ui/alert"

// Component for Registration Form
const RegisterAndJoinForm = ({ email, token }: { email: string, token: string }) => {
    const navigate = useNavigate()

    // React Query Mutation for User Registration
    const {
        mutate: SignupAndJoin,
        isPending,
        isError,
        error
    } = useMutation({
        mutationFn: registerUserAndJoinTeam,
        onSuccess: () => {
            navigate("/login", {
                replace: true
            })
        },
        onError: (error: any) => {
            console.error("Registration Error:", error)
        }
    })

    const form = useForm<z.infer<typeof SignupFormSchema>>({
        resolver: zodResolver(SignupFormSchema),
        defaultValues: {
            username: "",
            email: email,
            password: "",
        }
    })

    function onSubmit(values: z.infer<typeof SignupFormSchema>) {
        SignupAndJoin({ username: values.username, email: values.email, password: values.password, token })
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 text-xsm">
                <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="font-medium">Username</FormLabel>
                            <FormControl>
                                <Input placeholder="Acme" {...field} className="placeholder:text-xsm" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="font-medium">Password</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter password" {...field} type="password" className="placeholder:text-xsm" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                {isError && (
                    <Alert variant="destructive">
                        <AlertDescription className="flex items-center gap-2">
                            <RiAlertLine size={20} /> {(error as any)?.message || "An error occurred"}
                        </AlertDescription>
                    </Alert>
                )}
                <Button type="submit" className="w-full bg-brand hover:bg-orange-500 font-semibold" disabled={isPending}>
                    {isPending ? <RiLoader4Line size={25} className="animate-spin" /> : "Join Team"}
                </Button>
            </form>
        </Form>
    )
}

export default RegisterAndJoinForm