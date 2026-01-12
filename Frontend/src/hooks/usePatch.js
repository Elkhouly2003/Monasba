import { useState } from "react";

const usePatch = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const patchData = async (body, options = {}) => {
    try {
      setLoading(true);
      setError(null);

      const res = await fetch(url, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          ...options.headers,
        },
        body: JSON.stringify(body),
        ...options,
      });

      if (!res.ok) {
        throw new Error("Failed to update data");
      }

      const json = await res.json();
      setData(json);
      return json;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { patchData, data, loading, error };
};

export default usePatch;
