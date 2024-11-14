// OTP.jsx
import React, { useState } from "react";
import { verifyOTP } from "../services/authService";

const OTP = ({ formData, onClose }) => {
  const [otp, setOtp] = useState(Array(6).fill(""));
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (element, index) => {
    const value = element.value.replace(/\D/g, "");
    if (value) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (index < 5 && value) {
        document.getElementById(`otp-${index + 1}`).focus();
      }
    }
  };

  const handleOTPSubmit = async () => {
    try {
      const otpCode = otp.join("");
      await verifyOTP(
        formData.username,
        formData.password,
        formData.email,
        otpCode
      );
      onClose();
      alert("Account created successfully!");
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <div className='flex flex-col justify-center items-center font-mono'>
      <h3 className='py-2'>OTP has been sent to your Email</h3>
      {errorMessage && <p className='text-red-500'>{errorMessage}</p>}
      <div className='flex gap-2'>
        {otp.map((digit, index) => (
          <input
            key={index}
            type='text'
            id={`otp-${index}`}
            maxLength='1'
            value={digit}
            onChange={(e) => handleChange(e.target, index)}
            className='w-10 h-10 border-2 border-black rounded-md text-center'
          />
        ))}
      </div>
      <button
        onClick={handleOTPSubmit}
        className='my-4 p-2 bg-blue-800 hover:bg-blue-700 text-white rounded-md'>
        Register
      </button>
    </div>
  );
};

export default OTP;
