"use client";

import { useEffect, useState } from "react";
import { getAllMonsters } from "../api/api";
import MonsterCard from "./monsterCard";

export default function monster() {
    const [monsters, setmonsters] = useState([]);
    const [search, setSearch] = useState("");
    const [sortOrder, setSortOrder] = useState("asc");

    useEffect(() => {
        getAllMonsters().then(setmonsters);
    }, []);

    const filteredmonsters = monsters
        .filter((monster) =>
            monster.name.toLowerCase().includes(search.toLowerCase())
        )
        .sort((a, b) => {
            if (sortOrder === "asc") {
                return a.name.localeCompare(b.name);
            } else {
                return b.name.localeCompare(a.name);
            }
        });

    return (
        <div className="font-serif text-center space-y-6">

            <div className="flex justify-center gap-4">
                <input
                    type="text"
                    placeholder="Search monsters..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="p-2 rounded bg-slate-900 text-white border border-amber-600"
                />

                <select
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value)}
                    className="p-2 rounded bg-slate-900 text-white border border-amber-600"
                >
                    <option value="asc">A → Z</option>
                    <option value="desc">Z → A</option>
                </select>
            </div>

            {filteredmonsters.length === 0 && (
                <span className="text-amber-400">No monsters match your search.</span>
            )}

            <ul className="grid grid-cols-3 justify-center items-start gap-16">
                {filteredmonsters.map((monster) => (
                    <MonsterCard key={monster.index} monster={monster} />
                ))}
            </ul>
        </div>
    );
}
