import * as Popover from "@radix-ui/react-popover";
import clsx from "clsx";
import { ProgressBar } from "./ProgressBar";

import dayjs from "dayjs";
import { HabitsList } from "./HabitsList";
import { useState } from "react";
interface HabitDayProps {
  date: Date;
  defaultCompleted?: number;
  amount?: number;
}
export function HabitDay({
  defaultCompleted = 0,
  amount = 0,
  date,
}: HabitDayProps) {
  const [completed, setcompleted] = useState(defaultCompleted);

  const completedPercentage =
    amount > 0 ? Math.round((completed / amount) * 100) : 0;

  const dayAndMonth = dayjs(date).format("DD/MM");
  const dayOfWeek = dayjs(date).format("dddd");

  const handleCompletedChanged = (completed: number) => {
    setcompleted(completed);
  };

  return (
    <Popover.Root>
      <Popover.Trigger
        className={clsx(
          "w-10 h-10 bg-zinc-900 border-2 border-zinc-600 rounded-lg",
          {
            "bg-zinc-900 border-2 border-zinc-600": completedPercentage === 0,
            "bg-violet-900 border-violet-900":
              completedPercentage > 0 && completedPercentage < 20,
            "bg-violet-800 border-violet-800":
              completedPercentage >= 20 && completedPercentage < 40,
            "bg-violet-700 border-violet-700":
              completedPercentage >= 40 && completedPercentage < 60,
            "bg-violet-600 border-violet-600":
              completedPercentage >= 60 && completedPercentage < 80,
            "bg-violet-500 border-violet-500": completedPercentage >= 80,
          }
        )}
      />

      <Popover.Portal>
        <Popover.Content className="min-w-[320px] p-6 rounded-2xl bg-zinc-700 flex flex-col">
          <span className="font-semibold text-zinc-400">{dayOfWeek}</span>
          <span className="mt-1 font-extrabold leading-tight text-3xl">
            {dayAndMonth}
          </span>
          <ProgressBar progress={completedPercentage} />

          <HabitsList date={date} onCompletedChange={handleCompletedChanged} />

          <Popover.Arrow height={8} width={16} className="fill-zinc-700" />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
