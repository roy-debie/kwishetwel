/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const Round1: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [players, setPlayers] = useState<[any]>();
  const [playerRounds, setPlayerRounds] = useState([] as any);
  const getKwisInfo = (id: string) => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/round1/${id}`)
      .then((response) => {
        console.log(response.data);
        setPlayerRounds(response.data.playerRounds);
      });
  };

  const getPlayers = () => {
    axios.get(`${import.meta.env.VITE_API_URL}/players`).then((response) => {
      setPlayers(response.data);
    });
  };

  useEffect(() => {
    if (id) getKwisInfo(id);
  }, [id]);

  useEffect(() => {
    getPlayers();
  }, []);

  return (
    <>
      <h1>Round 1</h1>
      <div>
        <ul role="list" className="divide-y divide-gray-100">
          {playerRounds.map((player: any) => (
            <li
              key={player.player}
              className="flex items-center justify-between gap-x-6 py-5"
            >
              <div className="flex min-w-0 gap-x-4">
                <div className="min-w-0 flex-auto">
                  <p className="text-sm font-semibold leading-6 text-gray-900">
                    {players?.find((p) => p._id === player.player)?.username}
                  </p>
                </div>
              </div>
              <a
                href={player.href}
                className="rounded-full bg-white px-2.5 py-1 text-xs font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
              >
                View
              </a>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Round1;
