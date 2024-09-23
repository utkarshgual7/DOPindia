import React, { useState } from "react";
import axios from "axios";
import Header from "../components/Header";
import { Navigate, useNavigate } from "react-router-dom";

const BookParcel = () => {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();
  const [parcelData, setParcelData] = useState({
    senderName: "",
    senderAddress: "",
    senderState: "",
    senderDistrict: "",
    senderPincode: "",
    senderContactNumber: "",
    senderEmail: "",
    recipientName: "",
    recipientAddress: "",
    recipientState: "",
    recipientDistrict: "",
    recipientPincode: "",
    recipientContactNumber: "",
    recipientEmail: "",
    content: "",
    category: "",
    weight: "",
    deliveryTimeFrame: "",
  });

  const handleDataChange = (data) => {
    setParcelData((prevData) => ({ ...prevData, ...data }));
  };

  const handleNextStep = () => {
    setStep((prevStep) => prevStep + 1);
  };

  const handlePreviousStep = () => {
    setStep((prevStep) => prevStep - 1);
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post("/api/parcel/book", parcelData);
      // Redirect to a success page or confirmation
      alert("Parcel booked successfully!");
      const parcelDetails = response.data.parcel;
      navigate("/success", { state: parcelDetails });

      // You might use navigate('/success') if using React Router
    } catch (error) {
      console.error("Error booking parcel", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <Header />
      <div className="bg-white mt-[100px] shadow-md rounded-lg p-6 max-w-md mx-auto">
        {step === 1 && (
          <SenderDetails
            onDataChange={handleDataChange}
            onNext={handleNextStep}
          />
        )}
        {step === 2 && (
          <RecipientDetails
            onDataChange={handleDataChange}
            onPrevious={handlePreviousStep}
            onNext={handleNextStep}
          />
        )}
        {step === 3 && (
          <AdditionalDetails
            onDataChange={handleDataChange}
            onPrevious={handlePreviousStep}
            onNext={handleNextStep}
          />
        )}
        {step === 4 && (
          <Confirmation
            data={parcelData}
            onSubmit={handleSubmit}
            onPrevious={handlePreviousStep}
          />
        )}
      </div>
    </div>
  );
};

const SenderDetails = ({ onDataChange, onNext }) => {
  const [formData, setFormData] = useState({
    senderName: "",
    senderAddress: "",
    senderState: "",
    senderDistrict: "",
    senderPincode: "",
    senderContactNumber: "",
    senderEmail: "",
  });
  const [states] = useState([
    { name: "Select State", districts: [] },
    {
      name: "Andhra Pradesh",
      districts: ["Visakhapatnam", "Vijayawada", "Tirupati"],
    },
    { name: "Arunachal Pradesh", districts: ["Itanagar", "Tawang"] },
    { name: "Assam", districts: ["Guwahati", "Dibrugarh", "Silchar"] },
    { name: "Bihar", districts: ["Patna", "Gaya", "Bhagalpur"] },
    { name: "Chhattisgarh", districts: ["Raipur", "Bilaspur"] },
    { name: "Goa", districts: ["Panaji", "Margao"] },
    { name: "Gujarat", districts: ["Ahmedabad", "Surat", "Vadodara"] },
    { name: "Haryana", districts: ["Gurugram", "Faridabad", "Panipat"] },
    { name: "Himachal Pradesh", districts: ["Shimla", "Dharamshala"] },
    { name: "Jharkhand", districts: ["Ranchi", "Jamshedpur"] },
    {
      name: "Karnataka",
      districts: ["Bengaluru", "Mysuru", "Hubballi-Dharwad"],
    },
    {
      name: "Kerala",
      districts: ["Thiruvananthapuram", "Kochi", "Kozhikode"],
    },
    { name: "Madhya Pradesh", districts: ["Bhopal", "Indore", "Gwalior"] },
    { name: "Maharashtra", districts: ["Mumbai", "Pune", "Nagpur"] },
    { name: "Manipur", districts: ["Imphal"] },
    { name: "Meghalaya", districts: ["Shillong"] },
    { name: "Mizoram", districts: ["Aizawl"] },
    { name: "Nagaland", districts: ["Kohima"] },
    { name: "Odisha", districts: ["Bhubaneswar", "Cuttack"] },
    { name: "Punjab", districts: ["Chandigarh", "Amritsar", "Ludhiana"] },
    { name: "Rajasthan", districts: ["Jaipur", "Udaipur", "Jodhpur"] },
    { name: "Sikkim", districts: ["Gangtok"] },
    { name: "Tamil Nadu", districts: ["Chennai", "Coimbatore", "Madurai"] },
    { name: "Telangana", districts: ["Hyderabad"] },
    { name: "Tripura", districts: ["Agartala"] },

    // Add more states and their districts here

    ,
  ]);

  const [districts, setDistricts] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "senderState") {
      // Update districts based on selected state
      const selectedState = states.find((state) => state.name === value);
      setDistricts(selectedState ? selectedState.districts : []);
    }
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleNext = () => {
    onDataChange(formData);
    onNext();
  };

  return (
    <div className="space-y-4">
      <input
        type="text"
        name="senderName"
        placeholder="Sender Name"
        value={formData.senderName}
        onChange={handleChange}
        className="w-full px-4 py-2 border border-gray-300 rounded-md"
      />
      <input
        type="text"
        name="senderAddress"
        placeholder="Sender Address"
        value={formData.senderAddress}
        onChange={handleChange}
        className="w-full px-4 py-2 border border-gray-300 rounded-md"
      />
      <select
        name="senderState"
        value={formData.senderState}
        onChange={handleChange}
        className="w-full px-4 py-2 border border-gray-300 rounded-md"
      >
        {states.map((state, index) => (
          <option key={index} value={state.name}>
            {state.name}
          </option>
        ))}
      </select>
      <select
        name="senderDistrict"
        value={formData.senderDistrict}
        onChange={handleChange}
        className="w-full px-4 py-2 border border-gray-300 rounded-md"
      >
        <option value="">Select District</option>
        {districts.map((district, index) => (
          <option key={index} value={district}>
            {district}
          </option>
        ))}
      </select>

      <input
        type="text"
        name="senderPincode"
        placeholder="Sender Pincode"
        value={formData.senderPincode}
        onChange={handleChange}
        maxLength={6} // Enforces max 6 digits
        className="w-full px-4 py-2 border border-gray-300 rounded-md"
      />
      <input
        type="text"
        name="senderContactNumber"
        placeholder="Sender Contact Number"
        value={formData.senderContactNumber}
        onChange={handleChange}
        maxLength={13}
        className="w-full px-4 py-2 border border-gray-300 rounded-md"
      />
      <input
        type="email"
        name="senderEmail"
        placeholder="Sender Email"
        value={formData.senderEmail}
        onChange={handleChange}
        className="w-full px-4 py-2 border border-gray-300 rounded-md"
      />
      <button
        onClick={handleNext}
        className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-2 rounded-md"
      >
        Next
      </button>
    </div>
  );
};

