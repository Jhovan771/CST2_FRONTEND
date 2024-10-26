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

// Function to calculate similarity percentage with confidence
const calculateAccuracyWithConfidence = (
  recognizedWord,
  targetWord,
  confidence
) => {
  const distance = levenshteinDistance(recognizedWord, targetWord);
  const maxLength = Math.max(recognizedWord.length, targetWord.length);
  const accuracy = ((maxLength - distance) / maxLength) * 100;

  // Adjust the accuracy based on the confidence score
  return accuracy * confidence;
};

let recognitionInstance = null;
let isRecognitionActive = true;
let recognitionTimeout = null;

// Speech recognition handler
export const handleRecognition = (
  wordList,
  setCurrentWordIndex,
  updateResult,
  handleRecognitionComplete,
  setPronunciationAccuracy
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

  recognitionInstance = recognition;
  let currentWordIndex = 0;
  let hasResult = false;
  const results = [];

  const handleResult = (event) => {
    hasResult = true;
    const transcript = event.results[0][0].transcript.toLowerCase();
    const targetWord = wordList[currentWordIndex].toLowerCase();
    const confidence = event.results[0][0].confidence;

    const accuracy = calculateAccuracyWithConfidence(
      transcript,
      targetWord,
      confidence
    );
    const isPronunciationCorrect = accuracy >= 80;

    results[currentWordIndex] = isPronunciationCorrect;
    updateResult(currentWordIndex, isPronunciationCorrect);

    setPronunciationAccuracy(accuracy);

    console.log(`Recognized Text: ${transcript}`);
    console.log(`Target Word: ${targetWord}`);
    console.log(`Accuracy: ${accuracy}%`);
    console.log(`Confidence: ${confidence}`);
    console.log(`Pronunciation Correct: ${isPronunciationCorrect}`);
  };

  const startRecognitionForCurrentWord = () => {
    if (!isRecognitionActive) {
      console.log("Recognition has been stopped.");
      return;
    }

    if (currentWordIndex >= wordList.length) {
      const correctCount = results.filter(Boolean).length;
      const overallAccuracy = (correctCount / wordList.length) * 99;
      handleRecognitionComplete(overallAccuracy);
      setCurrentWordIndex(-1);
      return;
    }

    const targetWord = wordList[currentWordIndex];
    hasResult = false;
    setCurrentWordIndex(currentWordIndex);

    recognition.onstart = () => {
      console.log(`Recognition started for word: ${targetWord}`);
    };

    recognition.onresult = (event) => {
      handleResult(event);
    };

    recognition.onend = () => {
      if (!isRecognitionActive) {
        console.log("Recognition stopped, exiting onend loop.");
        return;
      }
      if (hasResult) {
        currentWordIndex++;
      } else {
        console.warn(`No result received for word: ${targetWord}. Retrying...`);
      }
      recognitionTimeout = setTimeout(startRecognitionForCurrentWord, 1000);
    };

    recognition.onerror = (event) => {
      console.error(`Error occurred during recognition: ${event.error}`);
      currentWordIndex++;
      recognitionTimeout = setTimeout(startRecognitionForCurrentWord, 1000);
    };

    recognition.start();
  };

  isRecognitionActive = true;
  startRecognitionForCurrentWord();
};

// Function to stop the recognition
export const stopRecognition = () => {
  if (recognitionInstance) {
    isRecognitionActive = false;
    clearTimeout(recognitionTimeout);
    recognitionInstance.stop();
    console.log("Recognition forcefully stopped.");
  }
};
