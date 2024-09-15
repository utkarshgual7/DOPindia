import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import { useSelector } from "react-redux"; // Import from Redux

const OrderDetails = () => {
  const [selectedOption, setSelectedOption] = useState("From You");
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [showModal, setShowModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [newTime, setNewTime] = useState("");

  const clientEmail = useSelector((state) => state.client.currentClient.email);

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      setError(null);

      try {
        const endpoint =
          selectedOption === "From You" ? "senderEmail" : "recipientEmail";

        const response = await axios.get(`/api/parcel/orders`, {
          params: { [endpoint]: clientEmail }, // Send the email as a query parameter
        });

        setOrders(response.data);
      } catch (error) {
        setError(
          error.response ? error.response.data.message : "An error occurred"
        );
      } finally {
        setLoading(false);
      }
    };

    if (clientEmail) {
      fetchOrders();
    }
  }, [selectedOption, clientEmail]);

  // Function to handle Modify Delivery Time Frame
  const handleModify = (order) => {
    setSelectedOrder(order);
    setShowModal(true);
  };

  // Function to update the delivery time frame
  const updateTimeFrame = async () => {
    if (selectedOrder && newTime) {
      try {
        // Use selectedOrder.trackingId to access the tracking ID of the selected order
        const response = await axios.post(`/api/parcel/tfparcel/modify`, {
          trackingId: selectedOrder.trackingId, // Use trackingId from the selected order
          newTime,
        });

        // Update the order in the local state
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order.id === selectedOrder.id
              ? { ...order, deliveryTimeFrame: newTime }
              : order
          )
        );
        setShowModal(false);
      } catch (error) {
        console.error("Failed to update the delivery time frame", error);
      }
    }
  };
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-200 mt-[100px] p-6">
        <h1 className="text-3xl font-semibold mb-4 text-center">
          Order Details
        </h1>

        <div className="flex justify-center mb-6">
          <button
            onClick={() => setSelectedOption("From You")}
            className={`px-4 py-2 mx-2 rounded-lg ${
              selectedOption === "From You"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-800"
            }`}
          >
            From You
          </button>
          <button
            onClick={() => setSelectedOption("To You")}
            className={`px-4 py-2 mx-2 rounded-lg ${
              selectedOption === "To You"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-800"
            }`}
          >
            To You
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center items-center">
            <div className="spinner-border animate-spin rounded-full h-8 w-8 border-t-2 border-blue-600"></div>
          </div>
        ) : error ? (
          <p className="text-red-500 text-center">{error}</p>
        ) : (
          <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
            {orders.length > 0 ? (
              <ul className="space-y-4">
                {orders.map((order) => (
                  <li key={order.id} className="border-b border-gray-600 pb-4">
                    <p>
                      <strong>Tracking ID:</strong> {order.trackingId}
                    </p>
                    <p>
                      <strong>Recipient Name:</strong> {order.recipientName}
                    </p>
                    <p>
                      <strong>Recipient Pincode:</strong>{" "}
                      {order.recipientPincode}
                    </p>
                    <p>
                      <strong>Status:</strong> {order.status}
                    </p>
                    <p>
                      <strong>Delivery Time Frame:</strong>{" "}
                      {order.deliveryTimeFrame}
                      <button
                        onClick={() => handleModify(order)}
                        className="ml-3 my-2 px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                      >
                        Modify DeliveryTime
                      </button>
                    </p>
                    <p>
                      <strong>Date:</strong>{" "}
                      {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-600 text-center">
                No orders found for the selected option.
              </p>
            )}
          </div>
        )}

        {showModal && (
          <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
              <h2 className="text-xl font-semibold mb-4">
                Modify Delivery Time Frame
              </h2>
              <label className="block mb-2">Select New Time Frame:</label>
              <select
                className="w-full px-3 py-2 border rounded-lg mb-4"
                value={newTime}
                onChange={(e) => setNewTime(e.target.value)}
              >
                <option value="">Select Time Frame</option>
                <option value="10:00-11:00">10:00-11:00</option>
                <option value="11:00-12:00">11:00-12:00</option>
                <option value="12:00-13:00">12:00-13:00</option>
                <option value="13:00-14:00">13:00-14:00</option>
                <option value="14:00-15:00">14:00-15:00</option>
                <option value="15:00-16:00">15:00-16:00</option>
                <option value="16:00-17:00">16:00-17:00</option>
                <option value="17:00-18:00">17:00-18:00</option>
                <option value="18:00-19:00">18:00-19:00</option>
                <option value="19:00-20:00">19:00-20:00</option>
              </select>
              <div className="flex justify-end">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-gray-500 text-white rounded-lg mr-2"
                >
                  Cancel
                </button>
                <button
                  onClick={updateTimeFrame}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default OrderDetails;
