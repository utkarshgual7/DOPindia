import React from "react";

const ServiceCard = ({ title, imageSrc, additionalImageSrc }) => {
  return (
    <div className="flex flex-col w-3/12 max-md:w-full">
      <div className="flex flex-col grow text-2xl font-bold leading-loose rounded-lg text-zinc-700 max-md:mt-6">
        <div className="flex flex-col pt-6 pb-2.5 pl-4 rounded-lg">
          <h3 className="mb-5">{title}</h3>
          <img
            loading="lazy"
            src={imageSrc}
            alt={`${title} icon`}
            className="object-contain w-full mt-5 aspect-[1] max-md:ml-0"
          />
          {additionalImageSrc && (
            <img
              loading="lazy"
              src={additionalImageSrc}
              alt="Additional icon"
              className="object-contain w-5 self-end mt-9 aspect-square max-md:w-full"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
