/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const KwissesList = ({
  kwisses,
  setReload,
}: {
  kwisses: Array<{
    _id: string;
    name: string;
    players: Array<string>;
    started: boolean;
    rounds: Array<unknown>;
  }>;
  setReload: (reload: boolean) => void;
}) => {
  const kwisEmojis = ["❓", "🔍", "🕰", "📌", "📎", "🗒", "🗑"];
  const playerEmojis = ["👸", "🕵", "🤰", "🧕", "🙈", "🤡", "🦹"];

  const [deleteClicked, setDeleteClicked] = useState<string | null>(null);
  const [addPlayerClicked, setAddPlayerClicked] = useState<string | null>(null);
  const [startClicked, setStartClicked] = useState<string | null>(null);
  const [continueClicked, setContinueClicked] = useState<string | null>(null);
  const [players, setPlayers] = useState<Array<{
    _id: string;
    username: string;
    gender: "CHICKIE" | "MAN";
  }> | null>(null);
  const [playerToAdd, setPlayerToAdd] = useState<{
    _id: string;
    username: string;
    gender: "CHICKIE" | "MAN";
  }>();

  const deleteKwis = (id: string) => {
    if (deleteClicked === id) {
      // If delete button was clicked twice, perform deletion
      axios
        .delete(`${import.meta.env.VITE_API_URL}/kwisses/${id}`)
        .then(() => {
          setReload(true);
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      // Update state to show "Are you sure?" text
      setDeleteClicked(id);
    }
  };

  const cancelDelete = () => {
    // Reset state if "No" button is clicked
    setDeleteClicked(null);
  };

  const cancelStart = () => {
    // Reset state if "No" button is clicked
    setStartClicked(null);
  };

  const cancelContinue = () => {
    // Reset state if "No" button is clicked
    setContinueClicked(null);
  };

  const addPlayerToKwis = (kwisId: string) => {
    if (!playerToAdd) return;
    setAddPlayerClicked(null);
    axios
      .put(`${import.meta.env.VITE_API_URL}/kwisses/add-player/${kwisId}`, {
        player: playerToAdd,
      })
      .then(() => {
        setReload(true);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const deletePlayerFromKwis = (kwisId: string, playerId: string) => {
    axios
      .put(`${import.meta.env.VITE_API_URL}/kwisses/delete-player/${kwisId}`, {
        player: playerId,
      })
      .then(() => {
        setReload(true);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const getPlayers = async () => {
    await axios
      .get(`${import.meta.env.VITE_API_URL}/players`)
      .then((response) => {
        setPlayers(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const startKwis = (id: string) => {
    if (startClicked === id) {
      axios
        .put(`${import.meta.env.VITE_API_URL}/kwisses/start/${id}`)
        .then(() => {
          console.log("Kwis started");
          setReload(true);
          setStartClicked(null);
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      // Update state to show "Are you sure?" text
      setStartClicked(id);
    }
  };

  const continueKwis = (id: string) => {
    if (continueClicked === id) {
      console.log("Kwis continued");
      setReload(true);
      setContinueClicked(null);
    } else {
      // Update state to show "Are you sure?" text
      setContinueClicked(id);
    }
  };

  useEffect(() => {
    getPlayers();
  }, []);

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 w-12/12 m-auto pt-10">
      {kwisses.map((kwis) => (
        <div
          key={kwis._id}
          className="relative flex items-center space-x-3 rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm"
        >
          <div className="flex-shrink-0">
            {kwisEmojis[Math.floor(Math.random() * kwisEmojis.length)]}
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-medium text-gray-900">{kwis.name}</p>
            <p className="truncate text-sm text-gray-500">{kwis.name}</p>
            <ul role="list" className="divide-y divide-gray-100">
              {kwis.players &&
                kwis.players.map((player) => (
                  <li key={player} className="flex justify-between py-2">
                    <div className="flex min-w-full gap-x-4">
                      <p>
                        {
                          playerEmojis[
                            Math.floor(Math.random() * playerEmojis.length)
                          ]
                        }
                      </p>
                      <div className="min-w-0 flex-auto">
                        <p className="text-sm font-semibold leading-6 text-gray-900">
                          {players?.find((p) => p._id === player)?.username}
                        </p>
                        <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                          {players?.find((p) => p._id === player)?.gender}
                        </p>
                      </div>
                      <div>
                        <button
                          type="button"
                          onClick={() => deletePlayerFromKwis(kwis._id, player)}
                          className="mt-1 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium mr-2 bg-red-100 text-red-800 cursor-pointer"
                        >
                          x
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
            </ul>
            <button
              type="button"
              onClick={() => deleteKwis(kwis._id)}
              className={`mt-1 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium mr-2 ${
                deleteClicked === kwis._id
                  ? "bg-yellow-100 text-yellow-800"
                  : "bg-red-100 text-red-800"
              } cursor-pointer`}
            >
              {deleteClicked === kwis._id ? "Are you sure?" : "Delete"}
            </button>
            {deleteClicked && (
              <button
                type="button"
                onClick={cancelDelete}
                className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 cursor-pointer mr-2"
              >
                No
              </button>
            )}
            <Link
              type="button"
              to={`/edit-kwis/${kwis._id}`}
              className="mt-1 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 cursor-pointer mr-2"
            >
              Edit
            </Link>
            {!kwis.started ? (
              <>
                <button
                  type="button"
                  onClick={() => startKwis(kwis._id)}
                  className={`mt-1 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium mr-2 ${
                    startClicked === kwis._id
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-green-100 text-green-800"
                  } cursor-pointer`}
                >
                  {startClicked === kwis._id ? "Are you sure?" : "Start"}
                </button>
                {startClicked && (
                  <button
                    type="button"
                    onClick={cancelStart}
                    className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 cursor-pointer mr-2"
                  >
                    No
                  </button>
                )}
              </>
            ) : (
              <>
                <button
                  type="button"
                  onClick={() => continueKwis(kwis._id)}
                  className={`mt-1 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium mr-2 ${
                    continueClicked === kwis._id
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-green-100 text-green-800"
                  } cursor-pointer`}
                >
                  {continueClicked === kwis._id ? "Are you sure?" : "Continue"}
                </button>
                {continueClicked && (
                  <button
                    type="button"
                    onClick={cancelContinue}
                    className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 cursor-pointer mr-2"
                  >
                    No
                  </button>
                )}
              </>
            )}
            {!kwis.started && (
              <button
                type="button"
                onClick={() => setAddPlayerClicked(kwis._id)}
                className="mt-1 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 cursor-pointer"
              >
                Add Player
              </button>
            )}
            {addPlayerClicked === kwis._id && (
              <>
                <div className="mt-2">
                  <label
                    htmlFor="playerToAdd"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Add Player
                  </label>
                  <select
                    id="playerToAdd"
                    name="playerToAdd"
                    value={playerToAdd?.username || ""}
                    onChange={(e) =>
                      setPlayerToAdd(
                        players?.find(
                          (player) => player.username === e.target.value
                        )
                      )
                    }
                    className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  >
                    <option value="">Select Player</option>
                    {players?.length &&
                      players
                        .filter(
                          (player) =>
                            !kwis.players.find((p) => p === player._id)
                        )
                        .map((player) => (
                          <option key={player._id} value={player.username}>
                            {player.username}
                          </option>
                        ))}
                  </select>
                </div>
                <div className="mt-6 flex items-center justify-end gap-x-6">
                  <button
                    type="button"
                    onClick={() => setAddPlayerClicked(null)}
                    className="text-sm font-semibold leading-6 text-gray-900"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    onClick={() => addPlayerToKwis(kwis._id)}
                    className="rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
                  >
                    Save
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default KwissesList;
