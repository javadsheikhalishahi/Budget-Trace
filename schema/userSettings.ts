import { Currencies } from "@/lib/currencies";
import { z } from "zod";

export const UpdateUserCurrencySchema = z.object({
  currency: z.custom((value) => {
    const found = Currencies.some((c) => c.Value === value);
    if (!found) {
      throw new Error("invalid currency: ${value}");
    }
    return value;
  }),
});
