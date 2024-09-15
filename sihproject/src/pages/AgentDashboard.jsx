import React, { useState, useRef, useEffect } from "react";
import { BrowserMultiFormatReader } from "@zxing/library";

const AgentDashboardPage = () => {
  const [scannedData, setScannedData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isGalleryMode, setIsGalleryMode] = useState(false);
  const videoRef = useRef(null);
  const fileInputRef = useRef(null);
  const codeReaderRef = useRef(null);

  // Function to handle the raw scan result
  const handleScan = (result) => {
    if (result) {
      const rawData = result.text;
      console.log("Raw QR Code Data:", rawData);
      setScannedData(rawData); // Show raw data first

      // Check if the data is a URL
      if (isURL(rawData)) {
        alert("This QR code contains a URL: " + rawData);
      } else {
        // If not a URL, display it as plain text
        alert("This QR code contains plain text or other data.");
      }
    }
  };

  // Function to handle errors in the scanning process
  const handleError = (error) => {
    console.error("QR code scanner error:", error);
  };

  // Function to handle file upload and scan the QR code from an image
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
      reader.readAsDataURL(file); // Convert file to data URL
    }
  };

  // Function to check if data is a URL
  const isURL = (data) => {
    const urlPattern = new RegExp(
      "^(https?:\\/\\/)?" + // protocol
        "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|" + // domain name
        "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
        "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
        "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
        "(\\#[-a-z\\d_]*)?$",
      "i"
    );
    return !!urlPattern.test(data);
  };

  // Function to start scanning from the camera
  const startScanning = () => {
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

  // Initialize the scanning process
  useEffect(() => {
    if (!isGalleryMode) {
      const timer = setTimeout(() => {
        startScanning();
      }, 3000); // Start after a delay

      return () => {
        clearTimeout(timer);
        if (codeReaderRef.current) {
          codeReaderRef.current.reset();
        }
      };
    }
  }, [isGalleryMode]);

  // Function to format plain text data
  const formatPlainText = (data) => {
    return data
      .split("\n") // Split into lines
      .filter((line) => line.trim() !== "") // Remove empty lines
      .map((line, index) => (
        <div key={index} className="mb-2">
          <span className="font-semibold">{`Line ${index + 1}: `}</span>
          <span>{line}</span>
        </div>
      ));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center">
      <h1 className="text-3xl font-bold text-center mt-24 mb-6 text-gray-700">
        Agent Dashboard
      </h1>
      <div className="bg-white shadow-md rounded-lg p-6 mb-6 w-full max-w-md">
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
        {scannedData && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-2">Scanned Data:</h3>
            <div className="bg-gray-100 p-4 rounded">
              {formatPlainText(scannedData)}
            </div>
            {isURL(scannedData) && (
              <a
                href={scannedData}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline mt-4 block"
              >
                Visit URL
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AgentDashboardPage;
