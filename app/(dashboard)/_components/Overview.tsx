"use client";
import { DateRangePicker } from "@/components/ui/date-range-picker";
import { MAX_DATE_RANGE_DAYS } from "@/lib/constants";
import { UserSettings } from "@prisma/client";
import { differenceInDays, startOfMonth } from "date-fns";
import { useState } from "react";
import toast from "react-hot-toast";
import CategoriesStats from "./CategoriesStats";
import StatsCards from "./StatsCards";

function Overview({ userSettings }: { userSettings: UserSettings }) {
  const [dateRange, setDateRange] = useState<{
    [x: string]: string | Date | undefined;
    from: Date;
    to: Date;
  }>({
    from: startOfMonth(new Date()),
    to: new Date(),
  });
  return (
    <>
      <div className="container flex flex-wrap justify-between items-end gap-2 py-6">
        <h2 className="text-3xl font-extrabold">Overview</h2>
        <div className="flex items-center gap-2">
          <DateRangePicker
            initialDateFrom={dateRange.from}
            initialDateTo={dateRange.to}
            showCompare={false}
            onUpdate={(values) => {
              const { from, to } = values.range;
              if (!from || !to) return;
              if (differenceInDays(to, from) > MAX_DATE_RANGE_DAYS) {
                toast.error(
                  `The selected date range is too extensive. Max allowed range is ${MAX_DATE_RANGE_DAYS} days!!`,
                  {
                    style: {
                      borderRadius: "50px",
                      background: "#ff6262",
                      color: "#fff",
                    },
                  }
                );
                return;
              }
              setDateRange({ from, to });
            }}
          />
        </div>
      </div>
      <div className="container w-full flex flex-col gap-2">
      <StatsCards 
       userSettings ={userSettings}
       from={dateRange.from}
       to={dateRange.to}
       />

       <CategoriesStats 
       userSettings ={userSettings}
       from={dateRange.from}
       to={dateRange.to}
       />
       </div>
    </>
  );
}

export default Overview;
