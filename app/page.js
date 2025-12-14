"use client";

import { useState } from "react";
import Spell from "./spells/spell";
import Monster from "./monsters/monster";
import Sheet from "./sheets/sheet";

export default function Home() {

  const [menu, setMenuBy] = useState("home");

  function menuDisplay(){
    if(menu === "spell"){
      return (
        <div>
          <Spell/>
        </div>
      );
    
    } else if (menu === "charSheet"){
      return (
        <div>
          <Sheet/>
        </div>
      );
    
    } else if (menu === "monster"){
      return (
      <div>
        <Monster/>
      </div>
    )
    } else{
      return <h1>Home</h1>
    
    }
  }

  function handleMenuChange(event){
    setMenuBy(event.target.value);

  }

  const optionClass = "text-left text-sm";

  const changeToHome = (e) => {
    const $select = document.querySelector('#menu-select');
    $select.value = 'home';
    handleMenuChange({target: $select});
  };

  return (
    <main className="min-h-screen bg-gray-800">
      <div className="mb-8 pt-4 flex flex-col">
        <div className="mb-4 flex pl-8">
          <p className="font-serif text-sm">Welcome to my CPRG306-Project</p>
        </div>

          <div className="flex">
            <select id="menu-select" value={menu} onChange={handleMenuChange} className="cursor-pointer bg-red-700 hover:bg-red-600 text-white font-bold p-2 px-4 rounded w-35 h-15 mt-8 ml-8 text-center">
              <option value="home" className={optionClass}>Home</option>
              <option value="charSheet" className={optionClass}>Character Sheets</option>
              <option value="monster" className={optionClass}>Monsters</option>
              <option value="spell" className={optionClass}>Spells</option>
            </select>
          </div>

        <div className="mb-4 items-center flex flex-col">
            <h1 className="font-serif text-6xl font-bold text-emerald-600 p-3 hover:text-emerald-400 cursor-pointer" onClick={changeToHome}>Questlet</h1>
            <p className="font-serif text-s font-bold text-gray-300 ml-2">Your guide through Dungeons and Dragons</p>
        </div>
      </div>

      <div className="flex min-h-240 flex-col items-center">
        {menuDisplay()}
      </div>
    </main>
  );
}
