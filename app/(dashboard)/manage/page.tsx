"use client";

import { CurrencyComboBox } from "@/components/CurrencyComboBox";
import SkeletonWrapper from "@/components/SkeletonWrapper";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { TransactionType } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Category } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import { PlusSquare, TrashIcon, TrendingDown, TrendingUp } from "lucide-react";
import CreateCategoryDialog from "../_components/CreateCategoryDialog";
import DeleteCategoryDialog from "../_components/DeleteCategoryDialog";

function page() {
  return (
    <>
      <div className="border-b-4 border-t-4 bg-card ">
        <div className="container flex flex-wrap justify-between items-center py-8 gap-6">
          <div>
            <p className="text-4xl font-bold">Manage</p>
            <p className="text-muted-foreground">
              Manage Your Account Settings And Categories
            </p>
          </div>
        </div>
      </div>
      <div className="container flex flex-col gap-4 p-4 ">
        <Card className="border-2 border-amber-600 rounded-lg">
          <CardHeader>
            <CardTitle>Currency</CardTitle>
            <CardDescription>
              Set Your Default Currency For Transactions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <CurrencyComboBox />
          </CardContent>
        </Card>
        <CategoryList type="income" />
        <CategoryList type="expense" />
      </div>
    </>
  );
}

export default page;

function CategoryList({ type }: { type: TransactionType }) {
  const categoriesQuery = useQuery({
    queryKey: ["categories", type],
    queryFn: () =>
      fetch(`/api/categories?type=${type}`).then((res) => res.json()),
  });

  const dataAvailable = categoriesQuery.data && categoriesQuery.data.length > 0;

  return (
    <SkeletonWrapper isLoading={categoriesQuery.isLoading}>
      <Card className="border-2 border-amber-600 rounded-lg">
        <CardHeader>
          <CardTitle className="flex justify-between items-center gap-2 ">
            <div className="flex gap-2 items-center">
              {type === "expense" ? (
                <TrendingDown className="w-12 h-12 rounded-lg items-center p-2 bg-red-500/10 text-rose-600" />
              ) : (
                <TrendingUp className="w-12 h-12 rounded-lg items-center p-2 bg-emerald-500/10 text-emerald-600" />
              )}
              <div>
                {type === "income" ? "Incomes" : "Expense"} categories
                <div className="text-muted-foreground text-sm pt-1">
                  Sorted By Name
                </div>
              </div>
            </div>

            <CreateCategoryDialog
              type={type}
              SuccessCallback={() => categoriesQuery.refetch()}
              trigger={
                <Button
                  variant="outline"
                  className="w-[160px] text-sm font-medium gap-1 outline hover:outline-amber-600"
                >
                  <PlusSquare className=" w-5 h-5" />
                  Create Category
                </Button>
              }
            />
          </CardTitle>
        </CardHeader>
        <Separator />
        {!dataAvailable && (
          <div className="flex flex-col w-full h-40 items-center justify-center">
            <p>
              No
              <span
                className={cn(
                  "m-1 font-bold",
                  type === "income" ? "text-emerald-600" : "text-rose-600"
                )}
              >
                {type}
              </span>
              categories yet
            </p>
            <p className="text-sm text-muted-foreground">
              Create one to get start
            </p>
          </div>
        )}
        {dataAvailable && (
          <div className="grid grid-flow-row p-2 gap-2 sm:grid-flow-row sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {categoriesQuery.data.map((category: Category) => (
              <CategoryCard category={category} key={category.name} />
            ))}
          </div>
        )}
      </Card>
    </SkeletonWrapper>
  );
}

function CategoryCard({ category }: { category: Category }) {
  return (
    <div className="flex flex-col border-separate justify-between rounded-lg border shadow-md shadow-black/[0.1] dark:shadow-white/[0.1] ">
      <div className="flex flex-col items-center p-4 gap-2 ">
        <span className="text-3xl" role="img">
          {category.icon}
        </span>
        <span>{category.name}</span>
      </div>
      <DeleteCategoryDialog category={category} trigger={<Button className="flex border-separate w-full items-center gap-2 text-muted-foreground rounded-t-none hover:bg-rose-600/80" variant={"secondary"}>
        <TrashIcon className="w-4 h-4" />
          Remove
      </Button>}/>
      
    </div>
  );
}
