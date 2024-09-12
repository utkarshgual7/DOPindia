import React from "react";

function ContactDetails() {
  return (
    <div className="flex flex-col w-full md:w-1/3 ml-5 max-md:ml-0">
      <div className="flex flex-col mt-11 w-full leading-none text-black max-md:mt-6">
        <h3 className="text-2xl font-semibold mb-2">Your Contact Details</h3>
        <div className="flex items-center gap-4 px-4 py-3 mt-2 text-sm bg-red-100 rounded-lg">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/80f6ce65f921c6cf750642b3d6c823269a0948add0c07cc8e1a3dc241cf0f5e6?placeholderIfAbsent=true&apiKey=6c2297f39c3644869211fbde5d1d4f30"
            alt="Contact Icon"
            className="w-[23px] h-[23px] shrink-0"
          />
          <div className="text-sm">+91 - 91XXXXXXXXX</div>
        </div>
      </div>
    </div>
  );
}

export default ContactDetails;
