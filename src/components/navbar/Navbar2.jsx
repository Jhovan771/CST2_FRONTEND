import React, { useState } from "react";
import { Link as ScrollLink } from "react-scroll";
import { FaTimes, FaUserCircle, FaRegUser, FaLock } from "react-icons/fa";
import { IoIosClose } from "react-icons/io";
import { BiShow, BiHide } from "react-icons/bi";
import { CiMenuFries } from "react-icons/ci";
import LogModal from "../modals/LogModal";
import { useLogin } from "./useLogin";
import { useAuth } from "../context/AuthContext";
import Register from "../modals/newAccount";
import Account from "./mod/Account";

const Navbar2 = () => {
  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);
  const [open, setOpen] = useState(false);
  const [openAccountRegister, setOpenAccountRegister] = useState(false);

  const {
    username,
    setUsername,
    password,
    setPassword,
    showPassword,
    togglePasswordVisibility,
    handleLogin,
  } = useLogin();

  const { isAuthenticated, logout } = useAuth();

  const content = (
    <>
      <div className='lg:hidden block absolute bg-gray-100 top-16 w-full left-0 right-0 transition'>
        <ul className='text-center text-xl p-20'>
          <li className='my-4 py-4 border-b border-blue-800 hover:border-[#9c0c07] hover:rounded font-serif'>
            <ScrollLink
              to='Home'
              spy={true}
              smooth={true}
              offset={-70}
              duration={500}
              onClick={handleClick}>
              Home
            </ScrollLink>
          </li>
          <li className='my-4 py-4 border-b border-blue-800 hover:border-[#9c0c07] hover:rounded font-serif'>
            <ScrollLink
              to='About'
              spy={true}
              smooth={true}
              offset={-70}
              duration={500}
              onClick={handleClick}>
              About
            </ScrollLink>
          </li>
          <li
            className='transition px-2 flex justify-center items-center drop-shadow-lg rounded-lg border-b-2 border-blue-800 hover:bg-blue-600 cursor-pointer font-serif'
            onClick={() => setOpen(true)}>
            <h3>Login</h3>
            <FaUserCircle />
          </li>
        </ul>
      </div>
    </>
  );

  return (
    <nav className='fixed top-0 z-50 w-full bg-gray-100 drop-shadow-md'>
      <div className='h-16 flex justify-between items-center px-16 text-primary lg:py-5'>
        <span className='text-[18px] font-serif p-2'>Speak Wise</span>
        <div className='lg:flex md:flex lg:flex-1 items-center justify-end font-normal hidden'>
          <div className='flex-10'>
            <ul className='flex gap-8 mr-16 text-[18px]'>
              <li className='hover:text-[#9c0c07] transition border-b-2 border-blue-800 hover:border-[#9c0c07] cursor-pointer font-serif'>
                <ScrollLink
                  to='Home'
                  spy={true}
                  smooth={true}
                  offset={-70}
                  duration={500}>
                  Home
                </ScrollLink>
              </li>
              <li className='hover:text-[#9c0c07] transition border-b-2 border-blue-800 hover:border-[#9c0c07] cursor-pointer font-serif'>
                <ScrollLink
                  to='About'
                  spy={true}
                  smooth={true}
                  offset={-70}
                  duration={500}>
                  About
                </ScrollLink>
              </li>
              {isAuthenticated ? (
                <li
                  className='hover:text-[#9c0c07] transition border-b-2 border-blue-800 hover:border-[#9c0c07] cursor-pointer font-serif'
                  onClick={logout}>
                  Logout
                </li>
              ) : (
                <li
                  className='hover:text-[#9c0c07] transition border-b-2 border-blue-800 hover:border-[#9c0c07] cursor-pointer font-serif'
                  onClick={() => setOpen(true)}>
                  <h3>Login</h3>
                </li>
              )}
            </ul>
          </div>
        </div>
        <div>{click && content}</div>
        <button className='block sm:hidden transition' onClick={handleClick}>
          {click ? <FaTimes /> : <CiMenuFries />}
        </button>
        <LogModal open={open} onClose={() => setOpen(false)}>
          <div>
            <div
              id='header'
              className='flex w-full justify-between items-center border-b-2 border-black/60'>
              <p></p>
              <IoIosClose
                onClick={() => setOpen(false)}
                className='text-[38px] hover:bg-black/10 rounded-sm cursor-pointer m-1'
              />
            </div>
            <div className='mt-4'>
              <div className='relative flex items-center'>
                <FaRegUser className='absolute left-3 text-[22px] text-black-400' />
                <input
                  type='text'
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className='pl-10 pr-3 py-2 border border-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full'
                />
              </div>
              <div className='relative flex items-center mt-2'>
                <FaLock className='absolute left-3 text-[22px] text-black-400' />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className='pl-10 pr-3 py-2 border border-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full'
                />
                <div
                  onClick={togglePasswordVisibility}
                  className='absolute right-3 text-[22px] text-black-400 cursor-pointer'>
                  {showPassword ? <BiShow /> : <BiHide />}
                </div>
              </div>
              <div className='mt-3 w-full flex justify-center items-center '>
                <button
                  onClick={handleLogin}
                  className='bg-blue-700 text-white p-2 w-[7rem] rounded-md font-serif text-[14px]
                hover:bg-blue-600'>
                  Sign In
                </button>
              </div>
              <div className='font-serif w-full mt-4'>
                <p className='flex justify-between '>
                  Dont have a account?{" "}
                  <span className='text-blue-800 hover:text-blue-700'>
                    <button onClick={() => setOpenAccountRegister(true)}>
                      Register Now
                    </button>
                  </span>
                </p>
              </div>
            </div>
          </div>
        </LogModal>

        <Register
          open={openAccountRegister}
          onClose={() => setOpenAccountRegister(false)}>
          <Account onClose={() => setOpenAccountRegister(false)} />
        </Register>
      </div>
    </nav>
  );
};

export default Navbar2;
