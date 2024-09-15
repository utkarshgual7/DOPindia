import React from "react";
import Navbar from "../components/Navbar";

const services = [
  {
    title: "Express Delivery",
    description: "Fast and reliable delivery of parcels within 24 hours.",
    icon: "🚚",
  },
  {
    title: "International Shipping",
    description: "Deliver your parcels globally with our trusted network.",
    icon: "✈️",
  },
  {
    title: "Same-Day Delivery",
    description: "Get your parcel delivered on the same day, guaranteed.",
    icon: "⏱️",
  },
  {
    title: "Package Tracking",
    description:
      "Real-time tracking of your parcels at every stage of delivery.",
    icon: "📦",
  },
  {
    title: "Bulk Parcel Delivery",
    description: "Efficient bulk delivery services for businesses of any size.",
    icon: "📥",
  },
];

const Services = () => {
  return (
    <>
      <Navbar />
      <div className=" mt-[100px] min-h-screen p-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-12">Our Services</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center"
              >
                <div className="text-6xl mb-4">{service.icon}</div>
                <h2 className="text-xl font-semibold mb-2">{service.title}</h2>
                <p className="text-gray-600 text-center">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Services;