const RecipientDetails = ({ onDataChange, onNext, onPrevious }) => {
  const [formData, setFormData] = useState({
    recipientName: "",
    recipientAddress: "",
    recipientState: "",
    recipientDistrict: "",
    recipientPincode: "",
    recipientContactNumber: "",
    recipientEmail: "",
    deliveryTimeFrame: "",
  });
  const [states] = useState([
    {
      name: "Andhra Pradesh",
      districts: ["Visakhapatnam", "Vijayawada", "Tirupati"],
    },
    { name: "Arunachal Pradesh", districts: ["Itanagar", "Tawang"] },
    { name: "Assam", districts: ["Guwahati", "Dibrugarh", "Silchar"] },
    { name: "Bihar", districts: ["Patna", "Gaya", "Bhagalpur"] },
    { name: "Chhattisgarh", districts: ["Raipur", "Bilaspur"] },
    { name: "Goa", districts: ["Panaji", "Margao"] },
    { name: "Gujarat", districts: ["Ahmedabad", "Surat", "Vadodara"] },
    { name: "Haryana", districts: ["Gurugram", "Faridabad", "Panipat"] },
    { name: "Himachal Pradesh", districts: ["Shimla", "Dharamshala"] },
    { name: "Jharkhand", districts: ["Ranchi", "Jamshedpur"] },
    {
      name: "Karnataka",
      districts: ["Bengaluru", "Mysuru", "Hubballi-Dharwad"],
    },
    {
      name: "Kerala",
      districts: ["Thiruvananthapuram", "Kochi", "Kozhikode"],
    },
    { name: "Madhya Pradesh", districts: ["Bhopal", "Indore", "Gwalior"] },
    { name: "Maharashtra", districts: ["Mumbai", "Pune", "Nagpur"] },
    { name: "Manipur", districts: ["Imphal"] },
    { name: "Meghalaya", districts: ["Shillong"] },
    { name: "Mizoram", districts: ["Aizawl"] },
    { name: "Nagaland", districts: ["Kohima"] },
    { name: "Odisha", districts: ["Bhubaneswar", "Cuttack"] },
    { name: "Punjab", districts: ["Chandigarh", "Amritsar", "Ludhiana"] },
    { name: "Rajasthan", districts: ["Jaipur", "Udaipur", "Jodhpur"] },
    { name: "Sikkim", districts: ["Gangtok"] },
    { name: "Tamil Nadu", districts: ["Chennai", "Coimbatore", "Madurai"] },
    { name: "Telangana", districts: ["Hyderabad"] },
    { name: "Tripura", districts: ["Agartala"] },
    // Add more states and their districts here
  ]);

  const [districts, setDistricts] = useState([]);
  const [previousTimeFrame, setPreviousTimeFrame] = useState("");
  const [predictedTimeFrame, setPredictedTimeFrame] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "recipientState") {
      // Update districts based on selected state
      const selectedState = states.find((state) => state.name === value);
      setDistricts(selectedState ? selectedState.districts : []);
    }
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleNext = () => {
    onDataChange(formData);
    onNext();
  };

  const handlePrevious = () => {
    onPrevious();
  };
  const handlePredictTime = async () => {
    const email = formData.recipientEmail;

    try {
      // Fetch all the delivery time frames from MongoDB for this email
      const timeFrameResponse = await fetch(`/api/parcel/timeframes/${email}`);
      const timeFrameData = await timeFrameResponse.json();

      if (timeFrameResponse.ok && timeFrameData.timeFrames.length > 0) {
        // Combine all time frames into a single string, separated by '%'
        const combinedTimeFrames = timeFrameData.timeFrames.join("%");

        // Send the combined time frames to the AI model for prediction
        const aiResponse = await fetch(
          `https://time-prediction-model.onrender.com/predict/${combinedTimeFrames}`
        );
        const aiData = aiResponse;
        console.log(aiData);

        if (aiResponse.ok) {
          const aiData = await aiResponse.json(); // Parse JSON response

          if (aiData && aiData.predicted_time) {
            const trimmedTimeFrame = aiData.predicted_time.trim(); // Remove
            setPredictedTimeFrame(trimmedTimeFrame); // Store the cleaned
            setFormData((prev) => ({
              ...prev,
              deliveryTimeFrame: trimmedTimeFrame,
            }));
          } else {
            console.error(
              "Prediction response is missing 'predicted_time':",
              aiData
            );
          }
        } else {
          console.error(
            "Error fetching prediction from AI model:",
            aiResponse.statusText
          );
        }
      } else {
        console.error(
          "No time frames found or error fetching data:",
          timeFrameData.message
        );
      }
    } catch (error) {
      console.error("Error fetching time frames or AI prediction:", error);
    }
  };

  return (
    <>
      <div className="space-y-4 ">
        <input
          type="text"
          name="recipientName"
          placeholder="Recipient Name"
          value={formData.recipientName}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md"
        />
        <input
          type="text"
          name="recipientAddress"
          placeholder="Recipient Address"
          value={formData.recipientAddress}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md"
        />
        <select
          name="recipientState"
          value={formData.recipientState}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md"
        >
          <option value="">Select State</option>
          {states.map((state, index) => (
            <option key={index} value={state.name}>
              {state.name}
            </option>
          ))}
        </select>
        <select
          name="recipientDistrict"
          value={formData.recipientDistrict}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md"
          disabled={!formData.recipientState}
        >
          <option value="">Select District</option>
          {districts.map((district, index) => (
            <option key={index} value={district}>
              {district}
            </option>
          ))}
        </select>
        <input
          type="text"
          name="recipientPincode"
          placeholder="Recipient Pincode"
          value={formData.recipientPincode}
          onChange={handleChange}
          maxLength={6} // Enforces max 6 digits
          className="w-full px-4 py-2 border border-gray-300 rounded-md"
        />
        <input
          type="text"
          name="recipientContactNumber"
          placeholder="Recipient Contact Number"
          value={formData.recipientContactNumber}
          onChange={handleChange}
          maxLength={13}
          className="w-full px-4 py-2 border border-gray-300 rounded-md"
        />
        <input
          type="email"
          name="recipientEmail"
          placeholder="Recipient Email"
          value={formData.recipientEmail}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md"
        />
        <select
          name="deliveryTimeFrame"
          value={
            formData.deliveryTimeFrame ||
            previousTimeFrame ||
            predictedTimeFrame
          }
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md"
        >
          <option value="">Select Delivery Time Frame</option>
          <option value="11:00-12:00">11AM-12PM</option>
          <option value="12:00-14:00">12PM-2PM</option>
          <option value="14:00-16:00">2PM-4PM</option>
          <option value="16:00-17:00">4PM-5PM</option>
          <option value="17:00-18:00">5PM-6PM</option>
          <option value="18:00-19:00">6PM-7PM</option>
        </select>

        {/* New Predict Time Button */}
        <button
          onClick={handlePredictTime}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md mt-2"
        >
          Predict Delivery Time
        </button>
        <div className="flex justify-between">
          <button
            onClick={handlePrevious}
            className="bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-md"
          >
            Previous
          </button>
          <button
            onClick={handleNext}
            className="bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-2 px-4 rounded-md"
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
};

