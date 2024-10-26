import React, { useEffect, useState } from "react";
import OverallChart from "./OverallChart";
import OverallMale from "./OverallMale";
import OverallFemale from "./OverallFemale";
import { computeOverallRating } from "./functions/computeOverallRating";
import fetchOverallScore from "./services/fetchOverallScore";
import fetchMaleScore from "./services/fetchMaleScore";
import FetchFemaleScore from "./services/fetchFemaleScore";
import { FaUsers, FaMale, FaFemale } from "react-icons/fa";
import { GrScorecard } from "react-icons/gr";
import useFetchNumberOfStudent from "./services/fetchNumberOfStudent";
import fetchOverall from "./services/fetchOverall";
import getMaleScores from "./services/getMaleScore";
import getFemaleScores from "./services/getFemaleScore";

const Dashboard = () => {
  const { studentCount, error: studentCountError } = useFetchNumberOfStudent();
  const { chartData, error: overallError } = fetchOverallScore();
  const { rating: maleRating, error: maleError } = fetchMaleScore();
  const { rating: femaleRating, error: femaleError } = FetchFemaleScore();
  const { overallScore, error: Error } = fetchOverall();
  const { maleScore, error: maleTwoError } = getMaleScores();
  const { femaleScore, error: femaleTwoError } = getFemaleScores();
  const [rating, setRating] = useState("Loading...");

  // Overall Chart Rating
  useEffect(() => {
    if (chartData.scores && chartData.scores.length > 0) {
      const { rating } = computeOverallRating(chartData.scores);
      setRating(rating);
    } else {
      setRating("No Data");
    }
  }, [chartData]);

  if (overallError || maleError || femaleError) {
    return <div>Error loading dashboard data</div>;
  }

  return (
    <div className='mt-20 mx-6 bg-gray-100 overflow-hidden'>
      <div className='flex flex-col lg:flex-row justify-center h-auto lg:h-[calc(100vh-80px)]'>
        {" "}
        <div className='w-full lg:w-[70%] h-full overflow-y-auto lg:border-r-2 border-black p-2'>
          <div
            id='overall_chart_container'
            className='mt-6 bg-white/80 rounded-md drop-shadow-lg'>
            <div
              id='overall_chart_header'
              className='flex justify-between font-serif text-[24px] mb-4 p-3 font-bold'>
              <h2>Overall Pronunciation Accuracy</h2>
              <h2 className='font-serif'>
                Rating: <span>{rating}</span>
              </h2>
            </div>
            <div className='mb-8'>
              <OverallChart />
            </div>
          </div>

          <div>
            <div
              id='overall_male_chart_container'
              className='mt-6 bg-white/80 rounded-md drop-shadow-lg'>
              <div
                id='overall_chart_header'
                className='flex justify-between font-serif text-[24px] mb-4 p-3 font-bold'>
                <h2>Male Pronunciation Accuracy</h2>
                <h2 className='font-serif'>
                  Rating: <span>{maleRating}</span>
                </h2>
              </div>
              <div className='mb-8'>
                <OverallMale />
              </div>
            </div>
          </div>

          <div>
            <div
              id='overall_female_chart_container'
              className='mt-6 bg-white/80 rounded-md drop-shadow-lg'>
              <div
                id='overall_chart_header'
                className='flex justify-between font-serif text-[24px] mb-4 p-3 font-bold'>
                <h2>Female Pronunciation Accuracy</h2>
                <h2 className='font-serif'>
                  Rating: <span>{femaleRating}</span>{" "}
                </h2>
              </div>
              <div className='mb-8'>
                <OverallFemale />
              </div>
            </div>
          </div>
        </div>
        <div className='w-full lg:w-[30%] h-auto p-2 sticky top-0 bg-white overflow-auto'>
          <div className='grid grid-rows-4 lg:grid-rows-[25%_25%_25%_25%] gap-8 h-full'>
            <div className='h-auto cursor-pointer'>
              <div className='flex flex-col bg-[#edeae5] rounded-md justify-center items-center h-full drop-shadow-lg'>
                <div className='flex justify-center items-center w-full h-[50%] font-serif font-bold text-[26px] p-1 text-wrap text-center'>
                  NUMBER OF STUDENTS
                </div>{" "}
                <div className='flex justify-center items-center w-full h-[50%] font-serif font-bold text-[38px] p-1'>
                  <span className='flex items-center'>
                    <FaUsers className='m-2 text-[46px] mr-4' />
                    <span className='text-[maroon]'>
                      {studentCount !== null ? studentCount : "Loading..."}
                    </span>
                  </span>
                </div>
              </div>
            </div>

            <div className='h-auto cursor-pointer'>
              <div className='flex flex-col bg-[#edeae5] rounded-md justify-center items-center h-full drop-shadow-lg'>
                <div className='flex justify-center items-center w-full h-[50%] font-serif font-bold text-center text-[26px] p-1 text-wrap'>
                  OVERALL PRONUNCIATION ACCURACY
                </div>{" "}
                <div className='flex justify-center items-center w-full h-[50%] font-serif font-bold text-[38px] p-1'>
                  <span className='flex items-center'>
                    <GrScorecard className='m-2 text-[46px] mr-4' />
                    <span className='text-[maroon]'>
                      {overallScore !== null
                        ? `${Math.round(overallScore)}%`
                        : "0%"}
                    </span>
                  </span>
                </div>
              </div>
            </div>

            <div className='h-auto cursor-pointer'>
              <div className='flex flex-col bg-[#edeae5] rounded-md justify-center items-center h-full drop-shadow-lg'>
                <div className='flex justify-center items-center w-full h-[50%] font-serif font-bold text-[26px] p-1 text-wrap text-center'>
                  Male Pronunciation Accuracy
                </div>{" "}
                <div className='flex justify-center items-center w-full h-[50%] font-serif font-bold text-[38px] p-1'>
                  <span className='flex items-center'>
                    <FaMale className='m-2 text-[46px] mr-4' />
                    <span className='text-[maroon]'>
                      {maleScore !== null ? `${maleScore}%` : "Loading..."}
                    </span>
                  </span>
                </div>
              </div>
            </div>

            <div className='h-auto cursor-pointer'>
              <div className='flex flex-col bg-[#edeae5] rounded-md justify-center items-center h-full drop-shadow-lg'>
                <div className='flex justify-center items-center w-full h-[50%] font-serif font-bold text-[26px] p-1  text-wrap text-center'>
                  Female Pronunciation Accuracy
                </div>{" "}
                <div className='flex justify-center items-center w-full h-[50%] font-serif font-bold text-[38px] p-1'>
                  <span className='flex items-center'>
                    <FaFemale className='m-2 text-[46px] mr-4' />
                    <span className='text-[maroon]'>
                      {femaleScore !== null ? `${femaleScore}%` : "Loading..."}
                    </span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
