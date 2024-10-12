import React from "react";
import { IoIosClose } from "react-icons/io";

const successDelete = ({ onClose }) => {
  const handleConfirm = () => {
    window.location.reload();
  };
  return (
    <div>
      <div>
        <div className='flex items-center justify-between border-b-2'>
          <h2></h2>
          <IoIosClose
            className='text-[26px] m-1 hover:cursor-pointer hover:bg-black/20 rounded-full'
            onClick={onClose}
          />
        </div>
        <div className='font-serif p-2flex flex-col items-center justify-center'>
          <h3 className=' text-[24px] text-center'>Successfully Deleted!</h3>
          <div className='w-full flex justify-center p-2'>
            <button
              onClick={handleConfirm}
              className='w-[84px] text-[18px] font-serif rounded-sm bg-green-800 text-white p-1'>
              Confirm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default successDelete;
