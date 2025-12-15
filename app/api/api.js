const BASE_URL = "https://www.dnd5eapi.co";

//Spells
export async function getAllSpells() {
  const spellIndexes = await fetch(BASE_URL + "/api/spells")
    .then(res => res.json());

  return spellIndexes.results;

}

//Monsters
export async function getAllMonsters() {
  const monsterIndexes = await fetch(BASE_URL + "/api/monsters")
    .then(res => res.json());

  return monsterIndexes.results;
}

//Character Sheet 
export async function getAllAlignments() {
  const alignmentIndexes = await fetch(BASE_URL + "/api/alignments")
    .then(res => res.json());

  return alignmentIndexes.results;
}

export async function getAllRaces() {
  const raceIndexes = await fetch(BASE_URL + "/api/races")
    .then(res => res.json());

  return raceIndexes.results;
}

export async function getAllClasses() {
  const classIndexes = await fetch(BASE_URL + "/api/classes")
    .then(res => res.json());

  return classIndexes.results;
}

export async function getAllBackgrounds() {
  const backgroundIndexes = await fetch(BASE_URL + "/api/backgrounds")
    .then(res => res.json()); 

  return backgroundIndexes.results;
}

export async function getAllProficiencies() {
  const proficiencyIndexes = await fetch(BASE_URL + "/api/proficiencies")
    .then(res => res.json());

  return proficiencyIndexes.results;
}

export async function getAllLanguages() {
  const languageIndexes = await fetch(BASE_URL + "/api/languages")
    .then(res => res.json());

  return languageIndexes.results;
}

export async function getClassDetails(classIndex) {
    const res = await fetch(`https://www.dnd5eapi.co/api/2014/classes/${classIndex}`);
    if (!res.ok) {
        throw new Error("Failed to fetch class details");
    }
    return res.json();
}
