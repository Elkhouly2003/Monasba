import { useParams } from "react-router-dom";
import ImageSlider from "../Slider/ImageSlider";

const SingleEventPage = () => {
  const { id } = useParams();

  return (
    <div className="max-w-8xl mx-auto">
      <div className="mt-10">
        <ImageSlider />
      </div>
      <div>{id}</div>
    </div>
  );
};

export default SingleEventPage;
