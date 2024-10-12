import React from "react";
import OverallChart from "./OverallChart";

const Dashboard = () => {
  return (
    <div className='mt-20 mx-6 bg-gray-100 overflow-hidden'>
      <div className='flex justify-center'>
        <div className='w-[60%] h-auto border-r-2 border-black p-2'>
          <OverallChart />
        </div>

        <div className='w-[40%] h-auto p-2'>
          <div className='h-[45%] overflow-auto'>
            <h2>Male Pronunciation Accuracy</h2>
            <OverallChart />
          </div>
          <div className='h-[45%] overflow-auto'>
            <h2>Female PRonunciation Accuracy</h2>
            <OverallChart />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
