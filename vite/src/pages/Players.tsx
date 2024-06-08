/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from "react";
import axios from "axios";
import PlayersList from "../components/PlayersList";
import { Link } from "react-router-dom";

const Players: React.FC = () => {
  const [players, setPlayers] = useState([]);
  const [, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [reload, setReload] = useState<boolean>(false);

  const getPlayers = async () => {
    await axios
      .get(`${import.meta.env.VITE_API_URL}/players`)
      .then((response) => {
        setPlayers(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  };

  useEffect(() => {
    getPlayers();
  }, []);

  useEffect(() => {
    if (reload) {
      getPlayers();
      setReload(false);
    }
  }, [reload]);

  // if (loading) {
  //   return <div>Loading...</div>;
  // }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="text-left w-8/12 mx-auto mt-5">
      <div className="md:flex md:items-center md:justify-between">
        <div className="min-w-0 flex-1">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
            Your Players
          </h2>
        </div>
        <div className="mt-4 flex md:ml-4 md:mt-0">
          <Link
            to={"/create-player"}
            type="button"
            className="ml-3 inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Create player
          </Link>
        </div>
      </div>
      <PlayersList players={players} setReload={setReload} />
    </div>
  );
};

export default Players;
