"use client";

import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getAllRaces, 
        getAllClasses, 
        getAllBackgrounds 
    } from "../../api/api";

export default function Home() {
    const router = useRouter();

    const [name, setName] = useState("");
    const [race, setRace] = useState("");
    const [charClass, setCharClass] = useState("");
    const [background, setBackground] = useState("");

    const [races, setRaces] = useState([]);
    const [classes, setClasses] = useState([]);
    const [backgrounds, setBackgrounds] = useState([]);

    useEffect(() => {
        getAllRaces().then(setRaces)
        getAllClasses().then(setClasses)
        getAllBackgrounds().then(setBackgrounds)
    }  , []);

    function changeToBase() {
        router.push("../");
    }

    return (
        <main className="min-h-screen bg-gray-800">
            <div className="mb-8 pt-4 flex flex-col">
                <div className="mb-4 flex pl-8">
                    <p className="font-serif text-sm">Welcome to my CPRG306-Project</p>
                </div>
                <div className="mb-4 items-center flex flex-col">
                    <h1 className="font-serif text-6xl font-bold text-emerald-600 p-3 hover:text-emerald-400 cursor-pointer" onClick={changeToBase}>Questlet</h1>
                    <p className="font-serif text-s font-bold text-gray-300 ml-2">Your guide through Dungeons and Dragons</p>
                </div>

                <div className="flex min-h-240 flex-col items-center">
                    <h1 className="text-3xl text-red-500 font-bold">Create Character</h1>

                    <input
                        className="w-full p-2 bg-slate-800 rounded"
                        placeholder="Character Name"
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />

                    <Select label="Race" value={race} onChange={setRace} options={races} />
                    <Select label="Class" value={charClass} onChange={setCharClass} options={classes} />
                    <Select label="Background" value={background} onChange={setBackground} options={backgrounds} />

                    <div className="flex justify-between">
                        <button
                            onClick={changeToBase}
                            className="px-4 py-2 bg-gray-600 rounded"
                        >
                            Cancel
                        </button>

                        <button
                            // onClick={saveCharacter}
                            className="px-4 py-2 bg-amber-600 rounded font-bold"
                        >
                            Save Character
                        </button>
                    </div>
                </div>
            </div>
        </main>
    );
}

function Select({ label, value, onChange, options }) {
    return (
        <div>
            <label className="block mb-1 text-amber-400">{label}</label>
            <select
                value={value}
                onChange={e => onChange(e.target.value)}
                className="w-full p-2 bg-slate-800 rounded"
            >
                <option value="">Select {label}</option>
                {options.map(opt => (
                    <option key={opt.index} value={opt.name}>
                        {opt.name}
                    </option>
                ))}
            </select>
        </div>
    );
}