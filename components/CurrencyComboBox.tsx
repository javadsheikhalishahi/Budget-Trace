"use client"

import * as React from "react"

import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
} from "@/components/ui/drawer"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { useMediaQuery } from "@/hooks/use-media-query"
import { Currencies, Currency } from "@/lib/currencies"
import { UserSettings } from "@prisma/client"
import { useQuery } from "@tanstack/react-query"
import SkeletonWrapper from "./SkeletonWrapper"





export function CurrencyComboBox() {
  const [open, setOpen] = React.useState(false)
  const isDesktop = useMediaQuery("(min-width: 768px)")
  const [selectedOption, setSelectedOption] = React.useState<Currency | null>(
    null
  );

  const userSettings = useQuery<UserSettings>({
    queryKey: ["userSettings"],
    queryFn: () => fetch("/api/user-settings").then((res) => res.json()),
  });

 React.useEffect(() => {
  if (!userSettings.data) return;
  const userCurrency = Currencies.find(
    (Currency) => Currency.Value === userSettings.data.currency
  );
  if (userCurrency) setSelectedOption(userCurrency);
 }, [
   userSettings.data
 ]);

  if (isDesktop) {
    return (
      <SkeletonWrapper isLoading={userSettings.isFetching}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" className="w-[150px] justify-start outline hover:outline-amber-600">
            {selectedOption ? <>{selectedOption.Label}</> : <>+ Set currency</>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0" align="start">
          <OptionList setOpen={setOpen} setSelectedOption={setSelectedOption} />
        </PopoverContent>
      </Popover>
      </SkeletonWrapper>
    );
  }

  return (
    <SkeletonWrapper isLoading={userSettings.isFetching}>
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="outline" className="w-[150px] justify-start">
          {selectedOption ? <>{selectedOption.Label}</> : <>+ Set currency</>}
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mt-4 border-t">
          <OptionList setOpen={setOpen} setSelectedOption={setSelectedOption} />
        </div>
      </DrawerContent>
    </Drawer>
    </SkeletonWrapper>
  )
}

function OptionList({
  setOpen,
  setSelectedOption,
}: {
  setOpen: (open: boolean) => void
  setSelectedOption: (status: Currency | null) => void
}) {
  return (
    <Command>
      <CommandInput placeholder="Filter currency..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup>
          {Currencies.map((currency: Currency) => (
            <CommandItem
              key={currency.Value}
              value={currency.Value}
              onSelect={(value) => {
                setSelectedOption(
                  Currencies.find((priority) => priority.Value === value) || null
                )
                setOpen(false)
              }}
            >
              {currency.Label}
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  )
}
