"use client";
import { cn } from "@/lib/utils";
import { UserButton } from "@clerk/nextjs";
import { MenuSquare } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Logo, { LogoMobile } from "./Logo";
import { ThemeSwitcherBtn } from "./ThemeSwitcherBtn";
import { Button, buttonVariants } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";

function Navbar() {
  return (
    <>
      <DesktopNavbar />
      <MobileNavbar />
    </>
  );
}

const items = [
  { label: "Dashboard", link: "/" },
  { label: "Transactions", link: "/transactions" },
  { label: "Manage", link: "/manage" },
];

function MobileNavbar() {
   const [isOpen, setIsOpen] = useState(false);
    return (
      <div className="block border-separate bg-background md:hidden">
        <nav className="flex container items-center justify-between px-9">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant={"ghost"} size={"icon"} >
                <MenuSquare />
              </Button>
            </SheetTrigger>
            <SheetContent className="side=left w-[450px] sm:w-[540px]">
              <Logo />
              <div className="flex-col flex pt-4 gap-1">
                {items.map(items => <NavbarItem key={items.label} link={items.link} label={items.label}
                clickCallback={() => setIsOpen((prev) => !prev)}
                />)}
              </div>
            </SheetContent>
          </Sheet>
          <div className="h-[80px] min-h-[65px] flex gap-x-4 items-center">
            <LogoMobile />
          </div>
          <div className="items-center flex gap-2">
            <ThemeSwitcherBtn />
             <UserButton afterSignOutUrl="/sign-in" />
          </div>
        </nav>
      </div>
    );
   }

function DesktopNavbar() {
  return (
    <div className="hidden border-separate border-b bg-background md:block">
      <nav className="container flex items-center justify-between px-8">
        <div className="flex h-[80px] min-h-[60px] items-center gap-x-4">
          <Logo />
          <div className="flex h-full">
            {items.map((item) => (
              <NavbarItem
                key={item.label}
                link={item.link}
                label={item.label}
              />
            ))}
          </div>
        </div>
        <div className=" items-center flex gap-3">
          <ThemeSwitcherBtn />
          <UserButton afterSignOutUrl="/sign-in" />
        </div>
      </nav>
    </div>
  );
}

function NavbarItem({ link, label, clickCallback }: { link: string; label: string, clickCallback : () => void }) {
  const pathname = usePathname();
  const isActive = pathname === link;

  return (
    <div className="relative flex items-center">
      <Link
        href={link}
        className={cn(
          buttonVariants({ variant: "ghost" }),
          "w-full justify-start text-lg text-muted-foreground hover:text-foreground",
          isActive && "text-foreground"
        )}
        onClick={() => {
          if (clickCallback) clickCallback();
        }}
      >
        {label}
      </Link>
      {isActive && (
        <div className="absolute -bottom-[3px] hidden left-1/2 h-[3px] w-[80%] -translate-x-1/2 rounded-2xl bg-foreground md:block"></div>
      )}
    </div>
  );
}
export default Navbar;
