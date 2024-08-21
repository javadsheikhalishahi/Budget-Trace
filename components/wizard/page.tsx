import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

async function page() {
    const user = await currentUser();
    if (!user) {
        redirect("/sign-in");
        
    }
  return (
     <div className="flex container max-w-2xl items-center justify-between gap-4 flex-col">
    <h1 className="text-center text-2xl">
        Welcome, <span className="ml-2 font-extrabold">{user.firstName}</span>
    </h1>
  </div>
  );
}

export default page;
