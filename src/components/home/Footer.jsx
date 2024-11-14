import React from "react";
import { FaFacebookMessenger, FaTelegram } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";

const Footer = () => {
  return (
    <div className='w-full bg-gray-900 text-white drop-shadow-md h-auto p-2 border-t-2 border-black'>
      <div className='flex flex-col lg:flex-row justify-between items-center'>
        <h2 className='font-serif text-[18px]'>CONTACT US ON</h2>
        <div className='flex justify-center items-center font-serif text-[18px]'>
          <FaFacebookMessenger className='m-2' />
          <h3>jhovan.valentino.5</h3>
        </div>
        <div className='flex justify-center items-center font-serif text-[18px]'>
          <IoMdMail className='m-2' />
          <h3>strangebanning@gmail.com</h3>
        </div>
        <div className='flex justify-center items-center font-serif text-[18px]'>
          <FaTelegram className='m-2' />
          <h3>09669039980</h3>
        </div>
      </div>
    </div>
  );
};

export default Footer;
