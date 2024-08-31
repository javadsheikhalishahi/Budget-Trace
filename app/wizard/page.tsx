
import { CurrencyComboBox } from "@/components/CurrencyComboBox";
import Logo from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { currentUser } from "@clerk/nextjs/server";
import Link from "next/link";
import { redirect } from "next/navigation";


async function page() {
  const user = await currentUser();
  if (!user) {
    redirect("/sign-in");
  }
  return (
    <div className="flex container max-w-2xl items-center justify-between gap-4 flex-col" suppressHydrationWarning={true}>
        <div>
      <h1 className="text-center text-3xl font-medium bg-gradient-to-r from-amber-600 to-orange-800 rounded-3xl pt-4 pb-4 animate-bounce">
      Welcome,<span className="ml-2 font-bold ">{user.firstName}!👋</span>
       </h1>  
        
        <h2 className="text-center text-base mt-4 text-muted-foreground">
          Let&apos;s get start by setting up your currency
        </h2>
        <h3 className="text-center text-sm text-muted-foreground mt-2">
          You can change these setting at any time you want
        </h3>
      </div>
      <Separator />
      <Card className="w-full border-solid border-2 border-amber-600 shadow-2xl shadow-amber-600/20">
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
        <Button className="w-full mt-3" asChild>
          <Link href={"/"}>I&apos;m done! Take me to the dashboard</Link>
        </Button>
        <div className="mt-6 animate-slow-pulse">
          <Logo />
        </div>
    </div>
  );
}

export default page;