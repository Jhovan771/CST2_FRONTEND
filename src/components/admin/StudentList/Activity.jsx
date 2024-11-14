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
import { submitScore } from "./functions/submitScore";
import { discardStudent } from "./functions/discardStudent";
import { GiArrowScope } from "react-icons/gi";
import { speakWord } from "./functions/speechSynthesis";
import DiscardConfirm from "../../modals/confirmModals/discardConfirm";
import ConfrimDiscard from "./studentListModals/ConfrimDiscard";

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
  const [pronunciationAccuracy, setPronunciationAccuracy] = useState(null);
  const [attempt, setAttempt] = useState(1);
  const [scores, setScores] = useState([null, null]);
  const [openConfrimDiscard, setOpenConfrimDiscard] = useState(false);
  const [studentToDiscard, setStudentToDiscard] = useState({
    student_id: null,
  });

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
    // console.log("handleRecognitionComplete called");
    // console.log(`Current attempt: ${attempt}`);

    if (selectedStudent) {
      const accuracyData = `activity id: ${act_id}, student id: ${selectedStudent.id}, score: ${overallAccuracy}%`;
      localStorage.setItem("activityAccuracy", accuracyData);

      setScores((prevScores) => {
        const newScores = [...prevScores];
        newScores[attempt - 1] = overallAccuracy;
        return newScores;
      });

      if (attempt < 2) {
        handleAttempt();
      }

      if (attempt === 2) {
        handleSubmitScore();
      }
    } else {
      console.log("No student selected");
    }
  };

  const startRecognition = () => {
    if (wordList.length > 0) {
      setResults(new Array(wordList.length).fill(null));
      handleRecognition(
        wordList,
        setCurrentWordIndex,
        updateResult,
        handleRecognitionComplete,
        setPronunciationAccuracy
      );
      setPronunciationAccuracy(null);
    } else {
      console.log("No Words available for recognition.");
    }
  };

  const handleAttempt = () => {
    setAttempt((prevAttempt) => {
      if (prevAttempt < 2) {
        const newAttempt = prevAttempt + 1;
        console.log(`Attempt updated to: ${newAttempt}`);
        return newAttempt;
      } else {
        console.log("Maximum attempts reached.");
        return prevAttempt;
      }
    });
  };

  const stopRecognitionHandler = () => {
    stopRecognition();
    setCurrentWordIndex(-1);
  };

  const handleSelectStudent = (student) => {
    setSelectedStudent(student);
  };

  const handleSubmitScore = () => {
    console.log("Submitting score...");
    submitScore(selectedStudent, act_id)
      .then(() => {
        console.log("Score submitted successfully");
      })
      .catch((error) => {
        console.error("Error submitting score:", error);
      });
  };

  const handleOpenDiscardModal = (student) => {
    setStudentToDiscard({ student_id: student.id });
    setOpenConfrimDiscard(true);
  };

  const handleConfirmDiscard = async () => {
    if (studentToDiscard && studentToDiscard.student_id !== null) {
      try {
        await discardStudent(studentToDiscard.student_id, act_id);
        setStudents(
          students.filter(
            (student) => student.id !== studentToDiscard.student_id
          )
        );
        setStudentToDiscard({ student_id: null });
        setOpenConfrimDiscard(false);
      } catch (error) {
        console.error("Error discarding student:", error);
      }
    } else {
      console.error("studentToDiscard does not have a valid student_id.");
    }
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
                    cursor-not-allowed shadow-sm hover:shadow-md flex flex-col justify-between items-center 
                    text-center lg:text-start
                    ${
                      index === currentWordIndex
                        ? "bg-green-400"
                        : "bg-gray-200"
                    }`}
                  style={{ wordWrap: "break-word" }}>
                  <div className='flex flex-col lg:flex-row items-center lg:justify-between w-full uppercase'>
                    {word}
                    <div className='flex lg:flex-row flex-col items-center mt-2 lg:mt-0'>
                      {results[index] === null && <BsThreeDots />}
                      {results[index] === true && (
                        <FaCheck className='text-green-900' />
                      )}
                      {results[index] === false && (
                        <IoMdClose className='text-red-900' />
                      )}
                    </div>
                  </div>
                  <div className='mt-2 bg-gray-400 w-full font-serif font-thin text-[14px]'>
                    <div className='border-2 border-black h-full p-1 mx-6 lg:m-0'>
                      <button
                        onClick={() => speakWord(word)}
                        className='w-full h-full bg-blue-900 rounded-sm p-1 text-white'
                        disabled={pronunciationAccuracy === null}>
                        Play
                      </button>
                    </div>
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
                Start
              </button>
              <button
                onClick={stopRecognitionHandler}
                className='bg-red-700 m-2 p-1 rounded-sm text-white font-serif font-medium 
                text-[18px] shadow-md hover:bg-red-600 duration-300'>
                Stop
              </button>
              <Link
                to='/profile'
                className='bg-blue-700 m-2 p-1 rounded-sm text-white font-serif font-medium 
                text-[18px] shadow-md hover:bg-blue-600 duration-300 text-center'>
                Back
              </Link>
            </div>
          </div>
        </div>
        <div className='grid grid-rows-[80%_10%]'>
          <div className='overflow-auto'>
            {loading ? (
              <p className='font-serif text-center'>Loading Students. . .</p>
            ) : (
              <ActivityTable
                students={students}
                onSelectedStudent={handleSelectStudent}
                onDiscardStudent={handleOpenDiscardModal}
              />
            )}
          </div>
          <div className='m-2'>
            <div className='bg-white'>
              {selectedStudent ? (
                <div className='grid grid-cols-5 items-center border border-gray-300 px-4 py-2'>
                  <div className='text-center border-r-2'>
                    <IoMicCircle className='text-[44px] text-center text-red-900 border-r-2' />
                  </div>
                  <div className='px-4 py-2 font-serif font-bold text-[18px] text-center'>
                    {selectedStudent.first_name} {selectedStudent.last_name}
                    <h3 className='text-[10px] text-red-900 text-center'>
                      {selectedStudent.gender}
                    </h3>
                  </div>
                  <div className='font-serif font-bold text-center p-2'>
                    <h2>First Attempt</h2>
                    <h2 className='text-red-900'>
                      {scores[0] !== null ? `${scores[0]}%` : "-"}
                    </h2>
                  </div>
                  <div className='font-serif font-bold text-center p-2'>
                    <h2>Second Attempt</h2>
                    <h2 className='text-red-900'>
                      {scores[1] !== null ? `${scores[1]}%` : "-"}
                    </h2>
                  </div>
                  <div className='w-auto h-auto flex justify-center items-center bg-green-800 hover:bg-green-700 cursor-pointer rounded-lg'>
                    <button
                      className='text-white hover:text-white/50 text-[18px] rounded-md p-1 w-full'
                      onClick={() => {
                        handleSubmitScore();
                      }}>
                      <GiArrowScope className='w-full' />
                      <h3 className='font-serif'>Record</h3>
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

      {openConfrimDiscard && (
        <DiscardConfirm
          open={openConfrimDiscard}
          onClose={() => setOpenConfrimDiscard(false)}>
          <ConfrimDiscard
            onClose={() => setOpenConfrimDiscard(false)}
            onConfirm={handleConfirmDiscard}
          />
        </DiscardConfirm>
      )}
    </div>
  );
};

export default Activity;
