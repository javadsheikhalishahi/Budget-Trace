"use client";

import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { DeleteTransaction } from "../_actions/deleteTransaction";


interface Props {
    open: boolean;
    setOpen: (open: boolean) => void;
    transactionId: string;
}
function DeleteTransactionDialog({open, setOpen, transactionId}: Props) {
    const queryClient = useQueryClient();
    const deleteMutation = useMutation({
      mutationFn: DeleteTransaction,
      onSuccess: async () => {
        toast.success("Transaction Deleted Successfully", {
          id: transactionId,
        } );
        await queryClient.invalidateQueries({
          queryKey: ["transactions"],
        });
      },
      onError: () => {
        toast.error("Something Went Wrong", {
          id: transactionId,
        })
      }
    })
    return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are You Absolutely Sure?</AlertDialogTitle>
          <AlertDialogDescription>This Action can`t Be undone! This Will Permanently <span className='font-bold text-rose-600'>Delete</span> Your Transaction</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={() => {
            toast.loading("Deleting transaction...", {
              id: transactionId,
            }) 
            deleteMutation.mutate(transactionId);
          }}
          >
            Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
     
    );
  }

export default DeleteTransactionDialog
