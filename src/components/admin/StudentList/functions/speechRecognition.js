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

// Function to calculate similarity percentage
const calculateAccuracy = (recognizedWord, targetWord) => {
  const distance = levenshteinDistance(recognizedWord, targetWord);
  const maxLength = Math.max(recognizedWord.length, targetWord.length);
  return ((maxLength - distance) / maxLength) * 100;
};

let recognitionInstance = null;

let isRecognitionActive = true; // Global flag to track if recognition is active

// Function to handle speech recognition
export const handleRecognition = (
  wordList,
  setCurrentWordIndex,
  updateResult,
  handleRecognitionComplete
) => {
  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) {
    console.error("SpeechRecognition not supported");
    return;
  }

  const recognition = new SpeechRecognition();
  recognition.continuous = false;
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;

  recognitionInstance = recognition; // Store recognition instance for global access
  let currentWordIndex = 0;
  let hasResult = false;
  const results = []; // Store results for overall accuracy

  const handleResult = (event) => {
    hasResult = true;
    const transcript = event.results[0][0].transcript.toLowerCase();
    const targetWord = wordList[currentWordIndex].toLowerCase();

    const accuracy = calculateAccuracy(transcript, targetWord);
    const isPronunciationCorrect = accuracy >= 80;

    // Store result for overall accuracy
    results[currentWordIndex] = isPronunciationCorrect;

    // Update the result in the frontend
    updateResult(currentWordIndex, isPronunciationCorrect);

    console.log(`Recognized Text: ${transcript}`);
    console.log(`Target Word: ${targetWord}`);
    console.log(`Accuracy: ${accuracy}%`);
    console.log(`Pronunciation Correct: ${isPronunciationCorrect}`);
  };

  const startRecognitionForCurrentWord = () => {
    if (currentWordIndex >= wordList.length) {
      console.log("All words have been processed.");
      const correctCount = results.filter(Boolean).length;
      const overallAccuracy = (correctCount / wordList.length) * 100;

      console.log(`Overall Pronunciation Accuracy: ${overallAccuracy}%`);
      handleRecognitionComplete(overallAccuracy);
      setCurrentWordIndex(-1); // Reset index when done
      return;
    }

    const targetWord = wordList[currentWordIndex];
    hasResult = false;

    // Update the current word index in the frontend
    setCurrentWordIndex(currentWordIndex);

    recognition.onstart = () => {
      console.log(`Recognition started for word: ${targetWord}`);
    };

    recognition.onresult = (event) => {
      handleResult(event);
    };

    recognition.onend = () => {
      if (hasResult) {
        console.log(`Pronunciation for ${targetWord} ended.`);
        currentWordIndex++; // Only increment here if a result was received
      } else {
        console.warn(`No result received for word: ${targetWord}. Retrying...`);
        // No increment; retry the same word
      }
      // Start recognition for the next word or retry
      setTimeout(startRecognitionForCurrentWord, 1000);
    };

    recognition.onerror = (event) => {
      console.error(`Error occurred during recognition: ${event.error}`);
      currentWordIndex++; // Move to the next word on error
      // Start recognition for the next word
      setTimeout(startRecognitionForCurrentWord, 1000);
    };

    recognition.start();
  };

  isRecognitionActive = true; // Set recognition as active
  startRecognitionForCurrentWord(); // Start recognition for the first word
};

// Function to stop the recognition
export const stopRecognition = () => {
  if (recognitionInstance) {
    recognitionInstance.stop(); // Stop the recognition instance
    console.log("Recognition forcefully stopped.");
    isRecognitionActive = false; // Set recognition flag to false
  }
};
