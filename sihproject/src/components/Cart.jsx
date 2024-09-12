import React, { useEffect, useState } from "react";
import { XIcon } from "@heroicons/react/outline";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setCart, removeItem } from "../redux/cart/cartSlice.js"; // Import Redux actions

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.items); // Get cart items from Redux
  const email = useSelector((state) => state.user.currentUser.email);

  const [loading, setLoading] = useState(true);

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  useEffect(() => {
    if (!email) {
      console.error("Email ID is not available");
      return;
    }

    const fetchCart = async () => {
      try {
        const response = await fetch(`/api/store/getcart/${email}`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        dispatch(setCart(data.items || [])); // Dispatch action to update Redux cart state
      } catch (error) {
        console.error("Error fetching cart data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, [email, dispatch]);

  const handleCheckout = () => {
    if (cart.length === 0) {
      alert(
        "Your cart is empty. Please add items to your cart before proceeding."
      );
      return;
    }
    navigate("/checkout");
  };

  const handleRemoveItem = async (itemId) => {
    try {
      // Remove item from Redux store
      dispatch(removeItem(itemId));

      // Update cart on the backend with quantity set to 0 for removal
      await updateCartInBackend({ _id: itemId, quantity: 0 });
    } catch (error) {
      console.error("Error removing item from cart:", error);
    }
  };

  const updateCartInBackend = async (item) => {
    try {
      const response = await fetch("/api/store/updatecart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, item }),
      });
      if (!response.ok) {
        throw new Error("Failed to update cart");
      }
    } catch (error) {
      console.error("Error updating cart:", error);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="fixed right-0 top-20 mt-[120px] mr-4 w-80 bg-gray-800 p-4 rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold text-white">Shopping Cart</h2>
      <div className="mt-4">
        {cart.length === 0 ? (
          <p className="text-gray-400">Your cart is empty.</p>
        ) : (
          <ul>
            {cart.map((item) => (
              <li
                key={item._id}
                className="flex justify-between items-center mb-2"
              >
                <div className="flex items-center">
                  <img
                    src={item.media[0]}
                    alt={item.name}
                    className="w-12 h-12 object-cover rounded"
                  />
                  <span className="ml-2 text-white">{item.name}</span>
                </div>
                <div className="flex items-center">
                  <span className="text-white">
                    {item.quantity} x ₹{item.price}
                  </span>
                  <button
                    onClick={() => handleRemoveItem(item._id)}
                    className="ml-2 text-red-500 hover:text-red-600"
                  >
                    <XIcon className="h-5 w-5" />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
        {cart.length > 0 && (
          <div className="mt-4 flex justify-between items-center">
            <span className="text-white font-semibold">Total: ₹{total}</span>
            <button
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
              onClick={handleCheckout}
            >
              Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
