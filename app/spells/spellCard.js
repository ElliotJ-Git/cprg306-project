import { useState } from "react";

export default function SpellCard({ spell }) {
    const [open, setOpen] = useState(false);
    const [details, setDetails] = useState(null);
    const [loading, setLoading] = useState(false);

    async function toggleDetails() {
        setOpen(!open);

        // If opening AND no details have been fetched yet → fetch them
        if (!open && !details) {
            setLoading(true);
            try {
                const res = await fetch("https://www.dnd5eapi.co" + spell.url);
                const data = await res.json();
                setDetails(data);
            } catch (err) {
                console.error("Error fetching spell details:", err);
            }
            setLoading(false);
        }
    }

    return (
        <li className="bg-slate-700 rounded-2xl list-none w-72 p-4 shadow-lg text-white">
            
            {/* Header Section */}
            <div className="flex justify-between cursor-pointer" onClick={toggleDetails}>
                <div className="m-1 items-center w-400">
                    <h4 className="text-red-500 text-lg font-bold mb-1">
                        {spell.name}
                    </h4>
                    <p className="italic text-sm text-amber-400">
                        {spell.level > 0 && `Level ${spell.level} `}
                        {spell.level === 0 && " cantrip"}
                    </p>
                </div>

                <button
                    className="text-amber-400 hover:text-amber-300 text-xl"
                >
                    {open ? "▲" : "▼"}
                </button>
            </div>

            {/* Dropdown content */}
            {open && (
                <div className="mt-4 p-3 bg-gray-900 rounded-xl">
                    {loading && <p className="text-amber-400">Loading...</p>}

                    {details && (
                        <div className="flex flex-col gap-2 text-sm">
                            <Detail label="Level" value={details.level} />
                            <Detail label="School" value={details.school?.name} />
                            <Detail label="Casting Time" value={details.casting_time} />
                            <Detail label="Range" value={details.range} />
                            <Detail label="Components" value={details.components?.join(", ")} />
                            <Detail label="Duration" value={details.duration} />

                            {details.desc && (
                                <div className="mt-2">
                                    <p className="font-bold text-amber-300">Description</p>
                                    <p className="text-gray-300">
                                        {details.desc.join(" ")}
                                    </p>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            )}
        </li>
    );
}

function Detail({ label, value }) {
    return (
        <div className="flex justify-between">
            <span className="font-semibold text-amber-300">{label}</span>
            <span>{value ?? "—"}</span>
        </div>
    );
}
