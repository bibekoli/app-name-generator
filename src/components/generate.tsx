"use client";

import { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { useCookies } from "react-cookie";

export default function Generate() {
  const [startWith, setStartWith] = useState("");
  const [endWith, setEndWith] = useState("");
  const [exclude, setExclude] = useState([""]);
  const [length, setLength] = useState(8);
  const [allowRepeat, setAllowRepeat] = useState(false);
  const [result, setResult] = useState("");
  const [favorite, setFavorite] = useCookies(["favorite"]);
  const [history, setHistory] = useCookies(["history"]);

  useEffect(() => {
    generate();
  }, []);

  function generate() {
    const getRandomChar = () => {
      let alphabet = "abcdefghijklmnopqrstuvwxyz";
      alphabet = alphabet.replace(new RegExp(`[${exclude.join("")}]`, "g"), "");
      return alphabet[Math.floor(Math.random() * alphabet.length)];
    };
    let result = startWith;
    while (result.length < length - endWith.length) {
      const randomChar = getRandomChar();
      if (allowRepeat || result.indexOf(randomChar) === -1) {
        result += randomChar;
      }
    }
    result += endWith;
    setResult(result);
    addToHistory(result);
  }

  const addToFavorite = () => {
    if (!favorite["favorite"]) {
      setFavorite("favorite", [result], { path: "/" });
    } else {
      if (!favorite["favorite"].includes(result)) {
        setFavorite("favorite", [...favorite["favorite"], result], { path: "/" });
      }
    }
  }

  const addToHistory = (name: string) => {
    if (!history["history"]) {
      setHistory("history", [name], { path: "/" });
    } else {
      if (!history["history"].includes(name)) {
        setHistory("history", [...history["history"], name], { path: "/" });
      }
    }
  }

  return (
    <>
      <div className="flex items-start gap-2 mt-2">
        <div className="flex flex-col items-start">
          <label className="text-lg">Start with</label>
          <input
            className="p-2 my-2 rounded-lg px-2 w-full"
            placeholder="e.g. al"
            type="text"
            value={startWith}
            onChange={(e) => setStartWith(e.target.value.toLowerCase())}
            onInput={(e: React.FormEvent<HTMLInputElement>) => {
              const target = e.target as HTMLInputElement;
              target.value = target.value.replace(/[^a-zA-Z]/g, "");
            }}
          />
        </div>
        <div className="flex flex-col items-start">
          <label className="text-lg">End with</label>
          <input
            className="p-2 my-2 rounded-lg px-2 w-full"
            placeholder="e.g. ly"
            type="text"
            value={endWith}
            onChange={(e) => setEndWith(e.target.value.toLowerCase())}
            onInput={(e: React.FormEvent<HTMLInputElement>) => {
              const target = e.target as HTMLInputElement;
              target.value = target.value.replace(/[^a-zA-Z]/g, "");
            }}
          />
        </div>
      </div>

      {/* excluded */}
      <div className="flex flex-col items-start mt-2">
        <label className="text-lg">Exclude Characters</label>
        <input
          className="p-2 my-2 rounded-lg px-2 w-full"
          placeholder="e.g. fpqx excludes f, p, q, x"
          type="text"
          value={exclude.join(",")}
          onChange={(e) => setExclude(e.target.value.toLowerCase().split(","))}
          onInput={(e: React.FormEvent<HTMLInputElement>) => {
            const target = e.target as HTMLInputElement;
            target.value = target.value.replace(/[^a-zA-Z,]/g, "");
          }}
        />
      </div>

      <div className="flex flex-col items-start mt-2">
        <label className="text-lg">Length</label>
        <input
          className="p-2 my-2 rounded-lg px-2 w-full"
          placeholder="e.g. 8"
          type="number"
          value={length}
          onChange={(e) => setLength(parseInt(e.target.value))}
          onInput={(e: React.FormEvent<HTMLInputElement>) => {
            const target = e.target as HTMLInputElement;
            target.value = target.value.replace(/[^0-9]/g, "");
          }}
        />
      </div>

      <div className="flex flex-row items-center mt-2 gap-2">
        <input
          className="p-2 my-2 rounded-lg px-2"
          type="checkbox"
          checked={allowRepeat}
          onChange={(e) => setAllowRepeat(e.target.checked)}
        />
        <label className="text-lg">Allow Character Repeat</label>
      </div>

      <div className="flex justify-center mt-8 mb-4">
        <p className="text-4xl font-bold">{result}</p>
      </div>

      <div className="flex flex-row gap-2 justify-center mt-2">
        <button className="flex items-center p-2 my-2 text-lg font-bold rounded-lg px-2 bg-indigo-500 hover:bg-indigo-600 active:bg-indigo-500 text-white" onClick={generate}>
          <Icon icon="ic:round-refresh" className="inline-block w-6 h-6" />
          Generate
        </button>

        <button
          className="flex items-center p-2 my-2 text-lg font-bold rounded-lg px-2 bg-red-500 hover:bg-red-600 active:bg-red-500 disabled:bg-gray-200 disabled:text-gray-800 text-white"
          disabled={favorite["favorite"] && favorite["favorite"].includes(result)}
          onClick={addToFavorite}>
          <Icon icon="ic:round-favorite" className="inline-block w-6 h-6" />
          Favorite
        </button>
      </div>
    </>
  )
}