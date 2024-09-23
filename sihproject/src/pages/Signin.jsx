import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import IntroText from "../components/IntroText";
import { signInFailure, signInSuccess } from "../redux/client/clientSlice";
import { useDispatch } from "react-redux";
import Navbar from "../components/Navbar";

function ImageWithAlt({ src, alt, className }) {
  return <img src={src} alt={alt} className={className} loading="lazy" />;
}

function Signin() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false); // Track OTP sent status
  const [message, setMessage] = useState(""); // Message state
  const [loading, setLoading] = useState(false); // Loading state
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const Spinner = () => (
    <div className="spinner border-t-4 border-blue-500 border-solid rounded-full w-6 h-6 animate-spin"></div>
  );

  // Function to handle OTP sending
  const handleSendOtp = async () => {
    setLoading(true);
    try {
      await axios.post("/api/auth/send-otp", { email });
      setOtpSent(true); // Set OTP sent status to true
      setMessage("An OTP has been sent to your email."); // Set success message
    } catch (error) {
      console.error("Error sending OTP:", error);
      setMessage("Failed to send OTP. No user exists."); // Set error message
    } finally {
      setLoading(false); // Ensure loading is stopped regardless of success or failure
    }
  };

  // Function to handle OTP verification and login
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      });

      const data = await res.json(); // Parse JSON response

      if (!res.ok || data.success === false) {
        dispatch(signInFailure(data.message || "Login failed"));
        setMessage(data.message || "Login failed");
        return;
      }

      dispatch(signInSuccess(data));
      navigate("/"); // Navigate to the bookservice page
    } catch (error) {
      console.error("Error verifying OTP:", error);
      setMessage("Error verifying OTP. Please try again.");
      dispatch(signInFailure(error.message));
    } finally {
      setLoading(false); // Ensure loading is stopped regardless of success or failure
    }
  };

  return (
    <div className="flex flex-col overflow-hidden pb-20 bg-white">
      <Navbar />
      <main className="flex flex-col self-center mt-[100px] w-full max-w-[1662px] max-md:max-w-full">
        <section className="self-end mt-5 w-full max-w-[1537px] max-md:mt-10 max-md:max-w-full">
          <div className="flex gap-5 max-md:flex-col">
            <form
              className="flex overflow-hidden flex-col grow justify-center ml-5 px-10 py-8 w-full max-w-md bg-red-50 rounded-3xl border border-solid border-neutral-800 border-opacity-50 shadow-lg max-md:px-6 max-md:py-6 max-md:ml-0 max-md:max-w-full"
              onSubmit={handleLogin} // Handle form submission
            >
              <div className="flex flex-col justify-center items-center w-full">
                <h2 className="text-3xl font-semibold text-center text-zinc-800">
                  Sign in
                </h2>
                <div className="flex flex-col mt-8 w-full">
                  <label
                    htmlFor="emailInput"
                    className="py-1 w-full text-sm text-stone-500"
                  >
                    Email or mobile phone number
                  </label>
                  <input
                    type="email"
                    id="emailInput"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex mt-2 w-full rounded-lg border border-solid border-stone-400 p-3 text-base text-zinc-700 focus:outline-none focus:border-neutral-900 min-h-[48px]"
                    aria-label="Email or mobile phone number"
                    required
                  />
                  <button
                    type="button"
                    onClick={handleSendOtp} // Handle OTP sending
                    className={`mt-4 px-6 py-2 w-full text-base font-medium text-white bg-neutral-900 rounded-full hover:bg-black transition-colors duration-200 ${
                      loading && "opacity-50 cursor-not-allowed"
                    }`}
                    disabled={loading} // Disable button during loading
                  >
                    {loading && !otpSent ? <Spinner /> : "Send OTP"}
                  </button>
                  {/* Display the message to the user */}
                  {message && (
                    <p className="mt-4 text-sm text-center text-stone-500">
                      {message}
                    </p>
                  )}
                  {otpSent && (
                    <>
                      <label
                        htmlFor="otpInput"
                        className="flex flex-col mt-6 w-full text-sm text-stone-500"
                      >
                        <span className="flex justify-between w-full">
                          OTP Code
                          <span className="flex items-center gap-2 text-sm text-right text-stone-500 text-opacity-80">
                            <ImageWithAlt
                              src="https://cdn.builder.io/api/v1/image/assets/TEMP/1ad1e2b922126e200ec6b1b7ee5a8058f733285ce3c5cbe463cce88f18ea1215?placeholderIfAbsent=true&apiKey=6c2297f39c3644869211fbde5d1d4f30"
                              alt="Show/Hide OTP"
                              className="object-contain w-5 aspect-square"
                            />
                            <span>Hide</span>
                          </span>
                        </span>
                      </label>
                      <input
                        type="text"
                        id="otpInput"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        className="flex mt-2 w-full rounded-lg border border-solid border-stone-400 p-2 text-base text-zinc-700 focus:outline-none focus:border-neutral-900 min-h-[48px]"
                        aria-label="OTP Code"
                        required
                      />
                    </>
                  )}
                </div>
                <button
                  type="submit"
                  className={`flex justify-center items-center mt-8 px-10 py-3 w-full text-lg font-medium text-white bg-neutral-900 rounded-full hover:bg-black transition-colors duration-200 ${
                    loading && "opacity-50 cursor-not-allowed"
                  }`}
                  disabled={loading} // Disable button during loading
                >
                  {loading ? <Spinner /> : "Log in"}
                </button>
                <div className="flex flex-wrap gap-2.5 py-2 mt-4 text-sm text-stone-500 text-center">
                  <span className="text-zinc-800">
                    By continuing, you agree to the
                  </span>
                  <a href="#" className="underline text-neutral-900">
                    Terms of use
                  </a>
                  <span className="text-zinc-800">and</span>
                  <a href="#" className="underline text-neutral-900">
                    Privacy Policy
                  </a>
                  .
                </div>
              </div>

              <p className=" text-sm text-center text-stone-500">
                Do not have an account?{" "}
                <a href="/signup" className="text-neutral-900 underline">
                  Sign up
                </a>
              </p>
            </form>
            <div className="flex flex-col justify-center items-center ml-5 max-md:ml-0">
              <p className="text-lg rounded-md px-2 py-2 bg-blue-300 font-semibold ">
                <a
                  href="/officerlogin"
                  className="text-gray-900  hover:underline"
                >
                  Employee Login
                </a>
              </p>

              <p className="text-lg rounded-md my-2 px-2 py-2 bg-blue-300 font-semibold ">
                <a
                  href="/agentlogin"
                  className="text-gray-900  hover:underline"
                >
                  Postman Login
                </a>
              </p>

              <IntroText />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Signin;
