import * as Popover from "@radix-ui/react-popover";
import clsx from "clsx";
import { ProgressBar } from "./ProgressBar";
import * as Checkbox from "@radix-ui/react-checkbox";  
import { HiCheck } from "react-icons/hi";
interface HabitDayProps {
  completed: number;
  amount: number;
}
export function HabitDay({ completed, amount }: HabitDayProps) {
  const completedPercentage = Math.round((completed / amount) * 100);

  return (
    <Popover.Root>
      <Popover.Trigger
        className={clsx(
          "w-10 h-10 bg-zinc-900 border-2 border-zinc-600 rounded-lg",
          {
            "bg-zinc-900 border-2 border-zinc-600": completedPercentage === 0 ,
            "bg-violet-900 border-violet-900": completedPercentage > 0 && completedPercentage < 20,
            "bg-violet-800 border-violet-800": completedPercentage >= 20 && completedPercentage < 40,
            "bg-violet-700 border-violet-700": completedPercentage >= 40 && completedPercentage < 60,
            "bg-violet-600 border-violet-600": completedPercentage >= 60 && completedPercentage < 80,
            "bg-violet-500 border-violet-500": completedPercentage >= 80,
          }
        )}
      />

      <Popover.Portal>
        <Popover.Content className="min-w-[320px] p-6 rounded-2xl bg-zinc-700 flex flex-col">
          <span className="font-semibold text-zinc-400">terca-feira</span>
          <span className="mt-1 font-extrabold leading-tight text-3xl">
            19/01
          </span>
          <ProgressBar progress={completedPercentage} />

          <div className="mt-6 flex flex-col gap-3">
            <Checkbox.Root
            className="flex items-center group"  
            >
              <div className="h-8 w-8 rounded-lg flex items-center justify-center bg-zinc-900 border-2 border-zinc-800 group-data-[state=checked]:bg-green-500 group-data-[state=checked]:border-green-500">
                <Checkbox.Indicator>
                  <HiCheck size={20} style={{color: 'white'   }}/>
                </Checkbox.Indicator>
              </div>
              <span className="font-semibold text-xl text-white leading-tight ml-2 group-data-[state=checked]:line-through group-data-[state=checked]:text-zinc-400 ">Beber 2L de agua</span>
            </Checkbox.Root>

          </div>

          <Popover.Arrow height={8} width={16} className="fill-zinc-700" />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
