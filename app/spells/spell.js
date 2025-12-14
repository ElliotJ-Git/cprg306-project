"use client";

import { useEffect, useState } from "react";
import { getAllSpells } from "../api/api";
import SpellCard from "./spellCard";

export default function Spell() {
    const [spells, setSpells] = useState([]);
    const [search, setSearch] = useState("");
    const [levelFilter, setLevelFilter] = useState("all");
    const [sortOrder, setSortOrder] = useState("asc");

    useEffect(() => {
        getAllSpells().then(setSpells);
    }, []);

    const filteredSpells = spells
        .filter((spell) =>
            spell.name.toLowerCase().includes(search.toLowerCase())
        )
        .filter((spell) =>
            levelFilter === "all" ? true : spell.level === Number(levelFilter)
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
                    placeholder="Search spells..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="p-2 rounded bg-slate-900 text-white border border-amber-600"
                />

                <select
                    value={levelFilter}
                    onChange={(e) => setLevelFilter(e.target.value)}
                    className="p-2 rounded bg-slate-900 text-white border border-amber-600"
                >
                    <option value="all">All Levels</option>
                    <option value="0">Level 0 (Cantrip)</option>
                    <option value="1">Level 1</option>
                    <option value="2">Level 2</option>
                    <option value="3">Level 3</option>
                    <option value="4">Level 4</option>
                    <option value="5">Level 5</option>
                    <option value="6">Level 6</option>
                    <option value="7">Level 7</option>
                    <option value="8">Level 8</option>
                    <option value="9">Level 9</option>
                </select>

                <select
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value)}
                    className="p-2 rounded bg-slate-900 text-white border border-amber-600"
                >
                    <option value="asc">A → Z</option>
                    <option value="desc">Z → A</option>
                </select>
            </div>

            {filteredSpells.length === 0 && (
                <span className="text-amber-400">No spells match your search.</span>
            )}

            <ul className="grid grid-cols-3 justify-center items-start gap-16">
                {filteredSpells.map((spell) => (
                    <SpellCard key={spell.index} spell={spell} />
                ))}
            </ul>
        </div>
    );
}
