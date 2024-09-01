"use client";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { TransactionType } from "@/lib/types";
import { cn } from "@/lib/utils";
import { CreateTransactionSchema, CreateTransactionSchemaType } from "@/schema/transactions";
import { zodResolver } from "@hookform/resolvers/zod";
import { ReactNode } from "react";
import { useForm } from "react-hook-form";
interface Props {
    trigger: ReactNode;
    type: TransactionType;
}


function CreateTransactionDialog({trigger, type}: Props) {
    const form = useForm<CreateTransactionSchemaType>({
        resolver: zodResolver(CreateTransactionSchema),
        defaultValues: {
            type,
            date: new Date(),
        }
    })
  return (
    <Dialog>
        <DialogTrigger asChild>{trigger}</DialogTrigger>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Create a new<span className={cn("m-2",
                    type === "income" ? "text-emerald-500" : "text-rose-500"
                )}>
                    {type}
                    </span>
                    transaction
                </DialogTitle>
            </DialogHeader>
            <Form {...form}>
                <form className="space-y-5">
                    <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                                <Input defaultValue={""} {...field} />
                            </FormControl>
                            <FormDescription>
                                Transaction description (optional)
                            </FormDescription>
                        </FormItem>
                    )}
                    />
                </form>
            </Form>
        </DialogContent>
    </Dialog>
  )
}

export default CreateTransactionDialog
