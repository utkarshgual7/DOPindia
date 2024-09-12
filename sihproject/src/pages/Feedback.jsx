import React, { useState } from "react";

const Feedback = () => {
  const [rating, setRating] = useState(0);
  const [description, setDescription] = useState("");
  const [improvementComments, setImprovementComments] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission (send data to backend, etc.)
    console.log({
      rating,
      description,
      improvementComments,
    });
    // Reset form
    setRating(0);
    setDescription("");
    setImprovementComments("");
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        Parcel Delivery Feedback
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Star Rating */}
        <div>
          <label className="text-lg font-medium text-gray-700">
            Rate Your Delivery Experience:
          </label>
          <div className="flex space-x-2 mt-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                type="button"
                key={star}
                onClick={() => setRating(star)}
                className={`text-2xl ${
                  rating >= star ? "text-yellow-500" : "text-gray-300"
                }`}
              >
                ★
              </button>
            ))}
          </div>
        </div>

        {/* Delivery Description */}
        <div>
          <label
            htmlFor="description"
            className="block text-lg font-medium text-gray-700"
          >
            Delivery Description:
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe your delivery experience..."
            rows={4}
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Improvement Comments */}
        <div>
          <label
            htmlFor="improvementComments"
            className="block text-lg font-medium text-gray-700"
          >
            How Can We Improve?
          </label>
          <textarea
            id="improvementComments"
            value={improvementComments}
            onChange={(e) => setImprovementComments(e.target.value)}
            placeholder="Any suggestions for improvement..."
            rows={4}
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full px-4 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Submit Feedback
        </button>
      </form>
    </div>
  );
};

export default Feedback;
