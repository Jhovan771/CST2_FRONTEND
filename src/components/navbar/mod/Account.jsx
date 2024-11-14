// Account.jsx
import React, { useState } from "react";
import { BiShow, BiHide } from "react-icons/bi";
import OTPModal from "../../modals/otpMod";
import OTP from "./OTP";
import { registerUser } from "../services/authService";

const Account = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [openOTP, setOpenOTP] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleRegister = async () => {
    try {
      await registerUser(formData.username, formData.password, formData.email);
      setOpenOTP(true);
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <div className='flex flex-col justify-center items-center font-mono'>
      <h3 className='text-[24px]'>Register</h3>
      {errorMessage && <p className='text-red-500'>{errorMessage}</p>}
      <div className='flex justify-between w-full py-2'>
        <h3 className='flex items-center'>Email :</h3>
        <input
          className='w-[82%] h-10 border-2 border-black rounded-md p-1'
          placeholder='user@gmail.com'
          type='text'
          name='email'
          onChange={handleChange}
        />
      </div>
      <div className='flex justify-between w-full py-2'>
        <h3 className='flex items-center'>Username :</h3>
        <input
          className='w-[72%] h-10 border-2 border-black rounded-md p-1'
          placeholder='user123'
          type='text'
          name='username'
          onChange={handleChange}
        />
      </div>
      <div className='flex justify-between w-full py-2'>
        <h3 className='flex items-center'>Password :</h3>
        <div className='relative w-[72%]'>
          <input
            className='w-full h-10 border-2 border-black rounded-md p-1 pr-10'
            type={showPassword ? "text" : "password"}
            name='password'
            onChange={handleChange}
          />
          <div
            onClick={togglePasswordVisibility}
            className='absolute right-2 top-2 text-[20px] text-black-400 cursor-pointer'>
            {showPassword ? <BiShow /> : <BiHide />}
          </div>
        </div>
      </div>
      <div className='flex justify-end w-full'>
        <button
          onClick={handleRegister}
          className='py-2 w-24 rounded-lg bg-blue-800 text-white hover:bg-blue-700'>
          Next
        </button>
      </div>

      <OTPModal open={openOTP} onClose={() => setOpenOTP(false)}>
        <OTP formData={formData} onClose={() => setOpenOTP(false)} />
      </OTPModal>
    </div>
  );
};

export default Account;
