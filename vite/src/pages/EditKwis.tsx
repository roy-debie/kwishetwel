import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

const EditKwis = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [, setKwis] = useState({});
  const [name, setName] = useState<string>("");

  useEffect(() => {
    // Fetch the kwis data by ID when the component mounts
    axios
      .get(`${import.meta.env.VITE_API_URL}/kwisses/${id}`)
      .then((response) => {
        setKwis(response.data);
        setName(response.data.name);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id]);

  const updateKwis = () => {
    axios
      .put(`${import.meta.env.VITE_API_URL}/kwisses/${id}`, {
        name: name,
      })
      .then(() => {
        navigate("/");
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
          Name
        </label>
        <div className="mt-2">
          <input
            type="name"
            name="name"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-3"
            placeholder="Kwis"
          />
        </div>
      </div>
      <div className="mt-6 flex items-center justify-end gap-x-6">
        <Link
          to={"/"}
          className="text-sm font-semibold leading-6 text-gray-900"
        >
          Cancel
        </Link>
        <button
          onClick={() => updateKwis()}
          className="rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default EditKwis;
