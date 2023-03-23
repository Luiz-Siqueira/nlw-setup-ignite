import * as Checkbox from "@radix-ui/react-checkbox";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { HiCheck } from "react-icons/hi";
import { api } from "../lib/axios";

interface HabitsListProps {
  date: Date;
  onCompletedChange: (completed: number) => void;
}

interface HabitsInfo {
  possibleHabits: Array<{
    id: string;
    title: string;
    created_at: string;
  }>;
  completHabits: string[];
}

export function HabitsList({ date, onCompletedChange }: HabitsListProps) {
  const [habitsInfo, sethabitsInfo] = useState<HabitsInfo>();

  useEffect(() => {
    api
      .get("day", {
        params: {
          date: date.toISOString(),
        },
      })
      .then((response) => {
        sethabitsInfo(response.data);
      });
  }, []);

  const handleToggleHabit = async (habitId: string) => {
    const isHabitAlreadyCompleted = habitsInfo!.completHabits.includes(habitId);

    await api.patch(`/habits/${habitId}/toggle`);

    let completedHabits: string[] = [];

    if (isHabitAlreadyCompleted) {
      completedHabits = habitsInfo!.completHabits.filter(
        (id) => id !== habitId
      );

      sethabitsInfo({
        possibleHabits: habitsInfo!.possibleHabits,
        completHabits: completedHabits,
      });
    } else {
      completedHabits = [...habitsInfo!.completHabits, habitId];
    }

    sethabitsInfo({
      possibleHabits: habitsInfo!.possibleHabits,
      completHabits: completedHabits,
    });

    onCompletedChange(completedHabits.length);
  };

  const isDateInPast = dayjs(date).endOf("day").isBefore(new Date());

  return (
    <div className="mt-6 flex flex-col gap-3">
      {habitsInfo?.possibleHabits.map((habit) => {
        return (
          <Checkbox.Root
            onCheckedChange={() => handleToggleHabit(habit.id)}
            checked={habitsInfo.completHabits.includes(habit.id)}
            disabled={isDateInPast}
            key={habit.id}
            className="flex items-center gap-3 group focus:outline-none disabled:cursor-not-allowed"
          >
            <div className="h-8 w-8 rounded-lg flex items-center justify-center bg-zinc-900 border-2 border-zinc-800 group-data-[state=checked]:bg-green-500 group-data-[state=checked]:border-green-500 transition-colors group-focus:ring-2 group-focus:ring-violet-600 group-focus:ring-offset-2 group-focus:ring-offset-background">
              <Checkbox.Indicator>
                <HiCheck size={20} style={{ color: "white" }} />
              </Checkbox.Indicator>
            </div>
            <span className="font-semibold text-xl text-white leading-tight ml-2 group-data-[state=checked]:line-through group-data-[state=checked]:text-zinc-400 ">
              {habit.title}
            </span>
          </Checkbox.Root>
        );
      })}
    </div>
  );
}
