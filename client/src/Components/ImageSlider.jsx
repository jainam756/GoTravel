import React, { useState } from "react";
import Image from "./Image";

const ImageSlider = ({ place }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % place.photos.length);
  };

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? place.photos.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="items-center justify-center">
      <div className="flex items-center justify-center scale-90">
        <button
          className="mr-2 px-4 py-2 bg-primary text-white rounded"
          onClick={goToPrevious}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            class="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M11.25 9l-3 3m0 0l3 3m-3-3h7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </button>
        <img
            className=" sclae-90 object-cover"
          src={`http://localhost:4000/uploads/${place.photos[currentIndex]}`}
          alt="Slider"
        />

        {/* <Image className="object-cover" src={place.photos[currentIndex]} alt=""/> */}
        <button
          className="ml-2 px-4 py-2 bg-primary text-white rounded"
          onClick={goToNext}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            class="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12.75 15l3-3m0 0l-3-3m3 3h-7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </button>
      </div>

      <div className="flex justify-center my-5">
        {place.photos.map((photo, index) => (
          <img
            key={index}
            className={`h-10 w-10 mx-1 ${
              currentIndex === index ? "opacity-100" : "opacity-50"
            }`}
            src={`http://localhost:4000/uploads/${photo}`}
            alt={`Thumbnail ${index}`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageSlider;
