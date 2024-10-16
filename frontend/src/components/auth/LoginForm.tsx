import { LoginFormSchema } from "@/schemas/AuthSchemas"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { login } from "@/lib/api"
import { useMutation } from "@tanstack/react-query"

// Form Components Import
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useNavigate } from "react-router-dom"
import { Alert, AlertDescription} from "../ui/alert"
import { RiAlertLine } from "react-icons/ri";
import { RiLoader4Line } from "react-icons/ri";

const LoginForm = () => {
    const navigate = useNavigate()
    const {
        mutate, error, isError, isPending
    } = useMutation({
        mutationFn: login,
        onSuccess: () => {
            navigate("/", {
                replace: true,
            })
        }
    })

    const form = useForm<z.infer<typeof LoginFormSchema>>({
        resolver: zodResolver(LoginFormSchema),
        defaultValues: {
            email: "",
            password: "",
        }
    })

    function onSubmit(values: z.infer<typeof LoginFormSchema>) {
        mutate(values)
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input placeholder="Email" {...field} className="placeholder:text-xsm"/>
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
                            <FormControl>
                                <Input placeholder="Password" {...field} type="password" className="placeholder:text-xsm"/>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                {
                    isError && (
                        <Alert variant="destructive">
                            <RiAlertLine size={20}/>
                            <AlertDescription>{error.message}</AlertDescription>
                        </Alert>
                    )
                }
                <Button type="submit" className="w-full bg-brand hover:bg-orange-500 font-semibold">
                    {
                        isPending ? <RiLoader4Line size={20}/> : "Login"
                    }
                </Button>
            </form>
        </Form>
    )
}

export default LoginForm