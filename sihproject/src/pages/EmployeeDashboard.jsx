import React from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";

const EmployeeDashboard = () => {
  return (
    <>
      <Header />
      <div className="min-h-screen mt-2 bg-gray-200 p-6">
        <h1 className="text-3xl font-bold text-center mb-6 mt-24 text-gray-700">
          Employee Dashboard
        </h1>

        {/* Navigation Menu */}
        <div className="bg-gray-100 shadow-md rounded-lg p-6 mb-8 max-w-full lg:max-w-md mx-auto">
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3">
            <Link
              to="/book-parcel"
              className="py-2 px-4 text-center rounded-md bg-red-400 text-white hover:bg-red-600"
            >
              Book a Parcel
            </Link>
            <Link
              to="/update-status"
              className="py-2 px-4 text-center rounded-md bg-red-400 text-white hover:bg-red-600"
            >
              Update Status
            </Link>
            <Link
              to="/view-parcels"
              className="py-2 px-4 text-center rounded-md bg-red-400 text-white hover:bg-red-600"
            >
              View Booked Parcels
            </Link>
            <Link
              to="/ofd"
              className="py-2 px-4 text-center rounded-md bg-red-400 text-white hover:bg-red-600"
            >
              Out For Delivery Articles
            </Link>
            <Link
              to="/view-complaints"
              className="py-2 px-4 text-center rounded-md bg-red-400 text-white hover:bg-red-600"
            >
              View Complaints
            </Link>
            <Link
              to="/modifyorder"
              className="py-2 px-4 text-center rounded-md bg-red-400 text-white hover:bg-red-600"
            >
              Change Delivery Time Frame
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default EmployeeDashboard;
