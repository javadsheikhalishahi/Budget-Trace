"use client";
import { currentUser } from "@clerk/nextjs/server";
import Link from "next/link";
import { redirect } from "next/navigation";
import { CurrencyComboBox } from "../CurrencyComboBox";
import Logo from "../Logo";
import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Separator } from "../ui/separator";


async function page() {
  const user = await currentUser();
  if (!user) {
    redirect("/sign-in");
  }
  return (
    <div className="flex container max-w-2xl items-center justify-between gap-4 flex-col" suppressHydrationWarning={true}>
      <div className="text-center text-2xl">
      Welcome, <span className="ml-2 font-bold">{user.firstName}</span>
         
        
        <h2 className="text-center text-base mt-4 text-muted-foreground">
          Let &apos;s get start by setting up your currency
        </h2>
        <h3 className="text-center text-sm text-muted-foreground mt-2">
          You can change these setting at any time you want
        </h3>
      </div>
      <Separator />
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Currency</CardTitle>
          <CardDescription>
            Set your default currency for Transactions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <CurrencyComboBox />
        </CardContent>
      </Card>
      <Separator />
        <Button className="w-full" asChild>
          <Link href={"/"}>I&apos;m done! Take me to the dashboard</Link>
        </Button>
        <div className="mt-7">
          <Logo />
        </div>
    </div>
  );
}

export default page;