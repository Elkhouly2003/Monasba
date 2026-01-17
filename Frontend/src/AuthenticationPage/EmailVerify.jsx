import { Link, useNavigate } from "react-router-dom";
import { assets } from "./assets/assets";
import { useEffect, useRef, useState, useContext } from "react";
import { AppContext } from "./context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const EmailVerify = () => {
  const inputRef = useRef([]);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);

  const { backendUrl, userData, getUserData } = useContext(AppContext);

  axios.defaults.withCredentials = true;

  // ================= SEND OTP =================
  const sendOtpToEmail = async () => {
    try {
      const res = await axios.post(backendUrl + "/send-otp");

      if (res.status === 200) {
        toast.success("OTP sent to your email");
        setOtpSent(true);
      }
    } catch (error) {
      toast.error("Failed to send OTP");
    }
  };

  // ================= VERIFY OTP =================
  const handleVerify = async () => {
    const otp = inputRef.current.map((i) => i.value).join("");

    if (otp.length !== 6) {
      toast.error("Please enter all 6 digits of the OTP");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post(backendUrl + "/verify-otp", { otp });

      if (res.status === 200) {
        toast.success("Email verified successfully");
        await getUserData();
        navigate("/");
      }
    } catch (error) {
      toast.error("Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  // ================= ON PAGE LOAD =================
  useEffect(() => {
    // لو مفيش userData (لسه أو مش مسجل) → Login
    if (userData === false) return; // استنى

    if (!userData) {
      navigate("/login");
      return;
    }

    // لو متفعل خلاص
    if (userData.isAccountVerified) {
      navigate("/");
      return;
    }

    // ابعت OTP مرة واحدة
    if (!otpSent) {
      sendOtpToEmail();
    }
  }, [userData, otpSent]);

  // ================= INPUT HANDLERS =================
  const handleChange = (e, index) => {
    const value = e.target.value.replace(/\D/, "");
    e.target.value = value;
    if (value && index < 5) inputRef.current[index + 1].focus();
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !e.target.value && index > 0) {
      inputRef.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const data = e.clipboardData.getData("text").slice(0, 6).split("");
    data.forEach((d, i) => {
      if (inputRef.current[i]) inputRef.current[i].value = d;
    });
    inputRef.current[Math.min(data.length, 5)].focus();
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-r from-[#6a5af9] to-[#8268f9]">
      <Link to="/" className="absolute top-0 left-0 p-4 flex items-center gap-2 no-underline">
        <img src={assets.logo} alt="Logo" width={32} height={32} />
        <span className="text-lg font-semibold text-white">AuthApp</span>
      </Link>

      <div className="p-6 rounded-xl shadow-md bg-white w-full max-w-sm">
        <h4 className="text-center font-bold mb-2 text-gray-800">
          Email Verification
        </h4>

        <p className="text-center mb-4 text-gray-600">
          OTP sent to <br />
          <span className="font-semibold">{userData?.email}</span>
        </p>

        <div className="flex justify-between gap-2 mb-4">
          {[...Array(6)].map((_, index) => (
            <input
              key={index}
              type="text"
              maxLength="1"
              className="w-12 h-12 text-center text-2xl border border-gray-300 rounded-md"
              ref={(el) => (inputRef.current[index] = el)}
              onChange={(e) => handleChange(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              onPaste={handlePaste}
            />
          ))}
        </div>

        <button
          onClick={handleVerify}
          disabled={loading}
          className="w-full bg-indigo-600 text-white py-2 rounded-md font-semibold disabled:opacity-50"
        >
          {loading ? "Verifying..." : "Verify Email"}
        </button>
      </div>
    </div>
  );
};

export default EmailVerify;
