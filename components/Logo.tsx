import { HandCoins } from "lucide-react";

function Logo() {
  return (
    <a href="/" className="flex items-center gap-2">
      <HandCoins className="stroke h-12 w-12 stroke-amber-500 stroke-[1.5]" />
      <p className="bg-gradient-to-r from-amber-600 to-orange-700 bg-clip-text text-3xl font-bold leading-tight tracking-tighter text-transparent">
        BudgetTrace</p>
    </a>
  );
}

export default Logo;
