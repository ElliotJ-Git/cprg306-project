"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import characterSheet from "./characterSheet";

export default function monster() {
    const router = useRouter();
    const [characters, setcharacters] = useState([]);
    const [search, setSearch] = useState("");

    const filteredCharacters = characters
        .filter((character) =>
            character.name.toLowerCase().includes(search.toLowerCase())
        );

    return (
        <div className="font-serif text-center space-y-6">
            <div className="flex justify-center gap-4">
                <input
                    type="text"
                    placeholder="Search characters..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="p-2 rounded bg-slate-900 text-white border border-amber-600"
                />
            </div>

            {filteredCharacters.length === 0 && (
                <span className="text-amber-400">No results match your search.</span>
            )}

            <ul className="grid grid-cols-3 justify-center items-start gap-16">
                 <li onClick={() => router.push("/sheets/create")} className="cursor-pointer bg-slate-700 rounded-2xl w-72 p-4 shadow-lg text-white h-80 flex flex-col justify-center items-center hover:bg-slate-600 transition">
                    <h2 className="text-2xl font-bold underline mb-4 text-red-500">
                        Create New Character
                    </h2>
                    <p className="text-8xl">+</p>
                </li>
                {filteredCharacters.map((character) => (
                    <characterSheet key={character.index} character={character} />
                ))}
            </ul>
        </div>
    );
}
