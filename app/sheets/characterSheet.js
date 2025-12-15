

export default function characterSheet(){


    return(
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
    )
}
