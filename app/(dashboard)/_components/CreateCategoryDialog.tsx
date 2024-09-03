"use client";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
} from "@/components/ui/form";
import { TransactionType } from "@/lib/types";
import { cn } from "@/lib/utils";
import {
    CreateCategorySchema,
    CreateCategorySchemaType,
} from "@/schema/categories";
import { zodResolver } from "@hookform/resolvers/zod";
import { CircleOff, PlusSquare } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import Data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { useState } from "react";
import { useForm } from "react-hook-form";


interface Props {
  type: TransactionType;
}

function CreateCategoryDialog({ type }: Props) {
  const [open, setOpen] = useState(false);
  const form = useForm<CreateCategorySchemaType>({
    resolver: zodResolver(CreateCategorySchema),
    defaultValues: {
      type,
    },
  });
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant={"ghost"}
          className="border-separate flex justify-start items-start
        rounded border-b-1 px-3 py-3 text-muted-foreground hover:bg-gray-700"
        >
          <PlusSquare className="mr-3 h-4 w-4" />
          Create New
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Create
            <span
              className={cn(
                "m-1 font-extrabold",
                type === "income" ? "text-emerald-600" : "text-rose-600"
              )}
            >
              {type}
            </span>
            category
          </DialogTitle>
          <DialogDescription>
            Categories are used to group your transactions
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input className="rounded-xl" defaultValue={""} {...field} />
                  </FormControl>
                  <FormDescription className="font-semibold">
                    Transaction description (optional)
                  </FormDescription>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="icon"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Icon</FormLabel>
                  <FormControl>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className="w-full h-[90px] rounded-xl"
                        >
                          {form.watch("icon") ? (
                            <div className="items-center flex flex-col gap-2">
                            <span className="text-4xl" role="img">{field.value}</span>
                            <p className="text-xs text-muted-foreground">
                              Click to change
                            </p>
                          </div>
                          ) : (
                            <div className="items-center flex flex-col gap-2">
                              <CircleOff className="h-[48px] w-[48px]" />
                              <p className="text-xs text-muted-foreground">
                                Click to select 
                              </p>
                            </div>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-full">
                         <Picker
                          data={Data}
                          onEmojiSelect={(emoji: { native: string }) => {
                            field.onChange(emoji.native);
                          }}
                          />
                      </PopoverContent>
                    </Popover>
                  </FormControl>
                  <FormDescription className="font-semibold">
                    This is how your category will be appear in the application
                  </FormDescription>
                </FormItem>
              )}
            />
          </form>
        </Form>
        <DialogFooter>
        <DialogClose asChild>
            <Button type="button" variant={"secondary"} 
            onClick={() => {
                form.reset();
            }}
            >
             Cancel
            </Button>
        </DialogClose>
        <Button>Save</Button>
      </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default CreateCategoryDialog;
