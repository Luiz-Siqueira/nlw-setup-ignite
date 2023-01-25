import { HiCheck } from "react-icons/hi";
export function NewHabitForm() {
  return (
    <form className="w-full flex flex-col mt-6">
      <label htmlFor="title">Qual seu comprometimento?</label>

      <input
        type="text"
        id="title"
        placeholder="ex.: Exercicios, dormir bem, etc..."
        className="p-4 rounded-lg mt-3 bg-zinc-800 text-white placeholder:text-zinc-400"
        autoFocus
      />

      <label htmlFor="" className="font-semibold leading-tight mt-4">
        Qual a recorrência ?
      </label>

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
