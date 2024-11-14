import React from "react";
import { IoIosClose } from "react-icons/io";

const ConfrimDiscard = ({ onClose, onConfirm }) => {
  return (
    <div>
      <div className='flex items-center justify-between border-b-2'>
        <h2></h2>
        <IoIosClose
          className='text-[26px] m-1 hover:cursor-pointer hover:bg-black/20 rounded-full'
          onClick={onClose}
        />
      </div>
      <div className='p-2 font-serif flex flex-col justify-center items-center'>
        <h3 className='text-[24px] text-center'>
          Are you sure you want to discard this student? This action cannot be
          undone.
        </h3>
        <div className='flex justify-evenly w-full pt-2'>
          <button
            onClick={onConfirm}
            className='font-serif  text-[18px] w-[84px] rounded-sm text-white bg-green-800 p-1 hover:bg-green-700'>
            Yes
          </button>
          <button
            onClick={onClose}
            className='font-serif  text-[18px] w-[74px] rounded-sm text-white bg-red-800 p-1 hover:bg-red-700'>
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfrimDiscard;
