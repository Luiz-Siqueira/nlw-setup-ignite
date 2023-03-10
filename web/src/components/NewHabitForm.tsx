import { HiCheck } from "react-icons/hi";
import * as Checkbox from "@radix-ui/react-checkbox";
import { FormEvent, useState } from "react";
import { api } from "../lib/axios";

const availabeWeekDays = [
  "Doming",
  "Segunda-feira",
  "Terça-feira",
  "Quarta-feira",
  "Quinta-feira",
  "Sexta-feira",
  "Sabado-feira",
];

export function NewHabitForm() {
  const [title, setTitle] = useState("");
  const [weekDays, setWeekDays] = useState<number[]>([]);

  const createNewHabit = async (event: FormEvent) => {
    event.preventDefault();

    if (!title || weekDays.length === 0) return;

    await api.post("habits", {
      title,
      weekDays,
    });

    setTitle("");
    setWeekDays([]);
    alert("Habito cadastrado com sucesso");
  };

  const handleToggleWeekDay = (weekDay: number) => {
    //adicionar ou remover da lista

    if (weekDays.includes(weekDay)) {
      const weekDaysWithRemoveOne = weekDays.filter((day) => day !== weekDay);

      setWeekDays(weekDaysWithRemoveOne);
    } else {
      const weekDaysWithAddOne = [...weekDays, weekDay];

      setWeekDays(weekDaysWithAddOne);
    }
  };

  return (
    <form onSubmit={createNewHabit} className="w-full flex flex-col mt-6">
      <label htmlFor="title">Qual seu comprometimento?</label>

      <input
        type="text"
        id="title"
        placeholder="ex.: Exercicios, dormir bem, etc..."
        className="p-4 rounded-lg mt-3 bg-zinc-800 text-white placeholder:text-zinc-400"
        autoFocus
        value={title}
        onChange={(event) => setTitle(event.target.value)}
      />

      <label htmlFor="" className="font-semibold leading-tight mt-4">
        Qual a recorrência ?
      </label>

      <div className="flex flex-col gap-2 mt-3">
        {availabeWeekDays.map((weekday, index) => {
          return (
            <Checkbox.Root
              onCheckedChange={() => handleToggleWeekDay(index)}
              key={weekday}
              checked={weekDays.includes(index)}
              className="flex items-center group"
            >
              <div className="h-8 w-8 rounded-lg flex items-center justify-center bg-zinc-900 border-2 border-zinc-800 group-data-[state=checked]:bg-green-500 group-data-[state=checked]:border-green-500">
                <Checkbox.Indicator>
                  <HiCheck size={20} style={{ color: "white" }} />
                </Checkbox.Indicator>
              </div>
              <span className="text-white leading-tight ml-2">{weekday}</span>
            </Checkbox.Root>
          );
        })}
      </div>

      <button
        type="submit"
        className="mt-6 rounded-lg p-4 flex items-center justify-center gap-3 font-semibold bg-green-600 hover:bg-green-500"
      >
        <HiCheck size={20} fontWeight="bold" />
        confirmar
      </button>
    </form>
  );
}
