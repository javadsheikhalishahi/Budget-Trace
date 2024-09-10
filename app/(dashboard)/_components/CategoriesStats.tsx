"use client";

import { getCategoriesStatsResponseType } from "@/app/api/stats/categories/route";
import SkeletonWrapper from "@/components/SkeletonWrapper";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { DateToUTCDate, GetFormatterForCurrency } from "@/lib/helpers";
import { TransactionType } from "@/lib/types";
import { UserSettings } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";

interface Props {
  userSettings: UserSettings;
  from: Date;
  to: Date;
}
function CategoriesStats({ userSettings, from, to }: Props) {
  const statsQuery = useQuery<getCategoriesStatsResponseType>({
    queryKey: ["overview", "stats", "categories", from, to],
    queryFn: () =>
      fetch(
        `/api/stats/categories?from=${DateToUTCDate(from)}&to=${DateToUTCDate(
          to
        )}`
      ).then((res) => res.json()),
  });
  const formatter = useMemo(() => {
    return GetFormatterForCurrency(userSettings.currency);
  }, [userSettings.currency]);
  return (
    <div className=" w-full flex flex-wrap md:flex-nowrap gap-2">
      <SkeletonWrapper isLoading={statsQuery.isFetching}>
        <CategoriesCard
          formatter={formatter}
          type="income"
          data={statsQuery.data || []}
        />
      </SkeletonWrapper>

      <SkeletonWrapper isLoading={statsQuery.isFetching}>
        <CategoriesCard
          formatter={formatter}
          type="expense"
          data={statsQuery.data || []}
        />
      </SkeletonWrapper>
    </div>
  );
}

export default CategoriesStats;

function CategoriesCard({
  data,
  type,
  formatter,
}: {
  type: TransactionType;
  formatter: Intl.NumberFormat;
  data: getCategoriesStatsResponseType;
}) {
  const filteredData = data.filter((el) => el.type === type);
  const total = filteredData.reduce(
    (acc, el) => acc + (el._sum?.amount || 0),
    0
  );

  return (
    
    <Card className="w-full h-80 col-span-6 border-2 border-amber-600">
      <CardHeader>
        <CardTitle className="justify-between grid grid-flow-row gap-2 text-muted-foreground md:grid-flow-col font-extrabold">
            {type === "income" ? "Incomes" : "Expenses"} By Category
        </CardTitle>
      </CardHeader>
      <div className="flex justify-between items-center gap-2">
        {filteredData.length === 0 && (
          <div className="flex flex-col w-full h-60 items-center justify-center font-bold">
            No Data For The Selected Period
            <p className="text-sm text-muted-foreground font-semibold">
              Try Selecting a Different Period Or Try Adding New{" "}
              {type === "income" ? "incomes" : "expenses"}
            </p>
          </div>
        )}
        {filteredData.length > 0 && (
            <ScrollArea className="h-60 px-4 w-full">
                <div className="flex flex-col w-full gap-4 p-4">
                    {filteredData.map(item => {
                        const amount = item._sum.amount || 0;
                        const percentage = (amount * 100) / (total || amount);

                        return (
                            <div key={item.category} className="flex flex-col gap-2">
                                <div className=" flex justify-between items-center">
                                    <span className="flex items-center font-black tracking-wider">
                                        {item.categoryIcon} {item.category}
                                        <span className=" ml-2 text-sm text-muted-foreground">
                                          ({percentage.toFixed(0)}%)
                                        </span>
                                    </span>
                                    <span className="text-sm font-bold text-gray-400">
                                      {formatter.format(amount)}
                                    </span>
                                </div>
                                <Progress value={percentage}
                                  indicator={
                                    type === "income" ? "bg-emerald-600" : "bg-rose-600"
                                  }
                                />
                            </div>
                        )
                    })}
                </div>
            </ScrollArea>
        )}
      </div>
    </Card>
    
  );
}
