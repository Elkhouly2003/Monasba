import axios from "axios";

export const postFetch = async (url, formData) => {
  const res = await axios.post(url, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return res.data;
};
