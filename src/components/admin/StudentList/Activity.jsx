import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Norway from "../../../assets/Norway.jpg";
import { FaDiamond, FaCheck } from "react-icons/fa6";
import { BsThreeDots } from "react-icons/bs";
import { IoMdClose } from "react-icons/io";
import {
  handleRecognition,
  stopRecognition,
} from "./functions/speechRecognition";
import ActivityTable from "./ActivityTable";
import { fetchStudentsWithoutScore } from "./functions/studentService";
import { IoMicCircle } from "react-icons/io5";

const Activity = () => {
  const location = useLocation();
  const { label, words, act_id } = location.state || {
    label: "",
    words: "",
    act_id: null,
  };

  const wordList = words ? words.split(",").map((word) => word.trim()) : [];

  const [currentWordIndex, setCurrentWordIndex] = useState(-1);
  const [results, setResults] = useState([]);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedStudent, setSelectedStudent] = useState(null);

  // FETCH STUDENTS WITHOUT SCORES
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const fetchStudents = await fetchStudentsWithoutScore(act_id);
        setStudents(fetchStudents);
        if (fetchStudents.length > 0) {
          setSelectedStudent(fetchStudents[0]);
        }
      } catch (error) {
        console.error("Error fetching students:", error);
      } finally {
        setLoading(false);
      }
    };

    if (act_id) {
      fetchStudents();
    }
  }, [act_id]);

  const updateResult = (index, isCorrect) => {
    setResults((prevResults) => {
      const newResults = [...prevResults];
      newResults[index] = isCorrect;
      return newResults;
    });
  };

  const handleRecognitionComplete = (overallAccuracy) => {
    const accuracyData = `activity id: ${act_id}, overall accuracy: ${overallAccuracy}%`;
    // console.log(accuracyData);
    localStorage.setItem("activityAccuracy", accuracyData);
  };

  const startRecognition = () => {
    if (wordList.length > 0) {
      setResults(new Array(wordList.length).fill(null));
      handleRecognition(
        wordList,
        setCurrentWordIndex,
        updateResult,
        handleRecognitionComplete
      );
    } else {
      console.log("No Words available for recognition.");
    }
  };

  const stopRecognitionHandler = () => {
    stopRecognition();
    setCurrentWordIndex(-1);
  };

  const handleSelectStudent = (student) => {
    setSelectedStudent(student);
  };

  return (
    <div
      className='w-screen h-screen overflow-auto lg:overflow-hidden bg-cover bg-center'
      style={{
        backgroundImage: `url(${Norway})`,
        backgroundAttachment: "fixed",
      }}>
      <div className='grid grid-cols-1 md:grid-cols-[40%_60%] m-10 bg-white/30 backdrop-blur-md rounded-md'>
        <div className='min-h-[34rem] max-h-[34rem]'>
          <h3 className='flex justify-between items-center p-2 font-serif font-bold text-[14px] bg-white rounded-md'>
            <FaDiamond />
            {label}
          </h3>
          <div className='h-[70%] grid justify-center items-center bg-white/40 rounded-md overflow-y-auto overflow-x-hidden max-h-[29rem]'>
            {wordList.length > 0 ? (
              wordList.map((word, index) => (
                <div
                  key={index}
                  className={`m-2 p-2 font-serif font-bold w-[28rem] text-[30px] rounded-md 
        cursor-not-allowed shadow-sm hover:shadow-md flex flex-col lg:flex-row justify-between items-center 
        text-center lg:text-start
        ${index === currentWordIndex ? "bg-green-400" : "bg-gray-200"}`}
                  style={{ wordWrap: "break-word" }} // Ensures long words wrap
                >
                  {word}
                  <div className='flex lg:flex-row flex-col items-center mt-2 lg:mt-0'>
                    {results[index] === null && <BsThreeDots />}{" "}
                    {results[index] === true && (
                      <FaCheck className='text-green-900' />
                    )}
                    {results[index] === false && (
                      <IoMdClose className='text-red-900' />
                    )}
                  </div>
                </div>
              ))
            ) : (
              <p className='text-center'>No words available</p>
            )}
          </div>
          <div className='h-auto'>
            <div className='grid grid-cols-2'>
              <button
                onClick={startRecognition}
                className='bg-green-700 m-2 p-1 rounded-sm text-white font-serif font-medium 
                text-[18px] shadow-md hover:bg-green-600 duration-300'>
                Play
              </button>
              <button
                onClick={stopRecognitionHandler}
                className='bg-red-700 m-2 p-1 rounded-sm text-white font-serif font-medium 
                text-[18px] shadow-md hover:bg-red-600 duration-300'>
                Stop
              </button>
              <Link
                to='/dashboard'
                className='bg-blue-700 m-2 p-1 rounded-sm text-white font-serif font-medium 
                text-[18px] shadow-md hover:bg-blue-600 duration-300 text-center'>
                Home
              </Link>
            </div>
          </div>
        </div>
        <div className='grid grid-rows-[70%_30%]'>
          <div className='overflow-auto'>
            {loading ? (
              <p className='font-serif text-center'>Loading Students. . .</p>
            ) : (
              <ActivityTable
                students={students}
                onSelectedStudent={handleSelectStudent}
              />
            )}
          </div>
          <div className='m-2'>
            <div className='bg-white'>
              {selectedStudent ? (
                <div className='grid grid-cols-[5%_70%_25%] items-center border border-gray-300 px-4 py-2'>
                  <div className='text-center border-r-2'>
                    <IoMicCircle className='text-[44px] text-red-900 border-r-2' />
                  </div>
                  <div className='px-4 py-2 font-serif font-bold text-[18px] border-r-2 border-black text-center'>
                    {selectedStudent.first_name}{" "}
                    {selectedStudent.middle_initial} {selectedStudent.last_name}
                  </div>
                  <div className='px-4 py-2 font-serif'>
                    <button className='bg-green-700 text-white px-3 py-1 rounded w-full'>
                      Submit
                    </button>
                  </div>
                </div>
              ) : (
                <p className='text-center font-serif'>No student selected</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Activity;
