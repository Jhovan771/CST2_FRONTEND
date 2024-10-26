import React, { useEffect, useRef, useState } from "react";
import GIFBG from "../../assets/bg-simple.jpeg";
import {
  FaStop,
  FaPlay,
  FaPlus,
  FaTrash,
  FaSortDown,
  FaHome,
} from "react-icons/fa";
import { GrSelect } from "react-icons/gr";
import { IoIosAddCircle, IoIosClose } from "react-icons/io";
import { RxReset } from "react-icons/rx";
import AddWordMod from "../modals/AddWordMod";
import BoxII from "./BoxII";
import { computeOverAllRating } from "../../utils/ratingUtils";
import ResetGraph from "../modals/resetGraph";
import { Link } from "react-router-dom";

const Simple = () => {
  const [open, setOpen] = useState(false);
  const [word, setWord] = useState("");
  const [words, setWords] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [randomWord, setRandomWord] = useState("");
  const [chartUpdateFn, setChartUpdateFn] = useState(null);
  const [overallRating, setOverallRating] = useState();
  const [resetTrigger, setResetTrigger] = useState(false);
  const [openResetModal, setOpenResetModal] = useState(false);

  //Compute overall rating
  useEffect(() => {
    const result = computeOverAllRating();
    setOverallRating(result);
    console.log("Overall Rating Computed: ", result);
  }, []);

  // State Variables for Speech Recognition
  const [isRecognizing, setIsRecognizing] = useState(false);
  const [recognizedText, setRecognizedText] = useState("");
  const [isCorrect, setIsCorrect] = useState(null);
  const [accuracy, setAccuracy] = useState(null);
  const recognitionRef = useRef(null);

  // Function For Speech Utterance
  const [speechRate, setSpeechRate] = useState(1);

  //Select Word insted of random word
  const selectWord = (index) => {
    const wordToSelect = words[index];
    if (wordToSelect) {
      setRandomWord(wordToSelect);
    }
  };

  //Pronounce the word when play button is clicked
  const playWord = (index) => {
    const wordToPlay = words[index];
    if (wordToPlay) {
      setRandomWord(wordToPlay);

      const utterance = new SpeechSynthesisUtterance(wordToPlay);
      utterance.rate = speechRate;
      window.speechSynthesis.speak(utterance);
    }
  };

  //Function to reset the chart data
  const resetGraph = () => {
    localStorage.removeItem("pronunciationData");

    setResetTrigger((prev) => !prev);
    console.log("Graph data has been reset.");
  };

  // Levenshtein Distance Algorithm
  const levenshteinDistance = (a, b) => {
    const matrix = [];

    for (let i = 0; i <= b.length; i++) {
      matrix[i] = [i];
    }

    for (let j = 0; j <= a.length; j++) {
      matrix[0][j] = j;
    }

    for (let i = 1; i <= b.length; i++) {
      for (let j = 1; j <= a.length; j++) {
        if (b.charAt(i - 1) === a.charAt(j - 1)) {
          matrix[i][j] = matrix[i - 1][j - 1];
        } else {
          matrix[i][j] = Math.min(
            matrix[i - 1][j - 1] + 1, // substitution
            matrix[i][j - 1] + 1, // insertion
            matrix[i - 1][j] + 1 // deletion
          );
        }
      }
    }
    return matrix[b.length][a.length];
  };

  // Function to calculate similarity percentage with confidence score
  const calculateAccuracyWithConfidence = (
    recognizedWord,
    targetWord,
    confidence
  ) => {
    const distance = levenshteinDistance(recognizedWord, targetWord);
    const maxLength = Math.max(recognizedWord.length, targetWord.length);
    const accuracy = ((maxLength - distance) / maxLength) * 100;

    // Incorporate the confidence score into the final accuracy
    const weightedAccuracy = accuracy * confidence;
    return weightedAccuracy;
  };

  // Handle Recognition Function
  const handleRecognition = (chartUpdateFn) => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      console.error("SpeechRecognition not supported");
      return;
    }

    const recognition = new SpeechRecognition();
    recognitionRef.current = recognition;
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      setIsRecognizing(true);
      console.log("Recognition Started");
    };

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript.toLowerCase();
      const currentWord = randomWord.toLowerCase();
      // Get confidence score (between 0 and 1)
      const confidence = event.results[0][0].confidence;

      const accuracy = calculateAccuracyWithConfidence(
        transcript,
        currentWord,
        confidence
      );
      const isPronunciationCorrect = accuracy >= 70;

      setRecognizedText(transcript);
      setIsCorrect(isPronunciationCorrect);
      setAccuracy(accuracy);

      //Store recognized text and accuracy in localStorage
      localStorage.setItem("recognizedText", transcript);
      localStorage.setItem("accuracy", accuracy);
      localStorage.setItem("isCorrect", isPronunciationCorrect);

      //Store pronunciation data for chart update
      const storedData =
        JSON.parse(localStorage.getItem("pronunciationData")) || [];
      const newEntry = {
        word: currentWord,
        accuracy,
        status: isPronunciationCorrect ? "Correct" : "Incorrect",
      };
      storedData.push(newEntry);
      localStorage.setItem("pronunciationData", JSON.stringify(storedData));

      console.log(`Recognized Text: ${transcript}`);
      console.log(`Accuracy: ${accuracy}%`);
      console.log(`Confidence: ${confidence}`);

      setIsRecognizing(false);

      if (chartUpdateFn) {
        chartUpdateFn();
      }
    };

    recognition.onend = () => {
      setIsRecognizing(false);
      console.log("Recognition Ended");
      displayRandomWord();
      window.location.reload();
    };

    recognition.start();
  };

  //Stop Recognition
  const stopRecognition = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      console.log("Recogntion Forcefully Stopped");
      setIsRecognizing(false);
    }
  };

  //Retrieve and Display data from localStorage on page load
  useEffect(() => {
    const storedRecognizedText = localStorage.getItem("recognizedText");
    const storedAccuracy = localStorage.getItem("accuracy");
    const storedIsCorrect = localStorage.getItem("isCorrect");

    if (storedRecognizedText) setRecognizedText(storedRecognizedText);
    if (storedAccuracy) setAccuracy(parseFloat(storedAccuracy));
    if (storedIsCorrect) setIsCorrect(storedIsCorrect === "true");

    const storedWords = JSON.parse(localStorage.getItem("words")) || [];
    setWords(storedWords);
    displayRandomWord();
  }, []);

  // Randomized Words Display
  const displayRandomWord = () => {
    if (words.length > 0) {
      const randomIndex = Math.floor(Math.random() * words.length);
      setRandomWord(words[randomIndex]);
    } else {
      setRandomWord(""); // Handle empty words array
    }
  };

  useEffect(() => {
    const storedWords = JSON.parse(localStorage.getItem("words")) || [];
    setWords(storedWords);
    if (storedWords.length > 0) {
      const randomIndex = Math.floor(Math.random() * storedWords.length);
      setRandomWord(storedWords[randomIndex]);
    } else {
      setRandomWord(""); // Handle empty words array
    }
  }, []);

  // Sorter
  const sortAlphabetically = () => {
    const sortedWords = [...words].sort((a, b) => a.localeCompare(b));
    setWords(sortedWords);
  };

  // Dropdown
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      id='simple_main'
      className='w-screen h-screen overflow-auto bg-cover bg-center'
      style={{
        backgroundImage: `url(${GIFBG})`,
        backgroundAttachment: "fixed",
      }}>
      <div
        id='main_box'
        className='flex flex-col lg:flex-row w-auto h-auto m-4 lg:m-7 rounded-lg bg-white/30 backdrop-blur-md'>
        {/* BOX 1 */}
        <div className='flex-1 border-2 border-black rounded-md p-2 m-2'>
          <div className='flex flex-col items-center justify-center'>
            <input
              type='text'
              className='bg-white w-full h-auto text-4xl text-center font-mono p-2 rounded-md text-black uppercase'
              value={randomWord}
              disabled
            />
            {/* BUTTONS */}
            <div className='flex lg:flex-row flex-col justify-evenly items-center w-full mt-3'>
              <div className='flex items-center justify-center lg:w-1/3 w-full h-auto font-mono text-xl bg-red-600 text-white rounded-md drop-shadow-lg hover:bg-red-500 cursor-pointer mb-2 lg:mb-0'>
                <FaStop className='mr-2' />
                <button onClick={stopRecognition}>Stop</button>
              </div>
              <div className='flex items-center justify-center lg:w-1/3 w-full h-auto font-mono text-xl bg-green-600 text-white rounded-md drop-shadow-lg hover:bg-green-500 cursor-pointer mb-2 lg:mb-0'>
                <FaPlay className='mr-2' />
                <button
                  onClick={() => handleRecognition(chartUpdateFn)}
                  disabled={isRecognizing}>
                  {isRecognizing ? "Listening..." : "Start"}
                </button>
              </div>
              <div className='flex items-center justify-center lg:w-1/3 w-full h-auto font-mono text-xl bg-blue-600 text-white rounded-md drop-shadow-lg hover:bg-blue-500 cursor-pointer'>
                <IoIosAddCircle className='mr-2' />
                <button onClick={() => setOpen(true)}>Add Words</button>
              </div>
            </div>
            {/* BUTTONS ENDS */}
          </div>
          <div className='min-h-[10rem] max-h-[38rem] overflow-y-auto m-2'>
            <table className='table-fixed w-full bg-black/60 text-white rounded-md'>
              <thead className='sticky top-0 bg-red-900 font-serif'>
                <tr>
                  <th>#</th>
                  <th>Word</th>
                  <th className='flex justify-center items-center'>
                    <div className='relative'>
                      <button
                        onClick={toggleDropdown}
                        className='flex justify-center items-center gap-2 hover:bg-black/20 rounded-md'>
                        Sort By <FaSortDown />
                      </button>
                      {isOpen && (
                        <div className='absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded shadow-lg'>
                          <a
                            onClick={sortAlphabetically}
                            className='block px-4 py-2 text-gray-800 hover:bg-gray-100 cursor-pointer'>
                            Alphabetically
                          </a>
                        </div>
                      )}
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody className='font-serif'>
                {words.map((w, index) => (
                  <tr key={index} className='text-center'>
                    <td>{index + 1}</td>
                    <td
                      className='uppercase'
                      style={{ wordWrap: "break-word", maxWidth: "150px" }}>
                      {w}
                    </td>
                    <td>
                      <button onClick={() => playWord(index)}>
                        <FaPlay className='text-white/80 hover:text-white mr-2' />
                      </button>
                      <button onClick={() => selectWord(index)}>
                        <GrSelect className='text-white/80 hover:text-white mr-2' />
                      </button>
                      <button>
                        <FaTrash
                          className='hover:text-red-700 cursor-pointer'
                          onClick={() => {
                            const updatedWords = words.filter(
                              (_, i) => i !== index
                            );
                            setWords(updatedWords);
                            localStorage.setItem(
                              "words",
                              JSON.stringify(updatedWords)
                            );
                            displayRandomWord(); // Ensure random word is updated
                          }}
                        />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className='p-4'>
              <label className='mr-2 font-serif'>Speech Speed:</label>
              <input
                type='range'
                min='0.5'
                max='2'
                step='0.1'
                value={speechRate}
                onChange={(e) => setSpeechRate(e.target.value)}
                className='w-full'
              />
              <span className='ml-2 font-serif'>{speechRate}x</span>
            </div>
          </div>
        </div>
        {/* BOX 2 */}
        <div className='flex-1 flex-col border-2 border-black rounded-md p-2 m-2'>
          <div className='flex flex-col items-start mt-2 m-2 bg-white p-2 rounded'>
            <p className='font-bold font-serif'>
              Recognized Text:{" "}
              <span className='font-normal font-serif uppercase pl-2'>
                {recognizedText}
              </span>
            </p>

            <p className='font-bold font-serif'>
              Pronunciation Accuracy:{" "}
              <span className='font-normal font-serif uppercase pl-2'>
                {accuracy !== null ? accuracy.toFixed(2) : "N/A"}%
              </span>
            </p>
            <p className='font-bold font-serif'>
              Status:{""}
              <span className='font-normal font-serif uppercase pl-2'>
                {isCorrect ? "Correct Pronunciation!" : "Try Again!"}
              </span>
            </p>
            <div className='font-serif'>
              <p className='font-bold font-serif'>
                Overall Accuracy:{" "}
                <span className='font-normal font-serif uppercase pl-2'>
                  {overallRating?.averageAccuracy || 0}%
                </span>
              </p>
              <p className='font-bold font-serif'>
                {" "}
                Overall Rating:{" "}
                <span className='font-normal font-serif uppercase pl-2'>
                  {overallRating?.rating || "No Data"}
                </span>
              </p>
            </div>
            <div className='flex justify-end w-full'>
              <button
                onClick={() => setOpenResetModal(true)}
                className='flex items-center rounded-md p-2 m-1 bg-red-700 text-white hover:bg-red-600 font-serif'>
                Reset
                <RxReset className='ml-2' />
              </button>
              <Link
                to='/'
                className='flex items-center rounded-md p-2 m-1 bg-blue-700 text-white hover:bg-blue-600 font-serif'>
                Home
                <FaHome className='ml-2' />
              </Link>
            </div>
          </div>
          <BoxII triggerUpdate={(fn) => setChartUpdateFn(() => fn)} />
        </div>
      </div>

      <ResetGraph
        open={openResetModal}
        onClose={() => setOpenResetModal(false)}
        onConfirm={() => {
          resetGraph();
          setOpenResetModal(false);
          window.location.reload();
        }}
      />

      <AddWordMod open={open} onClose={() => setOpen(false)}>
        <div id='addWordMainContainer'>
          <div className='flex justify-end items-center w-full border-b-2 border-black/40'>
            <button onClick={() => setOpen(false)}>
              <IoIosClose
                size={34}
                className='cursor-pointer hover:bg-black/20 rounded-lg'
              />
            </button>
          </div>
          <div className='flex flex-col justify-center items-center mt-2'>
            <div className='relative w-full'>
              <input
                type='text'
                placeholder='Enter Word...'
                className='border-2 border-blue-900 rounded-lg p-2 font-serif w-full'
                value={word}
                onChange={(e) => setWord(e.target.value)}
              />
              <button
                className='absolute inset-y-0 right-0 flex items-center px-4 bg-blue-900 text-white rounded-r-lg hover:bg-blue-950'
                onClick={() => {
                  if (word.trim()) {
                    const updatedWords = [...words, word];
                    setWords(updatedWords);
                    localStorage.setItem("words", JSON.stringify(updatedWords));
                    setWord("");
                    displayRandomWord();
                  }
                }}>
                <FaPlus />
              </button>
            </div>
          </div>
        </div>
      </AddWordMod>
    </div>
  );
};

export default Simple;
