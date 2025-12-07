import { Link } from "react-router-dom";
import { assets } from "./assets/assets";
import {  useEffect, useRef } from "react";
import { useState, useContext } from "react";
import { AppContext } from "./context/AppContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const EmailVerify = () => {
    const inputRef = useRef([]);
    const [loading, setLoading] = useState(false);
    const { backendUrl, isLoggedIn, userData, getUserData } = useContext(AppContext);
    const navigate = useNavigate();
    const handleChange = (e, index) => {
        const value = e.target.value.replace(/\D/, "");
        e.target.value = value;
        if (value && index < 5) {
            inputRef.current[index + 1].focus();
        }
    }
    const handleKeyDown = (e, index) => {
        if (e.key === "Backspace" && !e.target.value && index > 0) {
            inputRef.current[index - 1].focus();
        }
    }
    const handlePaste = (e) => {
        e.preventDefault();
        const pasteData = e.clipboardData.getData("text").slice(0, 6).split("");
        pasteData.forEach((digit, i) => {
            if (inputRef.current[i]) {
                inputRef.current[i].value = digit;
            }
        });
        const nextIndex = pasteData.length < 6 ? pasteData.length : 5;
        inputRef.current[nextIndex].focus();
    }
    const handleVerify = async (e) => {
        e.preventDefault();
        const otp = inputRef.current.map(input => input.value).join("");
        if (otp.length < 6) {
            toast.error("Please enter all 6 digits of the OTP");
            return;
        }
        setLoading(true);
        try {
            const response = await axios.post(backendUrl + "/verify-otp", { otp });
            if (response.status === 200) {
                toast.success("OTP verified successfully");
                getUserData();
                navigate("/");
            } else {
                toast.error("Invalid OTP");
            }
        } catch (error) { 
            toast.error("Failed to verify OTP");
        }finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        isLoggedIn && userData && userData.isAccountVerified && navigate("/");
    },[isLoggedIn,userData]);
    


    return (
        <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-r from-[#6a5af9] to-[#8268f9]">
            <Link to="/" className="absolute top-0 left-0 p-4 flex items-center gap-2 no-underline">
                <img src={assets.logo} alt="Logo" width={32} height={32} />
                <span className="text-lg font-semibold text-white">AuthApp</span>
            </Link>
            <div className="p-6 rounded-xl shadow-md bg-white w-full max-w-sm">
                <h4 className="text-center font-bold mb-2 text-gray-800">Email Verify OTP</h4>
                <p className="text-center mb-4 text-gray-600">
                    Enter the 6-digit code sent to your email.
                </p>
                <div className="flex justify-between gap-2 mb-4">
                    {[...Array(6)].map((_, index) => (
                        <input
                            key={index}
                            type="text"
                            maxLength="1"
                            className="w-12 h-12 text-center text-2xl border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
                            ref={(el) => (inputRef.current[index] = el)}
                            onChange={(e) => handleChange(e, index)}
                            onKeyDown={(e) => handleKeyDown(e, index)}
                            onPaste={handlePaste}
                        />
                    ))}

                </div>
                <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-md font-semibold disabled:opacity-50" disabled={loading}
                    onClick={handleVerify}>
                    {loading ? "Verifying..." : "Verify Email"}
                </button>

            </div>
        </div>

    );
}
export default EmailVerify;