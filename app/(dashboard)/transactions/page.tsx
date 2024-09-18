"use client";
import { DateRangePicker } from "@/components/ui/date-range-picker";
import { MAX_DATE_RANGE_DAYS } from "@/lib/constants";
import { differenceInDays, startOfMonth } from "date-fns";
import { useState } from "react";
import toast from "react-hot-toast";
import TransactionTable from "./_components/TransactionTable";

function TransactionPage() {
  const [dateRange, setDateRange] = useState<{ from: Date; to: Date }>({
    from: startOfMonth(new Date()),
    to: new Date(),
  });
  return (
    <>
      <div className="bg-card border-b-4 border-t-4">
        <div className="container flex flex-wrap justify-between items-center py-8 gap-6">
          <div>
            <p className="text-4xl font-bold">Transaction History</p>
          </div>
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
      <div className="container">
        <TransactionTable from={dateRange.from} to={dateRange.to} />
      </div>
    </>
  );
}

export default TransactionPage;
