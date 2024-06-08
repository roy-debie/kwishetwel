import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const CreatePlayer = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState<string>("");
  const [gender, setGender] = useState<string>("Chickie");
  const createPlayer = () => {
    axios
      .post(`${import.meta.env.VITE_API_URL}/players`, {
        username: username,
        gender: gender,
      })
      .then(() => {
        navigate("/players");
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return (
    <div className="w-4/12 m-auto pt-10">
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          Username
        </label>
        <div className="mt-2">
          <input
            type="username"
            name="username"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-3"
            placeholder="Player"
          />
        </div>
      </div>
      <div className="mt-2">
        <label
          htmlFor="gender"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          Gender
        </label>
        <select
          id="gender"
          name="gender"
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
        >
          <option value={"CHICKIE"}>Chickie</option>
          <option value={"MAN"}>Man</option>
        </select>
      </div>
      <div className="mt-6 flex items-center justify-end gap-x-6">
        <Link
          type="button"
          to={"/players"}
          className="text-sm font-semibold leading-6 text-gray-900"
        >
          Cancel
        </Link>
        <button
          type="submit"
          onClick={() => createPlayer()}
          className="rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default CreatePlayer;
