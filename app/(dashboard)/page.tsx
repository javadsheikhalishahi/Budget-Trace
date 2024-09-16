import { Button } from "@/components/ui/button";
import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import Image from "next/image";
import { redirect } from "next/navigation";
import CreateTransactionDialog from "./_components/CreateTransactionDialog";
import History from "./_components/History";
import Overview from "./_components/Overview";

async function page() {
  const user = await currentUser();
  if (!user) {
    redirect("/sign-in");
  }
  const userSettings = await prisma.userSettings.findUnique({
    where: {
      userId: user.id,
    },
  });
  if (!userSettings) {
    redirect("/wizard");
  }
  return (
    <div className="bg-background h-full">
      <div className="bg-card border-b">
        <div className="container flex flex-wrap justify-between items-center py-7 gap-5">
          <p className="text-4xl font-bold ">
            Hello, {user.firstName}!{" "}
            <span className="inline-block animate-wave">
              <Image
                className="inline-block ml-2"
                src="/images/8708751_emoji_wink_hello_smile_happy_icon.png"
                alt="Waving Hand"
                width={40}
                height={40}
              />
            </span>
          </p>
          <div className="flex gap-3 items-center">
            <CreateTransactionDialog trigger={ <Button
              variant={"outline"}
              className="btn relative inline-flex items-center justify-start overflow-hidden transition-all bg-gray-700 rounded-xl hover:bg-white group py-1.5 px-2.5"
            >
              <span className="w-56 h-48 rounded bg-emerald-500 absolute bottom-0 left-0 translate-x-full ease-out duration-500 transition-all translate-y-full mb-9 ml-9 group-hover:ml-0 group-hover:mb-32 group-hover:translate-x-0"></span>
              <span className="relative font-bold tracking-wide w-full text-left text-white transition-colors duration-300 ease-in-out group-hover:text-white">
                New income 🪙
              </span>
            </Button>}
            type="income"
            />

            <CreateTransactionDialog trigger= { <Button
              variant={"outline"}
              className="btn relative inline-flex items-center justify-start overflow-hidden transition-all bg-gray-700 rounded-xl hover:bg-white group py-1.5 px-2.5"
            >
              <span className="w-56 h-48 rounded bg-rose-500 absolute bottom-0 left-0 translate-x-full ease-out duration-500 transition-all translate-y-full mb-9 ml-9 group-hover:ml-0 group-hover:mb-32 group-hover:translate-x-0"></span>
              <span className="relative font-bold tracking-wide w-full text-left text-white transition-colors duration-300 ease-in-out group-hover:text-white">
                New expense 😠
              </span>
            </Button>}
            type="expense"
            />
            
          </div>
        </div>
      </div>
      <Overview userSettings={userSettings} />
      <History userSettings={userSettings} />
    </div>
  );
}

export default page;
