import React from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import WelcomeSection from "../components/WelcomeSection";
import Navbar from "../components/Navbar";

const Home = () => {
  const services = [
    {
      id: 1,
      name: "Book Mail/Parcel",
      backgroundImage: "https://i.ibb.co/WPJqVPj/deliveryboy.png",
      buttonImage: "https://img.icons8.com/ios-filled/50/plus.png",
      link: "/bookservice",
    },
    {
      id: 2,
      name: "Track your article",
      backgroundImage: "https://i.ibb.co/YyM0LVm/trackpngwing-com-2.png",
      buttonImage: "https://img.icons8.com/color/48/route.png",
      link: "/trackparcel",
    },
    {
      id: 3,
      name: "Modify your orders",
      backgroundImage: "https://i.ibb.co/VTXrmtN/modifypngwing-com-2.png",
      buttonImage: "https://i.ibb.co/cT9xYwX/icons8-edit-property-48.png",
      link: "/yourorders",
    },
    {
      id: 4,
      name: "Register Complaint",
      backgroundImage: "https://i.ibb.co/JtWDjjb/complaint.png",
      buttonImage: "https://i.ibb.co/z7j4PqS/iconcomplaint.png",
      link: "/complaintform",
    },
  ];

  return (
    <main className="flex flex-col items-start px-3.5 pt-9 pb-20 bg-white">
      <Navbar />
      <WelcomeSection />

      {/* Card Section */}
      <section className="mt-16 w-full max-w-screen-xl mx-auto max-md:mt-10">
        <div className="grid grid-cols-4 gap-6 max-md:grid-cols-2">
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

export default Home;
