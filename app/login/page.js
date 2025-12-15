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

  return (
    <main className="min-h-screen bg-gray-800 flex items-center justify-center">
      <div className="bg-slate-800 border-2 border-black rounded-3xl p-8 w-96 text-center">
        <h1 className="text-3xl font-bold text-emerald-500 mb-4">
          Questlet
        </h1>

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
    </main>
  );
}
