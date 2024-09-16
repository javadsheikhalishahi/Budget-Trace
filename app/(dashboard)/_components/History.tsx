"use client";
import SkeletonWrapper from "@/components/SkeletonWrapper";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TooltipProvider } from "@/components/ui/tooltip";
import { GetFormatterForCurrency } from "@/lib/helpers";
import { Period, Timeframe } from "@/lib/types";
import { cn } from "@/lib/utils";
import { UserSettings } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useCallback, useMemo, useState } from "react";
import CountUp from "react-countup";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer, Tooltip, XAxis,
  YAxis
} from "recharts";
import HistoryPeriodSelector from "./HistoryPeriodSelector";

function History({ userSettings }: { userSettings: UserSettings }) {
  const [timeframe, setTimeframe] = useState<Timeframe>("month");
  const [period, setPeriod] = useState<Period>({
    month: new Date().getMonth(),
    year: new Date().getFullYear(),
  });

  const formatter = useMemo(() => {
    return GetFormatterForCurrency(userSettings.currency);
  }, [userSettings.currency]);

  const historyDataQuery = useQuery({
    queryKey: ["overview", "history", timeframe, period],
    queryFn: () =>
      fetch(
        `/api/history-data?timeframe=${timeframe}&year=${period.year}&month=${period.month}`
      ).then((res) => res.json()),
  });
  const dataAvailable =
    historyDataQuery.data && historyDataQuery.data.length > 0;

  return (
  <TooltipProvider>
    <div className="container border-2 border-amber-600 rounded-lg mt-4">
      <h2 className="text-3xl font-bold mb-4 mt-4 flex items-center">History
        <Image src={"/images/Coin And Chart (HD).png"} width={90}  height={90} alt="History" className="ml-1"/>
        </h2>
      
      <Card className="mt-2 col-span-12 w-full">
        <CardHeader className="gap-2">
          <CardTitle className="gap-2 grid grid-flow-row justify-between md:grid-flow-col">
            <HistoryPeriodSelector
              period={period}
              setPeriod={setPeriod}
              timeframe={timeframe}
              setTimeframe={setTimeframe}
            />
            <div className="gap-2 flex h-10">
              <Badge
                variant={"outline"}
                className="flex gap-2 items-center text-sm"
              >
                <div className="h-4 w-4 rounded-full bg-emerald-500" />
                  <span>Income</span>
                
              </Badge>
              <Badge
                variant={"outline"}
                className="flex gap-2 items-center text-sm"
              >
                <div className="h-4 w-4 rounded-full bg-red-600" />
                <span>Expense</span>
              </Badge>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <SkeletonWrapper isLoading={historyDataQuery.isFetching}>
            {dataAvailable && (
              <ResponsiveContainer width={"100%"} height={300}>
                <BarChart
                  height={300}
                  data={historyDataQuery.data}
                  barCategoryGap={5}
                >
                  <defs>
                    <linearGradient id="incomeBar" x1="0" y1="0" x2="0" y2="1">
                      <stop
                        offset={"0"}
                        stopColor="#12d091"
                        stopOpacity={"1"}
                      />
                      <stop
                        offset={"1"}
                        stopColor="#12d091"
                        stopOpacity={"0"}
                      />
                    </linearGradient>
                    <linearGradient id="expenseBar" x1="0" y1="0" x2="0" y2="1">
                      <stop
                        offset={"0"}
                        stopColor="#eb1515"
                        stopOpacity={"1"}
                      />
                      <stop
                        offset={"1"}
                        stopColor="#eb1515"
                        stopOpacity={"0"}
                      />
                    </linearGradient>
                  </defs>
                  <CartesianGrid
                    stroke="5 5"
                    strokeOpacity={"0.2"}
                    vertical={false}
                  />
                  <XAxis
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    padding={{ left: 5, right: 5 }}
                    dataKey={(data) => {
                      const { year, month, day } = data;
                      const date = new Date(year, month, day || 1);
                      if (timeframe === "year") {
                        return date.toLocaleDateString("default", {
                          month: "long",
                        });
                      }
                      return date.toLocaleDateString("default", {
                        day: "2-digit",
                      });
                    }}
                  />
                  <YAxis
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <Bar
                    dataKey={"income"}
                    label="Income"
                    fill="url(#incomeBar)"
                    className="cursor-pointer"
                    radius={5}
                  />
                  <Bar
                    dataKey={"expense"}
                    label="Expense"
                    fill="url(#expenseBar)"
                    className="cursor-pointer"
                    radius={5}
                  />
                  <Tooltip
                    cursor={{ opacity: 0.4, radius:10}}
                    content={(props: any) => (
                      <CustomTooltip formatter={formatter} {...props} />
                    )}
                  />
                </BarChart>
              </ResponsiveContainer>
            )}
            {!dataAvailable && (
              <Card className="h-[300px] flex flex-col items-center justify-center bg-background">
                No Data For The Selected Period
                <p className="text-sm text-muted-foreground flex flex-col md:flex-col">
                  Try Selecting a Different Period Or Adding New Transactions
                </p>
                <Image src={"/images/Bar Chart.png"} alt={"Chart"} width={100} height={100} />            
                </Card>
            )}
          </SkeletonWrapper>
        </CardContent>
      </Card>
    </div>
    </TooltipProvider>
  );
}

export default History;

function CustomTooltip({ active, payload, formatter }: any) {
  console.log({ active, payload});
  if (!active || !payload || payload.length === 0) return null;

  const data = payload[0].payload;
  const { expense, income } = data;
  return (
    <div className="rounded border bg-background min-w-[300px] p-4 ">
      <TooltipRow
        formatter={formatter}
        label="Expense"
        value={expense}
        bgColor="bg-rose-500"
        textColor="text-rose-500"
      />
      <TooltipRow
        formatter={formatter}
        label="Income"
        value={income}
        bgColor="bg-emerald-500"
        textColor="text-emerald-500"
      />
      <TooltipRow
        formatter={formatter}
        label="Balance"
        value={income - expense}
        bgColor="bg-gray-200"
        textColor="text-foreground"
      />
    </div>
  );
}

function TooltipRow({
  label, value, bgColor, textColor, formatter
}: {
  label: string;
  textColor: string;
  bgColor: string;
  value: number;
  formatter: Intl.NumberFormat;
}) {
  const formattingFn = useCallback((value: number) => {
    return formatter.format(value);
  },
  [formatter]
 )
  return (
    <div className="flex gap-2 items-center">
      <div className={cn("w-4 h-4 rounded-full", bgColor)} />
      <div className="flex justify-between w-full">
        <p className="text-sm text-muted-foreground">{label}</p>
        <div className={cn("text-sm font-bold", textColor)}>
          <CountUp 
            duration={0.6}
            preserveValue
            end={value}
            decimals={0}
            formattingFn={formattingFn}
            className="text-sm"
            />
        </div>
      </div>
    </div>
  )
}
