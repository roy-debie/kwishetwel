import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";

const PlayersList = ({
  players,
  setReload,
}: {
  players: Array<{
    _id: string;
    username: string;
    gender: string;
  }>;
  setReload: (reload: boolean) => void;
}) => {
  const [deleteClicked, setDeleteClicked] = useState<string | null>(null);

  const deleteKwis = (id: string) => {
    if (deleteClicked === id) {
      // If delete button was clicked twice, perform deletion
      axios
        .delete(`${import.meta.env.VITE_API_URL}/players/${id}`)
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

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 w-12/12 m-auto pt-10">
      {players.map((player) => (
        <div
          key={player._id}
          className="relative flex items-center space-x-3 rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm"
        >
          <div className="flex-shrink-0">&#129504;</div>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-medium text-gray-900">
              {player.username}
            </p>
            <p className="truncate text-sm text-gray-500">{player.gender}</p>
            <button
              type="button"
              onClick={() => deleteKwis(player._id)}
              className={`mt-1 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium mr-2 ${
                deleteClicked === player._id
                  ? "bg-yellow-100 text-yellow-800"
                  : "bg-red-100 text-red-800"
              } cursor-pointer`}
            >
              {deleteClicked === player._id ? "Are you sure?" : "Delete"}
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
              to={`/edit-player/${player._id}`}
              className="mt-1 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 cursor-pointer mr-2"
            >
              Edit
            </Link>
            <button
              type="button"
              className="mt-1 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 cursor-pointer mr-2"
            >
              Start
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PlayersList;
