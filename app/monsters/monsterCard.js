"use client";

import { useState } from "react";

export default function MonsterCard({ monster }) {
    const [open, setOpen] = useState(false);
    const [details, setDetails] = useState(null);
    const [loading, setLoading] = useState(false);

    async function toggleDetails() {
        setOpen(prev => !prev);

        // fetch only once
        if (!open && !details) {
            setLoading(true);
            try {
                const res = await fetch("https://www.dnd5eapi.co" + monster.url);
                const data = await res.json();
                setDetails(data);
            } catch (err) {
                console.error("Error fetching monster:", err);
            }
            setLoading(false);
        }
    }

    return (
        <li className="bg-slate-700 rounded-2xl list-none w-72 p-4 shadow-lg text-white">
            
            {/* Header */}
            <div className="flex justify-between items-start cursor-pointer" onClick={toggleDetails}>
                <div className="m-1 items-center w-400">
                    <h4 className="text-red-500 text-lg font-bold">
                        {monster.name}
                    </h4>
                    {open&& (details && (
                        <p className="italic text-sm text-amber-400">
                            {details.size} {details.type}, {details.alignment}
                        </p>
                    ))}
                </div>

                <button
                    className="text-amber-400 hover:text-amber-300 text-xl"
                >
                    {open ? "▲" : "▼"}
                </button>
            </div>

            {open && (
                <div className="mt-4 p-3 bg-gray-900 rounded-xl">
                    {loading && (
                        <p className="text-amber-400">Loading...</p>
                    )}

                    {details && (
                        <div className="flex flex-col gap-2 text-sm">
                            <Detail label="AC" value={details.armor_class?.[0]?.value} />
                            <Detail label="HP" value={`${details.hit_points} (${details.hit_dice})`} />
                            <Detail label="Speed" value={details.speed?.walk} />
                            <Detail label="CR" value={details.challenge_rating} />
                            <Detail label="XP" value={details.xp} />

                            <div className="grid grid-cols-3 gap-2 mt-2 text-center">
                                <Stat label="STR" value={details.strength} />
                                <Stat label="DEX" value={details.dexterity} />
                                <Stat label="CON" value={details.constitution} />
                                <Stat label="INT" value={details.intelligence} />
                                <Stat label="WIS" value={details.wisdom} />
                                <Stat label="CHA" value={details.charisma} />
                            </div>

                            {details.actions?.length > 0 && (
                                <div className="mt-3">
                                    <p className="font-bold text-amber-300 mb-1">Actions</p>
                                    <ul className="space-y-2">
                                        {details.actions.map(action => (
                                            <li key={action.name}>
                                                <span className="font-semibold text-white">
                                                    {action.name}:
                                                </span>{" "}
                                                <span className="text-gray-300">
                                                    {action.desc}
                                                </span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            )}
        </li>
    );
}

/* Small helper components */

function Detail({ label, value }) {
    return (
        <div className="flex justify-between">
            <span className="font-semibold text-amber-300">{label}</span>
            <span>{value ?? "—"}</span>
        </div>
    );
}

function Stat({ label, value }) {
    return (
        <div className="bg-slate-800 rounded-lg p-2">
            <div className="text-amber-300 font-semibold">{label}</div>
            <div>{value}</div>
        </div>
    );
}
