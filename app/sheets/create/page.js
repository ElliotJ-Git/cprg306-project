"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getAllRaces, 
        getAllClasses, 
        getAllBackgrounds, 
        getClassDetails,
    } from "../../api/api";

export default function Home() {
    const router = useRouter();

    const [name, setName] = useState("");
    const [charRace, setCharRace] = useState("");
    const [charClass, setCharClass] = useState("");
    const [charBackground, setCharBackground] = useState("");
    const [selectedSkills, setSelectedSkills] = useState([]);
    const [skillsToChoose, setSkillsToChoose] = useState(0);
    const [level, setLevel] = useState(1);
    const [abilityMethod, setAbilityMethod] = useState("standard");

    const [abilities, setAbilities] = useState({
        STR: 15,
        DEX: 14,
        CON: 13,
        INT: 12,
        WIS: 10,
        CHA: 8
    });

    const STANDARD_ARRAY = [15, 14, 13, 12, 10, 8];

    const POINT_BUY_COSTS = {
        8: 0,
        9: 1,
        10: 2,
        11: 3,
        12: 4,
        13: 5,
        14: 7,
        15: 9
    };

    const [races, setRaces] = useState([]);
    const [classes, setClasses] = useState([]);
    const [backgrounds, setBackgrounds] = useState([]);
    const [availableSkills, setAvailableSkills] = useState([]);
    const [backgroundSkills, setBackgroundSkills] = useState([]);

    const [currentPage, setCurrentPage] = useState("home");

    const pointBuyValid =
        abilityMethod !== "pointbuy" ||
        calculatePointBuyCost(abilities) === 27;

    const standardArrayValid =
        abilityMethod !== "standard" ||
        isStandardArrayValid(abilities);

    const canProceedHome =
        name.trim() !== "" &&
        charRace !== "" &&
        charClass !== "" &&
        charBackground !== "";

        
    const canProceedSkills =
        skillsToChoose > 0 &&
        selectedSkills.length === skillsToChoose &&
        (
            abilityMethod === "custom" ||
            (abilityMethod === "pointbuy" && pointBuyValid) ||
            (abilityMethod === "standard" && standardArrayValid)
        );


    function customRace(){
        // races.push();
    }

    function customBackground(){
        // background.push();
    }

    function isStandardArrayValid(abilities) {
        const values = Object.values(abilities).slice().sort((a, b) => b - a);
        const standard = [...STANDARD_ARRAY].sort((a, b) => b - a);

        return JSON.stringify(values) === JSON.stringify(standard);
    }

    useEffect(() => {
        getAllRaces().then(setRaces)
        customRace()
        getAllClasses().then(setClasses)
        getAllBackgrounds().then(setBackgrounds)
        customBackground()
    }  , []);

    useEffect(() => {
        if (!charClass) return;

        getClassDetails(charClass.toLowerCase())
        .then(data => {
            const skillChoice = data.proficiency_choices.find(
                pc => pc.from?.options?.[0]?.item?.index?.startsWith("skill")
            );

            if (!skillChoice) return;

            setSkillsToChoose(skillChoice.choose);

            const skills = skillChoice.from.options
                .map(opt => ({
                    index: opt.item.index,
                    name: opt.item.name.replace("Skill: ", "")
                }))
                .filter(skill => !backgroundSkills.includes(skill.name));

            setAvailableSkills(skills);
            setSelectedSkills([]);
        })
        .catch(console.error);
        }, [charClass, backgroundSkills]);

    useEffect(() => {
        if (!charBackground) return;
        fetch(`https://www.dnd5eapi.co/api/2014/backgrounds/${charBackground.toLowerCase()}`)
            .then(res => res.json())
            .then(data => {
                const skills = data.starting_proficiencies
                    .filter(p => p.index.startsWith("skill-"))
                    .map(p => p.name.replace("Skill: ", ""));

                setBackgroundSkills(skills);
            })
            .catch(console.error);
    }, [charBackground]);

    useEffect(() => {
        if (abilityMethod === "standard") {
            setAbilities({
                STR: 15,
                WIS: 10,
                DEX: 14,
                INT: 12,
                CON: 13,
                CHA: 8
            });
        } else {
            setAbilities({
                STR: 8,
                WIS: 8,
                DEX: 8,
                INT: 8,
                CON: 8,
                CHA: 8
            });
        }
    }, [abilityMethod]);

    function changeToBase() {
        router.push("../");
    }

    function calculatePointBuyCost(abilities) {
        return Object.values(abilities).reduce(
            (sum, score) => sum + (POINT_BUY_COSTS[score] ?? 0),
            0
        );
    }

    function SkillSelect({ skills, selected, setSelected, max }) {
        function toggleSkill(skill) {
            if (selected.includes(skill)) {
                setSelected(selected.filter(s => s !== skill));
            } else if (selected.length < max) {
                setSelected([...selected, skill]);
            }
        }
        return (
            <div className="border-2 border-black p-4 m-4 rounded-2xl w-80 text-center">
                <p className="text-amber-400 mb-2">
                    Choose {max} Skills ({selected.length}/{max})
                </p>

                <div className="grid grid-cols-2 gap-2">
                    {skills.map(skill => (
                        <button
                            key={skill.index}
                            onClick={() => toggleSkill(skill.name)}
                            className={`p-2 rounded text-sm border
                                ${selected.includes(skill.name)
                                    ? "bg-amber-600 font-bold"
                                    : "bg-slate-700 hover:bg-slate-600"}
                            `}
                        >
                            {skill.name}
                        </button>
                    ))}
                </div>
            </div>
        );
    }

    function LevelSelect({ level, setLevel }) {
        return (
            <select
                value={level}
                onChange={e => setLevel(Number(e.target.value))}
                className="p-4 bg-slate-800 rounded text-center cursor-pointer border-2 border-black"
            >
                {Array.from({ length: 20 }, (_, i) => i + 1).map(lvl => (
                    <option key={lvl} value={lvl}>
                        Level {lvl}
                    </option>
                ))}
            </select>
        );
    }

    function AbilityMethodSelect({ method, setMethod }) {
        return (
            <div className="mb-3">
                <label className="block text-amber-400 mb-1">Ability Score Method</label>
                <select
                    value={method}
                    onChange={e => setMethod(e.target.value)}
                    className="p-2 bg-slate-800 rounded border-2 border-black cursor-pointer"
                >
                    <option value="standard">Standard Array</option>
                    <option value="pointbuy">Point Buy</option>
                    <option value="custom">Custom</option>
                </select>
            </div>
        );
    }

    function AbilityScores({ abilities, setAbilities, method }) {
        const totalCost = calculatePointBuyCost(abilities);
        const remaining = 27 - totalCost;

        function updateStandard(stat, newValue) {
            setAbilities(prev => {
                newValue = Number(newValue);

                // Find the stat currently using the selected value
                const swapStat = Object.keys(prev).find(
                    key => key !== stat && prev[key] === newValue
                );

                // Clone abilities
                const updated = { ...prev };

                // Swap values if needed
                if (swapStat) {
                    updated[swapStat] = prev[stat];
                }

                updated[stat] = newValue;

                return updated;
            });
        }


        function updateAbility(stat, delta) {
            setAbilities(prev => {
                const current = prev[stat];
                const next = current + delta;

                if (method === "standard") return prev;

                if (method === "custom") {
                    if (next < 1 || next > 20) return prev;
                    return { ...prev, [stat]: next };
                }

                if (method === "pointbuy") {
                    if (next < 8 || next > 15) return prev;

                    const newCost =
                        totalCost -
                        POINT_BUY_COSTS[current] +
                        POINT_BUY_COSTS[next];

                    if (newCost > 27) return prev;

                    return { ...prev, [stat]: next };
                }

                return prev;
            });
        }

        return (
            <div>
                {method === "pointbuy" && (
                    <p
                        className={`text-center mb-2 font-bold ${
                            remaining === 0 ? "text-emerald-400" : "text-red-400"
                        }`}
                    >
                        Points Remaining: {remaining}
                    </p>
                )}

                {method === "standard" && !isStandardArrayValid(abilities) && (
                    <p className="text-center mb-2 text-red-400 font-bold">
                        Standard Array must use: 15, 14, 13, 12, 10, 8
                    </p>
                )}

                <div className="grid grid-cols-2 gap-3">
                    {Object.entries(abilities).map(([stat, value]) => (
                        <div
                            key={stat}
                            className="flex justify-between items-center"
                        >
                            <span className="font-bold">{stat}</span>

                            {method === "standard" ? (
                                <select
                                    value={value}
                                    onChange={e => updateStandard(stat, e.target.value)}
                                    className="p-1 bg-slate-800 border-2 border-black rounded text-center cursor-pointer"
                                >
                                    {STANDARD_ARRAY.map(v => (
                                        <option key={v} value={v}>
                                            {v}
                                        </option>
                                    ))}
                                </select>

                            ) : (
                                <div className="flex gap-1">
                                    <button
                                        disabled={
                                            (method === "pointbuy" && value <= 8) ||
                                            (method === "custom" && value <= 1)
                                        }
                                        onClick={() =>
                                            updateAbility(stat, -1)
                                        }
                                        className="px-2 bg-gray-600 rounded disabled:opacity-40"
                                    >
                                        −
                                    </button>

                                    <span className="w-8 text-center">
                                        {value}
                                    </span>

                                    <button
                                        disabled={
                                            (method === "pointbuy" &&
                                                (value >= 15 ||
                                                    remaining <
                                                        POINT_BUY_COSTS[value + 1] -
                                                            POINT_BUY_COSTS[value])) ||
                                            (method === "custom" && value >= 20)
                                        }
                                        onClick={() =>
                                            updateAbility(stat, 1)
                                        }
                                        className="px-2 bg-gray-600 rounded disabled:opacity-40"
                                    >
                                        +
                                    </button>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        );
    }
    
    function toNext(){
        if(currentPage === "home"){
        return(
            <div className="flex flex-col items-center">
                <input
                    className="w-80 p-2 bg-gray-700 rounded border-2 border-black text-white"
                    placeholder="Character Name"
                    value={name}
                    onChange={e => setName(e.target.value)}
                />
                    
                <div>
                    <Select label="Race" value={charRace} onChange={setCharRace} options={races}/>
                    <Select label="Class" value={charClass} onChange={setCharClass} options={classes}/>
                    <Select label="Background" value={charBackground} onChange={setCharBackground} options={backgrounds}/>
                </div>
                <div className="flex justify-between gap-2 p-4 mb-8">
                    <button
                        onClick={changeToBase}
                        className="px-4 py-2 bg-gray-600 rounded cursor-pointer"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={() => setCurrentPage("skills")}
                        disabled={!canProceedHome}
                        className={`px-4 py-2 rounded font-bold transition
                            ${canProceedHome
                                ? "bg-amber-600 hover:bg-amber-500 transition cursor-pointer"
                                : "bg-gray-500 transition"}
                        `}
                    >
                        Next
                    </button>

                </div>
            </div>
        )
        } else 
        if (currentPage === "skills"){
        return(
            <div className="flex flex-col items-center">
                <p className="text-3xl max-w-xl text-center font-bold p-8">
                    {name}
                </p>
                
                <div className="flex justify-center">
                    <LevelSelect level={level} setLevel={setLevel} />
                </div>

                <div className="flex flex-row">
                    {availableSkills.length > 0 && (
                        <SkillSelect
                            skills={availableSkills}
                            selected={selectedSkills}
                            setSelected={setSelectedSkills}
                            max={skillsToChoose}
                            />
                        )}

                    {backgroundSkills.length > 0 && (
                        <div className="mb-4 border-2 border-black p-4 m-4 rounded-2xl w-80 text-center">
                            <p className="text-amber-400 font-semibold">Background Skills</p>
                            <div className="flex gap-2 flex-wrap justify-center mt-2">
                                {backgroundSkills.map(skill => (
                                    <span
                                        key={skill}
                                        className="px-3 py-1 rounded bg-emerald-700 text-sm font-bold"
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    <div className="border-2 border-black p-4 m-4 rounded-2xl w-80 items-center flex flex-col">
                        <p className="text-amber-400 font-semibold text-center">
                            Ability Scores
                        </p>

                        <AbilityMethodSelect
                            method={abilityMethod}
                            setMethod={setAbilityMethod}
                        />

                        <AbilityScores
                            abilities={abilities}
                            setAbilities={setAbilities}
                            method={abilityMethod}
                        />
                    </div>

                    </div>
                    <div className="flex justify-between gap-2 p-4 mb-8">
                        <button
                            onClick={() => setCurrentPage("home")}
                            className="px-4 py-2 bg-gray-600 rounded"
                        >
                            Back
                        </button>

                        <button
                            disabled={!canProceedSkills}
                            onClick={() => setCurrentPage("nextStep")}
                            className={`px-4 py-2 rounded font-bold
                                ${canProceedSkills
                                    ? "bg-amber-600 hover:bg-amber-500 cursor-pointer"
                                    : "bg-gray-500 "}
                            `}
                        >
                            Next
                        </button>
                    </div>
                </div>
            )
        }  
    }

    return (
        <main className="min-h-screen bg-gray-800">
            <div className="mb-4 flex pl-8 items pt-4">
                    <p className="font-serif text-sm">Welcome to my CPRG306-Project</p>
            </div>
            <div className="mb-8 pt-4 flex flex-col items-center">
                <div className="mb-4 items-center flex flex-col">
                    <h1 className="font-serif text-6xl font-bold text-emerald-600 p-3 hover:text-emerald-400 cursor-pointer" onClick={changeToBase}>Questlet</h1>
                    <p className="font-serif text-s font-bold text-gray-300 ml-2">Your guide through Dungeons and Dragons</p>
                </div>

                <div className="flex bg-slate min-h-200 w-300 flex-col items-center border-3 border-black rounded-3xl bg-slate-800">
                    <h1 className="text-3xl text-red-500 font-bold p-4 underline">Create Character</h1>
                    {toNext()}
                </div>
            </div>
        </main>
    );
}

function Select({ label, value, onChange, options }) {
    return (
        <div className="border-2 border-black p-4 m-4 rounded-2xl w-56 items-center text-center">
            <label className="block mb-1 text-amber-400 ">{label}</label>
            <select value={value} onChange={e => onChange(e.target.value)} className="p-4 bg-slate-800 rounded text-center cursor-pointer border-2 border-black">
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