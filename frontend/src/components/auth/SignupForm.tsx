import { SignupFormSchema } from "@/schemas/AuthSchemas"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useMutation } from "@tanstack/react-query"
import { RiAlertLine } from "react-icons/ri";
import { RiLoader4Line } from "react-icons/ri";

// Form Components Import
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
import { useNavigate } from "react-router-dom"
import { register } from "@/lib/api"
import { Alert, AlertDescription } from "../ui/alert"

const SignupForm = () => {
    const navigate = useNavigate()
    const {
        mutate, error, isError, isPending
    } = useMutation({
        mutationFn: register,
        onSuccess: () => {
            navigate("/", {
                replace: true,
            })
        }
    })
    const form = useForm<z.infer<typeof SignupFormSchema>>({
        resolver: zodResolver(SignupFormSchema),
        defaultValues: {
            username: "",
            email: "",
            password: "",
        }
    })

    function onSubmit(values: z.infer<typeof SignupFormSchema>) {
        mutate(values)
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 text-xsm">
                <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="font-medium">
                                Username
                            </FormLabel>
                            <FormControl>
                                <Input placeholder="Acme" {...field} className="placeholder:text-xsm" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="font-medium">
                                Email
                            </FormLabel>
                            <FormControl>
                                <Input placeholder="acme@gmail.com" {...field} className="placeholder:text-xsm" />
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
                            <FormLabel className="font-medium">
                                Password
                            </FormLabel>
                            <FormControl>
                                <Input placeholder="Enter password" {...field} type="password" className="placeholder:text-xsm" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                {
                    isError && (
                        <Alert variant="destructive">
                            <RiAlertLine size={20} />
                            <AlertDescription>{error.message}</AlertDescription>
                        </Alert>
                    )
                }
                <Button type="submit" className="w-full bg-brand hover:bg-orange-500 font-semibold" disabled={isPending}>
                    {
                        isPending ? <RiLoader4Line size={25} className="animate-spin" /> : "Login"
                    }
                </Button>
            </form>
        </Form>
    )
}

export default SignupForm
