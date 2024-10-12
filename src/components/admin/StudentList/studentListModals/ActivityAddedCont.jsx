import React from "react";
import { IoIosClose } from "react-icons/io";

const ActivityAddedCont = ({ onClose, isActivitySuccess }) => {
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
        {isActivitySuccess ? (
          <h3 className='text-[24px] text-center'>
            Activity Successfully Added!
          </h3>
        ) : (
          <h3 className='text-[24px] text-center'>
            Something went wrong, try again later.
          </h3>
        )}
        <div className='flex justify-evenly w-full pt-2'>
          <button
            onClick={onClose}
            className='font-serif text-[18px] w-[84px] rounded-sm text-white bg-green-800 p-1 hover:bg-green-700'>
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default ActivityAddedCont;
