import Navigation from "@/components/layout/Navigation";
import { Calculator, Calendar, CreditCard, Settings, Smile, User } from "lucide-react";

import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator, CommandShortcut } from "@/components/ui/command";

export default function Home() {
  return (
    <>
      <Navigation route={[]} />
      <div className="grid justify-center items-center flex-1">
        <Command className="rounded-lg border shadow-md md:min-w-[450px]">
          <CommandInput placeholder="Type a command or search..." />
          <CommandList>
            <CommandEmpty>No repositories found.</CommandEmpty>
          </CommandList>
        </Command>
      </div>
    </>
  );
}
