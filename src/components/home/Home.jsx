import React from "react";
import horizon from "../../assets/horizon.jpeg";
import potential from "../../assets/potential.jpeg";
import enjoy from "../../assets/enjoy.jpeg";
import { MdStarBorderPurple500 } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const goto_simple = () => {
    navigate("/simple");
  };

  return (
    <div id='Home' className='pt-16 m-10'>
      <div
        id='home_main_container'
        className='lg:flex justify-center items-center border-double border-4
       border-black w-full lg:h-[30rem] h-auto bg-gray-100'>
        {/* Three Boxes Starts Here */}
        {/* BOX ONE */}
        <div
          id='box_1'
          className='m-2 lg:h-[28rem] h-[12rem] w-[97%] rounded-sm drop-shadow-md shadow-md 
        bg-white flex justify-center bg-cover bg-center'
          style={{ backgroundImage: `url(${horizon})` }}>
          <div className='w-full backdrop-blur-sm bg-white/30 flex justify-center items-center'>
            <div className='w-full m-3 h-full flex items-center flex-col justify-center'>
              <h2 className='font-mono lg:text-[36px] text-[26px] text-center'>
                <span className='font-serif font-bold text-[46px]'>D</span>
                iscover new horizons
              </h2>
            </div>
          </div>
        </div>
        {/* BOX TWO */}
        <div
          id='box_2'
          className='m-2 lg:h-[28rem] h-[12rem] w-[97%] rounded-sm drop-shadow-md shadow-md 
        bg-white flex justify-center bg-cover bg-center'
          style={{ backgroundImage: `url(${potential})` }}>
          <div className='w-full backdrop-blur-sm bg-white/30 flex justify-center items-center'>
            <div className='w-full m-3 h-full flex items-center flex-col justify-center'>
              <h2 className='font-mono lg:text-[36px] text-[26px] text-center'>
                <span className='font-serif font-bold text-[46px]'>U</span>
                nlock your potential
              </h2>
              <button
                onClick={goto_simple}
                className='font-mono w-auto m-2 p-2 rounded-md lg:text-[16px] text-[12px] bg-white/40
              border-2 border-black hover:bg-white/20'>
                Practice Pronunciation
              </button>
            </div>
          </div>
        </div>
        {/* BOX THREE */}
        <div
          id='box_3'
          className='m-2 lg:h-[28rem] h-[12rem] w-[97%] rounded-sm drop-shadow-md shadow-md 
        bg-white flex justify-center bg-cover bg-center'
          style={{ backgroundImage: `url(${enjoy})` }}>
          <div className='w-full backdrop-blur-sm bg-white/30 flex justify-center items-center'>
            <div className='w-full m-3 h-full flex items-center flex-col justify-center'>
              <h2 className='font-mono lg:text-[36px] text-[26px] text-center'>
                <span className='font-serif font-bold text-[46px]'>E</span>
                njoy every step of the way
              </h2>
            </div>
          </div>
        </div>
        {/* Boxes Ends Here */}
      </div>
      {/* Discover new horizons, unlock your potential, and enjoy every step of
      the way! */}
    </div>
  );
};

export default Home;
