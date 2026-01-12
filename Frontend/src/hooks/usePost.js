import { useState } from "react";

const usePost = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const postData = async (body, options = {}) => {
    try {
      setLoading(true);
      setError(null);

      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...options.headers,
        },
        body: JSON.stringify(body),
        ...options,
      });

      if (!res.ok) {
        throw new Error("Failed to post data");
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

  return { postData, data, loading, error };
};

export default usePost;
