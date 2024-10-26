export function speakWord(word) {
  if (!word) return;

  const synth = window.speechSynthesis;
  const utterance = new SpeechSynthesisUtterance(word);
  utterance.lang = "en-US"; // Set the language if necessary
  synth.speak(utterance);
}
