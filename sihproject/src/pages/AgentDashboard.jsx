import React, { useState, useRef, useEffect } from "react";
import { BrowserMultiFormatReader } from "@zxing/library";
import Header from "../components/Header";
import AgentNavbar from "../components/AgentNavbar";

const ParcelScanForDelivery = () => {
  const [scannedData, setScannedData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isGalleryMode, setIsGalleryMode] = useState(false);
  const [parsedData, setParsedData] = useState(null); // Parsed JSON data
  const [error, setError] = useState(null); // Error state
  const videoRef = useRef(null);
  const fileInputRef = useRef(null);
  const codeReaderRef = useRef(null);
  const detailsRef = useRef(null); // Ref for the details section
  const [isScanning, setIsScanning] = useState(false); // State to track scanning status

  const handleScan = (result) => {
    if (result) {
      const rawData = result.text;
      console.log("Raw QR Code Data:", rawData);
      setScannedData(rawData);

      try {
        const parsed = JSON.parse(rawData); // Attempt to parse as JSON
        setParsedData(parsed); // Set parsed data
        setError(null); // Clear any error

        // Scroll to the details section after successful scan
        if (detailsRef.current) {
          detailsRef.current.scrollIntoView({ behavior: "smooth" });
        }

        // Stop scanning after successful scan
        stopScanning();
      } catch (e) {
        setParsedData(null);
        setError("Failed to parse JSON data.");
      }
    }
  };

  const handleError = (error) => {
    console.error("QR code scanner error:", error);
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const image = new Image();
        image.src = e.target.result;
        image.onload = () => {
          const codeReader = new BrowserMultiFormatReader();
          codeReader
            .decodeFromImage(image)
            .then((result) => handleScan(result))
            .catch((err) => handleError(err));
        };
      };
      reader.readAsDataURL(file);
    }
  };

  const startScanning = () => {
    if (isScanning) return; // Prevent multiple scanning sessions
    setIsScanning(true);
    setIsLoading(true);

    const codeReader = new BrowserMultiFormatReader();
    codeReaderRef.current = codeReader;

    codeReader
      .decodeFromVideoDevice(null, videoRef.current, (result, error) => {
        if (result) {
          handleScan(result);
        }
        if (error) {
          handleError(error);
        }
      })
      .then(() => {
        setIsLoading(false);
      })
      .catch((err) => {
        handleError(err);
        setIsLoading(false);
      });
  };

  const fetchParcelAssignmentStatus = async (trackingId) => {
    try {
      const response = await fetch(`/api/parcelassignments/${trackingId}`);
      if (!response.ok) {
        throw new Error("Failed to fetch assignment status");
      }
      const data = await response.json();
      return data.status; // Assuming the API returns { status: "Assigned" }
    } catch (error) {
      console.error("Error fetching assignment status:", error);
      return "Error fetching status"; // Fallback in case of error
    }
  };

  const stopScanning = () => {
    if (codeReaderRef.current) {
      codeReaderRef.current.reset();
      setIsScanning(false);
      setIsLoading(false);
    }
  };

  const toggleScannerMode = () => {
    setIsGalleryMode(!isGalleryMode);
    if (isGalleryMode) {
      stopScanning();
    } else {
      setScannedData(null); // Clear scanned data when switching modes
    }
  };

  useEffect(() => {
    if (!isGalleryMode && isScanning) {
      startScanning();
    } else if (isGalleryMode) {
      stopScanning();
    }
  }, [isGalleryMode]);

  const displayDataInCard = (data) => {
    if (!data || typeof data !== "object") return null;

    return (
      <div>
        {data.parcels && data.parcels.length > 0 ? (
          data.parcels.map((parcel, index) => (
            <div
              key={index}
              className="bg-white border border-gray-300 shadow-lg rounded-lg p-4 mb-4"
            >
              <h4 className="text-lg font-semibold mb-2">Parcel Details</h4>
              <p className="font-semibold text-gray-700">Tracking ID:</p>
              <p className="text-gray-600">{parcel.trackingId}</p>
              <p className="font-semibold text-gray-700">Recipient Name:</p>
              <p className="text-gray-600">{parcel.recipientName}</p>
              <p className="font-semibold text-gray-700">Recipient Address:</p>
              <p className="text-gray-600">{parcel.recipientAddress}</p>
              <p className="font-semibold text-gray-700">
                Recipient Contact Number:
              </p>
              <p className="text-gray-600">{parcel.recipientContactNumber}</p>
              <p className="font-semibold text-gray-700">Recipient Pincode:</p>
              <p className="text-gray-600">{parcel.recipientPincode}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-600">No parcels found.</p>
        )}
        {data.agentName && (
          <div className="bg-white border border-gray-300 shadow-lg rounded-lg p-4 mt-4">
            <h4 className="text-lg font-semibold mb-2">Agent Details</h4>
            <p className="font-semibold text-gray-700">Agent Name:</p>
            <p className="text-gray-600">{data.agentName}</p>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center">
      <AgentNavbar />
      <h1 className="text-3xl font-bold text-center mt-24 mb-6 text-gray-700">
        Agent Dashboard
      </h1>
      <div className="bg-white shadow-lg rounded-lg p-6 mb-6 w-full max-w-lg">
        <h2 className="text-xl font-semibold mb-4">Scan QR Code</h2>
        <div className="flex justify-center mb-4">
          <button
            onClick={() => setIsGalleryMode(false)}
            className={`p-2 rounded ${
              !isGalleryMode ? "bg-blue-500 text-white" : "bg-gray-300"
            }`}
          >
            Use Camera
          </button>
          <button
            onClick={() => setIsGalleryMode(true)}
            className={`p-2 rounded ${
              isGalleryMode ? "bg-blue-500 text-white" : "bg-gray-300"
            } ml-4`}
          >
            Upload from Gallery
          </button>
        </div>
        {isGalleryMode ? (
          <input
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            ref={fileInputRef}
            className="w-full"
          />
        ) : isLoading ? (
          <div className="flex justify-center items-center h-48">
            <p className="text-gray-600">Loading camera...</p>
          </div>
        ) : (
          <div className="relative">
            <video ref={videoRef} style={{ width: "100%", height: "auto" }} />
          </div>
        )}

        <button
          onClick={startScanning}
          className={`mt-4 p-2 rounded ${
            isScanning ? "bg-gray-300" : "bg-blue-500 text-white"
          }`}
          disabled={isScanning}
        >
          {isScanning ? "Scanning..." : "Start Scanning"}
        </button>

        {scannedData && (
          <div className="mt-6" ref={detailsRef}>
            <h3 className="text-lg font-semibold mb-2">Scanned Data:</h3>
            {parsedData ? (
              displayDataInCard(parsedData) // Show parsed data in card format
            ) : (
              <p className="text-gray-600">{scannedData}</p> // Plain text fallback
            )}
            {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
          </div>
        )}
      </div>
    </div>
  );
};

export default ParcelScanForDelivery;
