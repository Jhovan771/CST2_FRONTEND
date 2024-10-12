import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { FaTimes } from "react-icons/fa";
import { CiMenuFries } from "react-icons/ci";
import { IoMdLogOut } from "react-icons/io";
import { Link } from "react-router-dom";

const Admin_Nav = () => {
  const [click, setClick] = useState(false);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = async () => {
    try {
      localStorage.removeItem("token");

      logout();

      navigate("/");
    } catch (error) {
      console.error("There was an error logging out!", error);
    }
  };

  const handleClick = () => setClick(!click);

  const content = (
    <>
      <div className='lg:hidden block absolute bg-red-900 top-10 w-full left-0 right-0 transition'>
        <ul className='text-center text-xl p-20'>
          <li className='my-4 py-4 border-b border-white text-white hover:border-white/10 hover:rounded font-serif'>
            <Link to='/dashboard' onClick={handleClick}>
              Dashboard
            </Link>
          </li>
          <li className='my-4 py-4 border-b border-white text-white hover:border-white/10 hover:rounded  font-serif'>
            <Link to='/profile' onClick={handleClick}>
              Profiles
            </Link>
          </li>
          <li
            className='my-4 py-4 transition px-2 flex justify-center items-center drop-shadow-lg rounded-lg border-b-2 border-white text-white hover:bg-blue-600 cursor-pointer  font-serif'
            onClick={handleLogout}>
            <IoMdLogOut />
          </li>
        </ul>
      </div>
    </>
  );

  return (
    <nav className='fixed top-0 z-50 w-full bg-red-900  drop-shadow-md'>
      <div className='h-16 flex justify-between items-center px-16 text-primary lg:py-5'>
        <span className='text-[18px] text-white font-serif p-2'>
          Speak Wise
        </span>
        <div className='lg:flex md:flex lg:flex-1 items-center justify-end font-normal hidden'>
          <div className='flex-10'>
            <ul className='flex gap-8 mr-16 text-[18px]'>
              <li className='hover:text-white/60 transition border-b-2 border-white text-white hover:border-white/10 cursor-pointer  font-serif'>
                <Link to='/dashboard'>Dashboard</Link>
              </li>
              <li className='hover:text-white/60 transition border-b-2 border-white text-white hover:border-white/10 cursor-pointer  font-serif'>
                <Link to='/profile'>Profile</Link>
              </li>
              <li
                className='transition px-2 flex justify-center items-center drop-shadow-lg rounded-lg border-b-2 border-white text-white hover:bg-red-600 cursor-pointer  font-serif'
                onClick={handleLogout}>
                <IoMdLogOut />
              </li>
            </ul>
          </div>
        </div>
        <div>{click && content}</div>
        <button
          className='block sm:hidden transition text-white'
          onClick={handleClick}>
          {click ? <FaTimes /> : <CiMenuFries />}
        </button>
      </div>
    </nav>
  );
};

export default Admin_Nav;
