import { Kwis } from "@prisma/client";
import { useState, useTransition } from "react";

import { createkwis } from "@/actions/kwis";

export const KwissesList = ({ kwisses }: { kwisses: Array<Kwis> }) => {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>(undefined);
  const [startKwis, setStartKwis] = useState(false);
  const [title, setTitle] = useState("");

  const createKwis = (title: string) => {
    startTransition(() => {
      createkwis(title)
        .then((data) => {
          //
        })
        .catch(() => {
          setError("An error occurred");
        });
    });
  };

  return (
    <div className="bg-white py-6 sm:py-8 w-full">
      <div className="md:flex md:items-center md:justify-between mb-5">
        <div className="min-w-0 flex-1">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
            Your kwisses
          </h2>
        </div>
        <div className="mt-4 flex md:ml-4 md:mt-0">
          <button
            type="button"
            onClick={() => setStartKwis(!startKwis)}
            className={
              (startKwis
                ? "bg-red-600 hover:bg-red-700 focus-visible:outline-red-600"
                : "bg-emerald-600 hover:bg-emerald-700 focus-visible:outline-emerald-600") +
              "ml-3 inline-flex items-center rounded-md  px-3 py-2 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 "
            }
          >
            {startKwis ? "Cancel" : "Start kwis"}
          </button>
        </div>
      </div>
      {startKwis && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            createKwis(title);
          }}
          className="space-y-6"
        >
          <div className="sm:col-span-4 mb-3">
            <label
              htmlFor="title"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Title
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="title"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-emerald-600 sm:text-sm sm:leading-6"
              />
            </div>
            <div className="mt-6 flex items-center justify-end gap-x-6">
              <button
                type="submit"
                className="rounded-md bg-emerald-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-emerald-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
              >
                Save
              </button>
            </div>
          </div>
        </form>
      )}
      {kwisses && kwisses.length === 0 && (
        <ul
          role="list"
          className="mx-auto mt-20 grid max-w-2xl grid-cols-2 gap-x-8 gap-y-16 text-center sm:grid-cols-3 md:grid-cols-4 lg:mx-0 lg:max-w-none lg:grid-cols-5 xl:grid-cols-6"
        >
          {kwisses.map((kwis) => (
            <li key={kwis.id} className="bg-gray-100 py-5 rounded-md">
              &#129504;
              <h3 className="mt-6 text-base font-semibold leading-7 tracking-tight text-gray-900">
                {kwis.title}
              </h3>
              <p className="text-sm leading-6 text-gray-600">
                {new Date(kwis.createdAt).toDateString()}
              </p>
            </li>
          ))}
        </ul>
      )}
      {!kwisses || kwisses.length === 0 ? (
        <p className="text-gray-600">No kwisses yet</p>
      ) : null}
    </div>
  );
};
