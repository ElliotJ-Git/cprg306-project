"use client";

import { useRouter } from "next/navigation";

export default function CharacterCard({ character }) {
  const router = useRouter();

  return (
    <li
      onClick={() => router.push(`/sheets/${character.id}`)}
      className="cursor-pointer bg-slate-700 rounded-2xl w-72 p-4 shadow-lg
                 text-white h-80 flex flex-col justify-center items-center
                 hover:bg-slate-600 transition"
    >
      <h2 className="text-2xl font-bold text-emerald-400 mb-2">
        {character.name}
      </h2>

      <p className="text-sm text-gray-300">
        {character.race}
      </p>

      <p className="text-sm text-gray-300">
        {character.class}
      </p>

      <p className="mt-4 text-xs text-gray-400">
        Level {character.level}
      </p>
    </li>
  );
}
