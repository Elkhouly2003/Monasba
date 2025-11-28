import { Link } from "react-router-dom";
import { assets } from "./assets/assets";
import { useRef } from "react";
import { useState, useContext } from "react";
import { AppContext } from "./context/AppContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
const ResetPassword = () => {
    const inputRef = useRef([]);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [isEmailSent, setIsEmailSent] = useState(false);
    const [otp, setOtp] = useState("");
    const [isOtpSubmitted, setIsOtpSubmitted] = useState(false);
    const { backendUrl, isLoggedIn, userData, getUserData } = useContext(AppContext);


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
    const onSubmitEmail = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            
            const response = await axios.post(backendUrl + "/send-reset-otp?email="+email);
            if (response.status === 200) {
                toast.success("OTP sent to your email");
                setIsEmailSent(true);
            }else {
                toast.error("Something went wrong,please try again");
            }
            } catch (error) {
            toast.error(error.message);
        }finally {
            setLoading(false);
        }
    }
        const handleVerify = async () => {
            // e.preventDefault();
            const otp = inputRef.current.map(input => input.value).join("");
            if (otp.length !== 6) {
                toast.error("Please enter all 6 digits of the OTP");
                return;
            }
            setOtp(otp);
            setIsOtpSubmitted(true);
        }

        
        const onSubmitNewPassword = async (e) => {
            e.preventDefault();
            setLoading(true);
            try {
                const response = await axios.post(backendUrl + "/reset-password", { email, otp, newPassword });
                if (response.status === 200) {
                    toast.success("Password reset successfully");
                    navigate("/login");
                } else {
                    toast.error("Failed to reset password");
                }
            } catch (error) {
                toast.error("Failed to reset password");
            }finally {
                setLoading(false);
            }
        }
        
    
    
            






    axios.defaults.withCredentials = true;

    return (

        <div className="flex items-center justify-center h-screen relative bg-gradient-to-r from-purple-500 to-purple-600">
            <Link to="/" className="absolute top-0 left-1 p-4 flex items-center gap-2 no-underline">
                <img src={assets.logo2} alt="Logo" width={150} height={150} />
                <span className="text-2xl font-semibold text-white"></span>
            </Link>
            {!isEmailSent && (
                <div className="rounded-3xl p-5 text-center bg-white w-full max-w-sm">
                    <h4 className="mb-2 text-xl font-semibold"> Reset Password</h4>
                    <p className="mb-4 text-gray-600">Enter your email </p>
                    <form onSubmit={onSubmitEmail}>
                        <div className="mb-4 bg-gray-100 rounded-full flex items-center px-3 py-2">
                            <span className="text-gray-500">
                                <i className="bi bi-envelope"></i>
                            </span>
                            <input type="email" className="bg-transparent border-0 px-2 py-2 w-full focus:outline-none"
                                placeholder="Enter email Address"
                                onChange={(e) => setEmail(e.target.value)}
                                value={email}
                                required />
                        </div>
                        <button type="submit" className="bg-blue-600 text-white w-full py-2 rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed" disabled={loading} >
                            {loading?"Loading...":"Submit"}
                        </button>

                    </form>

                </div>

            )}

            {/* Add input otp */}
            {!isOtpSubmitted && isEmailSent && (
                <div className="p-5 rounded-3xl shadow-lg bg-white w-96">
                    <h4 className="text-center font-bold mb-2 text-lg">Email Verify OTP</h4>
                    <p className="text-center mb-4 text-gray-600">
                        Enter the 6-digit code sent to your email.
                    </p>
                    <div className="flex justify-between gap-2 mb-4 text-center">
                        {[...Array(6)].map((_, index) => (
                            <input
                                key={index}
                                type="text"
                                maxLength="1"
                                className="w-12 h-12 text-center text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                ref={(el) => (inputRef.current[index] = el)}
                                onChange={(e) => handleChange(e, index)}
                                onKeyDown={(e) => handleKeyDown(e, index)}
                                onPaste={handlePaste}
                            />
                        ))}
                    </div>
                    <button className="bg-blue-600 text-white w-full py-2 rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed" disabled={loading} onClick={handleVerify} >
                        {loading ? "Verifying..." : "Verify Email"}
                    </button>

                </div>
            )}

         {/* New password form */}
                        {isOtpSubmitted && isEmailSent && (
                            <div className="rounded-3xl p-5 text-center bg-white w-full max-w-sm">
                                <h4 className="mb-2 text-xl font-semibold">New Password</h4>
                                <p className="mb-4 text-gray-600">Enter the new password below</p>
                                <form onSubmit={onSubmitNewPassword}>
                                    <div className="mb-4 bg-gray-100 rounded-full flex items-center px-3 py-2">
                                        <span className="text-gray-500">
                                            <i className="bi bi-person-fill-lock"></i>
                                        </span>
                                        <input type="password" className="bg-transparent border-0 px-2 py-2 w-full focus:outline-none"
                                            placeholder="••••••••"
                                            onChange={(e) => setNewPassword(e.target.value)}
                                            value={newPassword}
                                            required />
                                    </div>
                                    <button type="submit" className="bg-blue-600 text-white w-full py-2 rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed" disabled={loading} >

                                        {loading ? "Loading...":"Submit"}

                                    </button>
                                </form>
                            </div>
                        )}
        </div>

    )
}
export default ResetPassword;