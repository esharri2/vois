export const speak = (text, settings) => {
  if (!text) return;
  if (!speechSynthesis) {
    alert(
      "Sorry! Your device or browser doesn't allow me to make sound. Vois won't work for you on this device."
    );
  } else {
    const instance = new SpeechSynthesisUtterance(text);
    if (settings) {
      const { pitch, volume } = settings;
      if (pitch && instance.pitch) {
        if (pitch === "low") {
          instance.pitch = 0.6;
        }
        if (pitch === "medium") {
          instance.pitch = 1;
        }
        if (pitch === "high") {
          instance.pitch = 1.5;
        }
      }
      if (volume && instance.volume) {
        instance.volume = Number(volume);
      }
    }
    speechSynthesis.speak(instance);
  }
};
