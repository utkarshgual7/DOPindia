import React from "react";

const AddToCart = ({ product, addToCart }) => {
  const handleClick = () => {
    addToCart(product);
  };

  return (
    <button
      onClick={handleClick}
      className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
    >
      Add to Cart
    </button>
  );
};

export default AddToCart;
