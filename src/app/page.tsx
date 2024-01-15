"use client";

import Favorite from "@/components/favorites";
import Generate from "@/components/generate";
import History from "@/components/history";
import { useState } from "react";

export default function Home() {
  const [tab, setTab] = useState<"gen" | "fav" | "his">("gen");
  return (
    <div className="flex flex-col items-center justify-center min-h-svh bg-gray-200 p-4">
      <main className="w-full m-4 sm:w-[400px] p-4 text-center bg-gray-100 rounded-xl">
        <h1 className="text-2xl font-bold mb-2">App Name Generator!</h1>
        <div className="flex flex-row justify-center gap-[2px]">
          <button className={`p-2 text-lg font-bold px-2 rounded-tl-lg rounded-bl-lg ${tab==="gen" ? "bg-indigo-500 text-white" : "bg-gray-200 text-gray-800"}`} onClick={() => setTab("gen")}>Generate</button>
          <button className={`p-2 text-lg font-bold px-2 ${tab==="fav" ? "bg-indigo-500 text-white" : "bg-gray-200 text-gray-800"}`} onClick={() => setTab("fav")}>Favorite</button>
          <button className={`p-2 text-lg font-bold px-2 rounded-tr-lg rounded-br-lg ${tab==="his" ? "bg-indigo-500 text-white" : "bg-gray-200 text-gray-800"}`} onClick={() => setTab("his")}>History</button>
        </div>

        <div className="h-[460px] mt-2">
          {tab === "gen" && <Generate />}
          {tab === "fav" && <Favorite />}
          {tab === "his" && <History />}
        </div>
      </main>
    </div>
  )
}