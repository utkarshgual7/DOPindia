import React from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import WelcomeSection from "../components/WelcomeSection";
import Navbar from "../components/Navbar";
import AgentNavbar from "../components/AgentNavbar";

const AgentHome = () => {
  const services = [
    {
      id: 1,
      name: "Scan to Deliver",
      backgroundImage: "https://i.ibb.co/LYcjfCQ/pngwing-com-2.png",
      buttonImage: "https://img.icons8.com/ios-filled/50/plus.png",
      link: "/parcelscanfordelivery",
    },
    {
      id: 2,
      name: "Pickup Parcels",
      backgroundImage: "https://i.ibb.co/YyM0LVm/trackpngwing-com-2.png",
      buttonImage: "https://img.icons8.com/color/48/route.png",
      link: "/pickup",
    },
    {
      id: 3,
      name: "Start Delivering",
      backgroundImage:
        "https://i.ibb.co/7112Sh1/istockphoto-1434715649-612x612.jpg",
      buttonImage: "https://i.ibb.co/cT9xYwX/icons8-edit-property-48.png",
      link: "/startdelivering",
    },
    {
      id: 4,
      name: "Issue in delivery",
      backgroundImage: "https://i.ibb.co/JtWDjjb/complaint.png",
      buttonImage: "https://i.ibb.co/z7j4PqS/iconcomplaint.png",
      link: "/complaintform",
    },
  ];

  return (
    <main className="flex flex-col items-start px-3.5 pt-9 pb-20 bg-white">
      <AgentNavbar />

      {/* Card Section */}
      <section className=" w-full max-w-screen-xl mx-auto max-md:mt-10">
        <div className="grid grid-cols-4 gap-6 mt-[100px] max-md:grid-cols-2">
          {services.map((service) => (
            <a
              key={service.id}
              href={service.link} // Make sure the route exists in your routing setup
              className="group relative flex flex-col items-center justify-center p-5 text-white bg-cover bg-center rounded-lg shadow-lg h-64 transform transition-transform duration-300 ease-in-out hover:scale-105"
              style={{
                backgroundImage: `linear-gradient(to bottom, rgba(255, 99, 99, 0.5), rgba(0, 0, 0, 0.9)), url(${service.backgroundImage})`,
              }}
            >
              <h3 className="text-2xl font-bold">{service.name}</h3>
              <button className="absolute bottom-5 px-4 py-2 text-sm bg-white text-red-800 rounded-full shadow-md">
                <img
                  src={service.buttonImage}
                  alt="Action button"
                  className="w-6 h-6"
                />
              </button>
            </a>
          ))}
        </div>
      </section>
    </main>
  );
};

export default AgentHome;
