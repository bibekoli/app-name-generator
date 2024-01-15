"use client";

import { Icon } from "@iconify/react";
import { useCookies } from "react-cookie";

export default function Favorite() {
  const [favorite, setFavorite] = useCookies(["favorite"]);

  const deleteFromFavorite = (name: string) => {
    setFavorite("favorite", favorite["favorite"].filter((n: string) => n !== name), { path: "/" });
  }

  return (
    <>
      <ul className="flex flex-col h-full overflow-y-scroll">
        {
          favorite["favorite"]?.map((name: string, index: number) => (
            <li className="flex flex-row justify-between items-center m-2 p-2 bg-gray-100 rounded-lg border-b" key={index}>
                <p className="text-lg font-bold">{name}</p>
                <button className="p-2 m-2 text-lg font-bold rounded-lg px-2 bg-red-500 text-white" onClick={() => deleteFromFavorite(name)}>
                  <Icon icon="akar-icons:trash-can" />
                </button>
            </li>
          ))
        }

        {/* no favorites */}
        {
          !favorite["favorite"]?.length && (
            <div className="flex flex-row justify-center items-center m-2 mt-4 p-2 bg-gray-100 rounded-lg">
              <div className="flex flex-col justify-center items-center">
                <p className="text-lg font-bold">No Favorites Found</p>
              </div>
            </div>
          )
        }
      </ul>
    </>
  )
}