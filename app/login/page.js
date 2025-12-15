"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const [username, setUsername] = useState("");
    const router = useRouter();

    useEffect(() => {
        const saved = localStorage.getItem("username");
        if (saved) {
            router.push("/");
        }
    }, [router]);

    function handleLogin() {
        if (!username.trim()) return;

        localStorage.setItem("username", username.trim());
        router.push("/");
    }

    function changeToBase() {
        router.push("../");
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
            </div>
            <div className="flex items-center justify-center ">
                <div className="bg-slate-800 border-2 border-black rounded-3xl p-8 w-96 text-center">
                    <p className="text-gray-300 mb-6">
                        Log in to save your characters
                    </p>

                    <input
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                        placeholder="Username"
                        className="w-full p-3 mb-4 rounded bg-gray-700 border-2 border-black text-white"
                    />

                    <button
                        onClick={handleLogin}
                        className="w-full bg-amber-600 hover:bg-amber-500 font-bold py-2 rounded"
                    >
                        Login
                    </button>
                </div>
            </div>
        </main>
    );
}
