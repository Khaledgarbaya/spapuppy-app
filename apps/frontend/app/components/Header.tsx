import { format } from "date-fns";
import { Scissors } from "lucide-react";

export default function Header() {
  return (
    <header className="bg-puppy-purple text-white p-4 rounded-xl shadow-md flex items-center justify-between">
      <div className="flex items-center space-x-2">
        <Scissors className="h-8 w-8" />
        <div>
          <h1 className="text-2xl font-bold">Puppy Spa</h1>
          <p className="text-sm opacity-80">Waiting List Manager</p>
        </div>
      </div>
      <div className="text-right">
        <p className="text-sm opacity-80">Today's Date</p>
        <p className="font-semibold">{format(new Date(), "EEEE, MMMM d, yyyy")}</p>
      </div>
    </header>
  )
} 