const AdditionalDetails = ({ onDataChange, onNext, onPrevious }) => {
  const [formData, setFormData] = useState({
    content: "",
    category: "",
    weight: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleNext = () => {
    onDataChange(formData);
    onNext();
  };

  const handlePrevious = () => {
    onPrevious();
  };

  return (
    <div className="space-y-4">
      <input
        type="text"
        name="content"
        placeholder="Parcel Content"
        value={formData.content}
        onChange={handleChange}
        className="w-full px-4 py-2 border border-gray-300 rounded-md"
      />
      <select
        name="category"
        value={formData.category}
        onChange={handleChange}
        className="w-full px-4 py-2 border border-gray-300 rounded-md"
      >
        <option value="">Select Category</option>
        <option value="electronics">Electronics</option>
        <option value="clothing">Clothing</option>
        <option value="books">Books</option>
        <option value="furniture">Furniture</option>
        <option value="other">Other</option>
      </select>
      <select
        name="weight"
        placeholder="Weight (kg)"
        value={formData.weight}
        onChange={handleChange}
        className="w-full px-4 py-2 border border-gray-300 rounded-md"
      >
        <option value="">Select Weight (in kg)</option>
        <option value="0-0.5">0-500gms</option>
        <option value="0.5-1.0">500gms-1kg</option>
        <option value="1.0-2.0">1kg-2kg</option>
        <option value="2.0-4.0">2kg-4kg</option>
        <option value=">5.0">More than 5Kg</option>
      </select>

      <div className="flex justify-between">
        <button
          onClick={handlePrevious}
          className="bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-md"
        >
          Previous
        </button>
        <button
          onClick={handleNext}
          className="bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-2 px-4 rounded-md"
        >
          Next
        </button>
      </div>
    </div>
  );
};

const Confirmation = ({ data, onSubmit, onPrevious }) => {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Confirm Your Details</h2>
      <div className="space-y-2">
        <div>
          <strong>Sender Name:</strong> {data.senderName}
        </div>
        <div>
          <strong>Sender Address:</strong> {data.senderAddress}
        </div>
        <div>
          <strong>Sender Pincode:</strong> {data.senderPincode}
        </div>
        <div>
          <strong>Sender Contact Number:</strong> {data.senderContactNumber}
        </div>
        <div>
          <strong>Sender Email:</strong> {data.senderEmail}
        </div>
        <div>
          <strong>Recipient Name:</strong> {data.recipientName}
        </div>
        <div>
          <strong>Recipient Address:</strong> {data.recipientAddress}
        </div>
        <div>
          <strong>Recipient Pincode:</strong> {data.recipientPincode}
        </div>
        <div>
          <strong>Recipient Contact Number:</strong>{" "}
          {data.recipientContactNumber}
        </div>
        <div>
          <strong>Recipient Email:</strong> {data.recipientEmail}
        </div>
        <div>
          <strong>Parcel Content:</strong> {data.content}
        </div>
        <div>
          <strong>Category:</strong> {data.category}
        </div>
        <div>
          <strong>Weight:</strong> {data.weight} kg
        </div>
        <div>
          <strong>Delivery Time Frame:</strong> {data.deliveryTimeFrame}
        </div>
      </div>
      <div className="flex justify-between">
        <button
          onClick={onPrevious}
          className="bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-md"
        >
          Previous
        </button>
        <button
          onClick={onSubmit}
          className="bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-2 px-4 rounded-md"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default BookParcel;
