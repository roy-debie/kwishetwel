import React, { useEffect, useState } from "react";
import axios from "axios";

const Kwisses: React.FC = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/kwisses`)
      .then((response) => {
        setData(response.data);
        console.log(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="text-center">
      <h1 className="text-3xl font-bold">Home Page</h1>
      <p className="mt-4">Welcome to the Home Page!</p>
      <ul>
        {data.map((item) => (
          <li key={item} className="mt-2">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Kwisses;
