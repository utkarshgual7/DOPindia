import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Webcam from "react-webcam";
import { BrowserBarcodeReader } from "@zxing/library";
import Header from "../components/Header";

const formatDate = (dateString) => {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

const StatusCard = ({ status, parcels, onParcelClick }) => (
  <div className="bg-white shadow-md rounded-lg p-4 mb-6">
    <h2 className="text-lg font-semibold mb-4">{status} Parcels</h2>
    <table className="min-w-full divide-y divide-gray-200">
      <thead>
        <tr>
          <th className="px-4 py-2 text-left text-gray-500">Tracking ID</th>
          <th className="px-4 py-2 text-left text-gray-500">Recipient Name</th>
          <th className="px-4 py-2 text-left text-gray-500">
            Delivery Pincode
          </th>
          <th className="px-4 py-2 text-left text-gray-500">Date</th>
        </tr>
      </thead>
      <tbody className="bg-red-100 divide-y divide-gray-200">
        {parcels.map((parcel) => (
          <tr
            key={parcel.trackingId}
            className="hover:bg-gray-100 cursor-pointer"
            onClick={() => onParcelClick(parcel.trackingId)}
          >
            <td className="px-4 py-2">{parcel.trackingId}</td>
            <td className="px-4 py-2">{parcel.recipientName}</td>
            <td className="px-4 py-2">{parcel.recipientPincode}</td>

            <td className="px-4 py-2">{formatDate(parcel.createdAt)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const UpdateStatus = () => {
  const [statusUpdate, setStatusUpdate] = useState({
    trackingId: "",
    status: "",
    remarks: {
      predefined: "",
      custom: "",
    },
  });
  const [parcels, setParcels] = useState([]);
  const [scanner, setScanner] = useState(null);
  const [isScanning, setIsScanning] = useState(false);

  // Access the officeName from the Redux state
  const currentOfficer = useSelector((state) => state.officer.currentOfficer);
  const officeName = currentOfficer ? currentOfficer.officeName : "Unknown";
  const officerId = currentOfficer ? currentOfficer.officerId : "";

  // Fetch parcels when the component mounts
  const fetchParcels = async () => {
    try {
      const response = await fetch("/api/parcel/getparcels");
      const data = await response.json();

      setParcels(data);
    } catch (error) {
      console.error("Error fetching parcels", error);
    }
  };

  useEffect(() => {
    fetchParcels();
  }, []);

  useEffect(() => {
    if (scanner) {
      const reader = new BrowserBarcodeReader();
      reader
        .decodeFromInputVideoDevice(undefined, "barcode-scanner")
        .then((result) => {
          setStatusUpdate((prev) => ({
            ...prev,
            trackingId: result.text,
          }));
          setIsScanning(false);
        })
        .catch((err) => console.error(err));
    }
  }, [scanner]);

  const handleStatusUpdate = async () => {
    const parcelToUpdate = parcels.find(
      (parcel) => parcel.trackingId === statusUpdate.trackingId
    );

    if (!parcelToUpdate) {
      alert("Parcel not found.");
      return;
    }

    try {
      const response = await fetch("/api/parcel/update-status", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...statusUpdate,
          officeName, // Include officeName
        }),
      });

      if (!response.ok) {
        throw new Error("Error updating status");
      }
      alert("Status updated successfully!");

      // Reset form or show success message
    } catch (error) {
      console.error("Error updating status", error);
    }
  };

  const handleChangeStatus = async () => {
    try {
      const parcelToUpdate = parcels.find(
        (parcel) => parcel.trackingId === statusUpdate.trackingId
      );

      if (!parcelToUpdate) {
        alert("Parcel not found.");
        return;
      }

      const response = await fetch("/api/parcel/change-status", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          trackingId: statusUpdate.trackingId,
          status: statusUpdate.status,
        }),
      });

      if (!response.ok) {
        throw new Error("Error changing status");
      }
      alert("Status changed successfully!");

      // Refresh parcel list after successful status change
      await fetchParcels();

      // Reset form or show success message
      setStatusUpdate({
        trackingId: "",
        status: "",
        remarks: {
          predefined: "",
          custom: "",
        },
      });
    } catch (error) {
      console.error("Error changing status", error);
    }
  };

  const handleParcelClick = (trackingId) => {
    setStatusUpdate((prev) => ({
      ...prev,
      trackingId,
    }));
  };

  const handleRemarkChange = (e) => {
    const { name, value } = e.target;
    setStatusUpdate((prev) => ({
      ...prev,
      remarks: {
        ...prev.remarks,
        [name]: value,
      },
    }));
  };

  const startScanning = () => {
    setIsScanning(true);
    setScanner(true); // Initialize the scanner
  };

  // Organize parcels by status
  const statuses = [
    "Booked",
    "In Transit",
    "Arrived at Delivery Station",
    "Out for Delivery",
    "Delivered",
    "Unable to Deliver",
  ];
  const parcelsByStatus = statuses.reduce((acc, status) => {
    acc[status] = parcels.filter((parcel) => parcel.status === status);
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <Header />
      <h1 className="text-3xl mt-[100px] max-lg:mt-[120px] font-bold text-center mb-6 text-gray-700">
        Update Parcel Status
      </h1>
      <div className="bg-white shadow-md rounded-lg p-6 max-w-md mx-auto">
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Tracking ID"
            value={statusUpdate.trackingId}
            onChange={(e) =>
              setStatusUpdate({ ...statusUpdate, trackingId: e.target.value })
            }
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
          />
          <select
            value={statusUpdate.status}
            onChange={(e) =>
              setStatusUpdate({ ...statusUpdate, status: e.target.value })
            }
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
          >
            <option value="">Select Status</option>
            {statuses.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>

          {/* Predefined Remarks Dropdown */}
          <select
            name="predefined"
            value={statusUpdate.remarks.predefined}
            onChange={handleRemarkChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
          >
            <option value="">Select Predefined Remark</option>
            <option value="Package left for next destination">
              Package left for next destination
            </option>
            <option value="Package will arrive soon">
              Package will arrive soon
            </option>
            <option value="Package is marked out for delivery">
              Package is marked out for delivery
            </option>
            <option value="Package is delivered to recipient">
              Package is delivered to recipient
            </option>
            <option value="Scheduled for delivery on next working day">
              Scheduled for delivery on next working day
            </option>
            <option value="Package on hold for unavoidable reasons">
              Package on hold for unavoidable reasons
            </option>
          </select>

          {/* Custom Remark */}
          <input
            type="text"
            name="custom"
            placeholder="Custom Remark"
            value={statusUpdate.remarks.custom}
            onChange={handleRemarkChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
          />
          <button
            onClick={handleStatusUpdate}
            className="w-full bg-blue-500 text-white py-2 rounded-md"
          >
            Update Status
          </button>
          <button
            onClick={handleChangeStatus}
            className="w-full bg-green-500 text-white py-2 rounded-md"
          >
            Change Status
          </button>
        </div>
        {isScanning && (
          <div className="mt-6">
            <Webcam
              audio={false}
              width="100%"
              videoConstraints={{ facingMode: "environment" }}
              id="barcode-scanner"
            />
            <button
              onClick={() => setIsScanning(false)}
              className="w-full bg-red-500 text-white py-2 rounded-md mt-4"
            >
              Stop Scanning
            </button>
          </div>
        )}
        {!isScanning && (
          <button
            onClick={startScanning}
            className="w-full bg-yellow-500 text-white py-2 rounded-md mt-4"
          >
            Start Scanning
          </button>
        )}
      </div>

      <div className="mt-6">
        {statuses.map((status) => (
          <StatusCard
            key={status}
            status={status}
            parcels={parcelsByStatus[status]}
            onParcelClick={handleParcelClick}
          />
        ))}
      </div>
    </div>
  );
};

export default UpdateStatus;
