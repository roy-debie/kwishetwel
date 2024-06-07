import { Kwis, Player } from "@prisma/client";

export const PlayersList = ({ players }: { players: Array<Player> }) => {
  return (
    <div className="bg-white py-6 sm:py-8">
      <div className="md:flex md:items-center md:justify-between mb-5">
        <div className="min-w-0 flex-1">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
            Your players
          </h2>
        </div>
        <div className="mt-4 flex md:ml-4 md:mt-0">
          <button
            type="button"
            className="ml-3 inline-flex items-center rounded-md bg-emerald-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-emerald-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
          >
            Create player
          </button>
        </div>
      </div>
      {players && players.length === 0 && (
        <ul
          role="list"
          className="mx-auto mt-20 grid max-w-2xl grid-cols-2 gap-x-8 gap-y-16 text-center sm:grid-cols-3 md:grid-cols-4 lg:mx-0 lg:max-w-none lg:grid-cols-5 xl:grid-cols-6"
        >
          {players.map((player) => (
            <li key={player.id} className="bg-gray-100 py-5 rounded-md">
              &#129504;
              <h3 className="mt-6 text-base font-semibold leading-7 tracking-tight text-gray-900">
                {player.name}
              </h3>
              <p className="text-sm leading-6 text-gray-600">
                {player.amountofQuestionsAnswered}
              </p>
            </li>
          ))}
        </ul>
      )}
      {!players || players.length === 0 ? (
        <p className="text-gray-600">No players yet</p>
      ) : null}
    </div>
  );
};
