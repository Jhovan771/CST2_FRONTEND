import React from "react";
import { FaFacebookMessenger, FaTelegram } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";

const Footer = () => {
  return (
    <div className='w-full bg-gray-100 drop-shadow-md h-auto p-2 border-t-2 border-black'>
      <div className='flex justify-between'>
        <h2 className='font-serif text-[18px]'>Contact us on:</h2>
        <div className='flex justify-center items-center font-serif text-[18px]'>
          <FaFacebookMessenger />
          <h3>dummy.account.123</h3>
        </div>
        <div className='flex justify-center items-center font-serif text-[18px]'>
          <IoMdMail />
          <h3>strangebanning@gmail.com</h3>
        </div>
        <div className='flex justify-center items-center font-serif text-[18px]'>
          <FaTelegram />
          <h3>09669039980</h3>
        </div>
      </div>
    </div>
  );
};

export default Footer;
