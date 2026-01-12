import { useState } from "react";

const useDelete = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const deleteData = async (options = {}) => {
    try {
      setLoading(true);
      setError(null);

      const res = await fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          ...options.headers,
        },
        ...options,
      });

      if (!res.ok) {
        throw new Error("Failed to delete data");
      }

      const text = await res.text();
      const json = text ? JSON.parse(text) : null;

      setData(json);
      return json;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { deleteData, data, loading, error };
};

export default useDelete;
