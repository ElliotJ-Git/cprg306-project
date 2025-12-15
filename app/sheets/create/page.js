"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getAllRaces, 
        getAllClasses, 
        getAllBackgrounds, 
        getClassDetails,
    } from "../../api/api";

    const CUSTOM_RACE = {
        index: "custom-lineage",
        name: "Custom Lineage",
        isCustom: true,
    };


    const CUSTOM_BACKGROUND = {
        index: "custom-background",
        name: "Custom Background",
        isCustom: true,
    };

export default function Home() {
    const router = useRouter();

    const [name, setName] = useState("");
    const [charRace, setCharRace] = useState("");
    const [charClass, setCharClass] = useState("");
    const [raceDetails, setRaceDetails] = useState(null);

    const [charBackground, setCharBackground] = useState("");
    const [selectedSkills, setSelectedSkills] = useState([]);
    const [skillsToChoose, setSkillsToChoose] = useState(0);
    const [level, setLevel] = useState(1);
    const [abilityMethod, setAbilityMethod] = useState("standard");
    const [allSkills, setAllSkills] = useState([]);

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

    const [customRaceASI, setCustomRaceASI] = useState("");
    const [customRaceTrait, setCustomRaceTrait] = useState("");
    const [customRaceSkill, setCustomRaceSkill] = useState("");

    const [racialBonuses, setRacialBonuses] = useState({});
    const [races, setRaces] = useState([]);
    const [classes, setClasses] = useState([]);
    const [backgrounds, setBackgrounds] = useState([]);
    const [availableSkills, setAvailableSkills] = useState([]);
    const [backgroundSkills, setBackgroundSkills] = useState([]);

    const [customBackgroundSkills, setCustomBackgroundSkills] = useState([]);

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
        charBackground !== "" &&
        (charRace !== "Custom Lineage" ||
        (customRaceASI &&
        customRaceTrait &&
        (customRaceTrait !== "skill" || customRaceSkill)));

        
    const canProceedSkills =
        skillsToChoose > 0 &&
        selectedSkills.length === skillsToChoose &&
        (
            abilityMethod === "custom" ||
            (abilityMethod === "pointbuy" && pointBuyValid) ||
            (abilityMethod === "standard" && standardArrayValid)
        );

    const SKILL_TO_ABILITY = {
        Acrobatics: "DEX",
        AnimalHandling: "WIS",
        Arcana: "INT",
        Athletics: "STR",
        Deception: "CHA",
        History: "INT",
        Insight: "WIS",
        Intimidation: "CHA",
        Investigation: "INT",
        Medicine: "WIS",
        Nature: "INT",
        Perception: "WIS",
        Performance: "CHA",
        Persuasion: "CHA",
        Religion: "INT",
        SleightOfHand: "DEX",
        Stealth: "DEX",
        Survival: "WIS",
    };

    function abilityModifier(score) {
        return Math.floor((score - 10) / 2);
    }

    const finalAbilities = Object.fromEntries(
        Object.entries(abilities).map(([stat, value]) => [
            stat,
            value + (racialBonuses[stat] || 0),
        ])
    );

    function getProficiencyBonus(level) {
        if (level >= 17) return 6;
        if (level >= 14) return 5;
        if (level >= 9) return 4;
        if (level >= 5) return 3;
        return 2;
    }


    function isStandardArrayValid(abilities) {
        const values = Object.values(abilities).slice().sort((a, b) => b - a);
        const standard = [...STANDARD_ARRAY].sort((a, b) => b - a);

        return JSON.stringify(values) === JSON.stringify(standard);
    }

    useEffect(() => {
        getAllRaces().then(data => {
            const normalized = data.map(r => ({
                index: r.index,
                name: r.name,
            }));

            setRaces([...normalized, CUSTOM_RACE]);
        });

        

        getAllBackgrounds().then(data => {
            const normalized = data.map(b => ({
                index: b.index,
                name: b.name,
            }));

            setBackgrounds([...normalized, CUSTOM_BACKGROUND]);
        });

        getAllClasses().then(setClasses);
    }, []); 

    useEffect(() => {
        if (!charRace || charRace === "Custom Lineage") {
            setRaceDetails(null);
            return;
        }

        const raceIndex = races.find(r => r.name === charRace)?.index;
        if (!raceIndex) return;

        fetch(`https://www.dnd5eapi.co/api/2014/races/${raceIndex}`)
            .then(res => res.json())
            .then(data => {
                setRaceDetails(data);
            })
            .catch(console.error);
    }, [charRace, races]);


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


        if (charBackground === "Custom Background") {
            setBackgroundSkills(customBackgroundSkills);
            return;
        }


        fetch(`https://www.dnd5eapi.co/api/2014/backgrounds/${charBackground.toLowerCase()}`)
        .then(res => res.json())
        .then(data => {
            const skills = data.starting_proficiencies
            .filter(p => p.index.startsWith("skill-"))
            .map(p => p.name.replace("Skill: ", ""));
            setBackgroundSkills(skills);
        });
    }, [charBackground, customBackgroundSkills]);

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

    useEffect(() => {
        if (charRace === "Custom Lineage") {
            if (customRaceASI) {
                setRacialBonuses({ [customRaceASI]: 2 });
            } else {
                setRacialBonuses({});
            }
            return;
        }

        if (!raceDetails?.ability_bonuses) {
            setRacialBonuses({});
            return;
        }

        const bonuses = {};

        raceDetails.ability_bonuses.forEach(bonus => {
            const stat = bonus.ability_score.name;
            bonuses[stat] = bonus.bonus;
        });

        setRacialBonuses(bonuses);
    }, [charRace, raceDetails, customRaceASI]);


    useEffect(() => {
        getClassDetails("bard")
            .then(data => {
                const skillChoice = data.proficiency_choices.find(
                    pc => pc.from?.options?.[0]?.item?.index?.startsWith("skill")
                );

                if (!skillChoice) return;

                const skills = skillChoice.from.options.map(opt => ({
                    index: opt.item.index,
                    name: opt.item.name.replace("Skill: ", ""),
                }));

                setAllSkills(skills);
            })
            .catch(console.error);
    }, []);


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

                const swapStat = Object.keys(prev).find(
                    key => key !== stat && prev[key] === newValue
                );

                const updated = { ...prev };

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

    const proficiencyBonus = getProficiencyBonus(level);

    const proficientSkills = new Set([
        ...selectedSkills,
        ...backgroundSkills,
        ...(customRaceSkill ? [customRaceSkill] : []),
    ]);

    const allSkillRows = Object.keys(SKILL_TO_ABILITY).map(skill => {
        const ability = SKILL_TO_ABILITY[skill];
        const mod = abilityModifier(finalAbilities[ability]);
        const isProficient = proficientSkills.has(skill);

        return {
            name: skill,
            ability,
            bonus: mod + (isProficient ? proficiencyBonus : 0),
            proficient: isProficient,
        };
    });

    
    function toNext() {
        if (currentPage === "home") {
        return (
            <div className="flex flex-col items-center">
                <input
                className="w-80 p-2 bg-gray-700 rounded border-2 border-black text-white"
                placeholder="Character Name"
                value={name}
                onChange={e => setName(e.target.value)}
                />
                <div className="flex flex-row items-center">
                    <div className="flex flex-col items-center">
                        <Select label="Race" value={charRace} onChange={setCharRace} options={races} />
                        <Select label="Class" value={charClass} onChange={setCharClass} options={classes} />
                        <Select label="Background" value={charBackground} onChange={setCharBackground} options={backgrounds} />

                        {charRace === "Custom Lineage" && (
                            <div className="border-2 border-black p-4 m-4 rounded-2xl w-80 text-center">
                                <p className="text-amber-400 font-semibold mb-2">Custom Lineage</p>


                                <select value={customRaceASI} onChange={e => setCustomRaceASI(e.target.value)} className="p-2 bg-slate-800 rounded w-full mb-2">
                                    <option value="">+2 Ability Score</option>
                                    {Object.keys(abilities).map(stat => (
                                    <option key={stat} value={stat}>{stat}</option>
                                    ))}
                                </select>


                                <select value={customRaceTrait} onChange={e => setCustomRaceTrait(e.target.value)} className="p-2 bg-slate-800 rounded w-full mb-2">
                                    <option value="">Variable Trait</option>
                                    <option value="darkvision">Darkvision</option>
                                    <option value="skill">Skill Proficiency</option>
                                </select>


                                {customRaceTrait === "skill" && (
                                    <select value={customRaceSkill} onChange={e => setCustomRaceSkill(e.target.value)} className="p-2 bg-slate-800 rounded w-full">
                                        <option value="">Choose Skill</option>
                                        {availableSkills.map(skill => (
                                            <option key={skill.index} value={skill.name}>{skill.name}</option>
                                        ))}
                                    </select>
                                )}
                            </div>
                        )}
                    </div>
                    <div>
                        {charBackground === "Custom Background" && (
                            <SkillSelect
                                skills={allSkills}
                                selected={customBackgroundSkills}
                                setSelected={setCustomBackgroundSkills}
                                max={2}
                            />
                        )}
                    </div>
                </div>
                <div className="flex gap-2 p-4">
                    <button onClick={changeToBase} className="px-4 py-2 bg-gray-600 rounded">Cancel</button>
                    <button
                        disabled={!canProceedHome}
                        onClick={() => setCurrentPage("skills")}
                        className={`px-4 py-2 rounded font-bold ${canProceedHome ? "bg-amber-600" : "bg-gray-500"}`}
                    >
                        Next
                    </button>
                </div>
            </div>
        );} if (currentPage === "skills") {
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
                        onClick={() => setCurrentPage("saving")}
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
        )} if (currentPage === "saving") {
        return (
            <div className="flex flex-col items-center w-full">
                <h2 className="text-3xl font-bold text-emerald-400 mb-4">
                    Character Summary
                </h2>
                <div className="flex flex-row h-180">
                    <div>
                        <div className="border-2 border-black rounded-2xl p-4 m-2 w-96 bg-slate-700">
                            <p><strong>Name:</strong> {name}</p>
                            <p><strong>Race:</strong> {charRace}</p>
                            <p><strong>Class:</strong> {charClass}</p>
                            <p><strong>Background:</strong> {charBackground}</p>
                            <p><strong>Level:</strong> {level}</p>
                            <p><strong>Ability Method:</strong> {abilityMethod}</p>
                        </div>

                        <div className="border-2 border-black rounded-2xl p-4 m-2 w-96 bg-slate-700">
                            <p className="text-amber-400 font-bold mb-2">Ability Scores</p>

                            <div className="grid grid-cols-2 gap-2">
                                {Object.entries(finalAbilities).map(([stat, value]) => (
                                    <div
                                        key={stat}
                                        className="flex justify-between bg-slate-800 px-3 py-1 rounded"
                                    >
                                        <span>{stat}</span>
                                        <span className="font-bold">{value}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="">
                        <div className="border-2 border-black rounded-2xl p-4 m-2 w-[26rem] bg-slate-700">
                            <p className="text-amber-400 font-bold text-center">
                                Skills 
                            </p>
                            <p className="text-amber-400 font-bold mb-3 text-center text-sm">
                                PB: (+{proficiencyBonus})
                            </p>

                            <div className="grid grid-cols-2 gap-2">
                                {allSkillRows.map(skill => (
                                    <div
                                        key={skill.name}
                                        className={`flex justify-between px-3 py-1 rounded text-sm
                                            ${skill.proficient
                                                ? "bg-emerald-700 font-bold"
                                                : "bg-slate-800"}
                                        `}
                                    >
                                        <span>
                                            {skill.name}
                                            <span className="text-xs text-gray-300 ml-1">
                                                ({skill.ability})
                                            </span>
                                        </span>

                                        <span>
                                            {skill.bonus >= 0 ? "+" : ""}
                                            {skill.bonus}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex gap-4 mt-6 mb-8">
                    <button
                        onClick={() => setCurrentPage("skills")}
                        className="px-4 py-2 bg-gray-600 rounded"
                    >
                        Back
                    </button>

                    <button
                        onClick={() => console.log("SAVE CHARACTER HERE")}
                        className="px-4 py-2 bg-amber-600 rounded font-bold hover:bg-amber-500"
                    >
                        Save Character
                    </button>
                </div>
            </div>
        );}
    }

    return ( 
        <main className="min-h-screen bg-gray-800"> 
            <div className="mb-4 flex pl-8 items pt-4"> 
                <p className="font-serif text-sm">
                    Welcome to my CPRG306-Project
                </p> 
            </div> 
            <div className="mb-8 pt-4 flex flex-col items-center"> 
                <div className="mb-4 items-center flex flex-col"> 
                    <h1 className="font-serif text-6xl font-bold text-emerald-600 p-3 hover:text-emerald-400 cursor-pointer" onClick={changeToBase}>
                        Questlet
                    </h1> 
                    <p className="font-serif text-s font-bold text-gray-300 ml-2">
                        Your guide through Dungeons and Dragons
                    </p>
                </div> 
                <div className="flex bg-slate min-h-200 w-300 flex-col items-center border-3 border-black rounded-3xl bg-slate-800"> 
                    <h1 className="text-3xl text-red-500 font-bold p-4 underline">
                        Create Character
                    </h1> {toNext()} 
                </div> 
            </div>
        </main> 
    ); 
}


function Select({ label, value, onChange, options }) {
    return (
        <div className="border-2 border-black p-4 m-4 rounded-2xl w-56 items-center text-center">
            <label className="block mb-1 text-amber-400">{label}</label>

            <select
                value={value}
                onChange={e => onChange(e.target.value)}
                className="p-4 bg-slate-800 rounded text-center items-center cursor-pointer border-2 border-black"
            >
                <option value="">Select {label}</option>

                {options?.map(opt => (
                    <option
                        key={`${label}-${opt.index}`}
                        value={opt.name}
                    >
                        {opt.name}
                    </option>
                ))}
            </select>
        </div>
    );
}
