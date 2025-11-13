import { useParams } from "react-router-dom";

const SingleEventPage = () => {
  const { id } = useParams();

  return (
    <div className="max-w-4xl mx-auto p-8 text-steel-blue">
      <h1 className="text-3xl font-bold mb-4">Event Details</h1>
      <p className="text-gray-600">You are viewing event ID: {id}</p>
    </div>
  );
};

export default SingleEventPage;
