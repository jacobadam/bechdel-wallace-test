import React, { useState } from "react";
import useIsTouchDevice from "@/app/hooks/useIsTouchDevice";
import { aboutText } from "@/app/data/aboutText";

const AboutInformation: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isTouchDevice = useIsTouchDevice();

  const handleClick = () => {
    if (isTouchDevice) {
      setIsModalOpen(true);
    }
  };

  return (
    <>
      <button className="relative group" onClick={handleClick}>
        About
        {!isTouchDevice && (
          <p className="absolute right-full top-full mb-2 hidden group-hover:block bg-black text-white text-sm rounded p-4 min-w-96 z-10 transition-opacity duration-300 opacity-0 group-hover:opacity-100 border border-white whitespace-normal text-center">
            {aboutText}
          </p>
        )}
      </button>

      {isModalOpen && (
        <div className="fixed inset-0  flex justify-center items-center p-4 bg-black bg-opacity-80 z-50">
          <div className="bg-black text-white text-sm rounded p-4 min-w-96 max-w-lg border border-white whitespace-normal text-center relative">
            <button
              className="absolute top-2 right-2"
              onClick={() => setIsModalOpen(false)}
            >
              X
            </button>
            <p className="mt-4">{aboutText}</p>
          </div>
        </div>
      )}
    </>
  );
};

export default AboutInformation;
