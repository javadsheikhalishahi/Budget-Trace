"use client"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { TransactionType } from '@/lib/types';
import { Category } from '@prisma/client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ReactNode } from 'react';
import toast from 'react-hot-toast';
import { DeleteCategory } from '../_actions/category';

interface Props {
    trigger: ReactNode;
    category: Category;
}
function DeleteCategoryDialog({ category, trigger }: Props) {
  const categoryIdentifier = `${category.name}-${category.type}`;
  const queryClient = useQueryClient();
  const deleteMutation = useMutation({
    mutationFn: DeleteCategory,
    onSuccess: async () => {
      toast.success("Category Deleted Successfully", {
        id: categoryIdentifier,
      } );
      await queryClient.invalidateQueries({
        queryKey: ["categories"],
      });
    },
    onError: () => {
      toast.error("Something Went Wrong", {
        id: categoryIdentifier,
      })
    }
  })
  return (
  <AlertDialog>
    <AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger>
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Are You Absolutely Sure?</AlertDialogTitle>
        <AlertDialogDescription>This Action can`t Be undone! This Will Permanently <span className='font-bold text-rose-600'>Delete</span> Your Category</AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
        <AlertDialogAction onClick={() => {
          toast.loading("Deleting category...", {
            id: categoryIdentifier,
          }) 
          deleteMutation.mutate({
            name: category.name,
            type: category.type as TransactionType,
          })
        }}
        >
          Continue</AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
   
  );
}

export default DeleteCategoryDialog
