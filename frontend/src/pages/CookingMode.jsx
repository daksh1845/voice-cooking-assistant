// frontend/src/pages/CookingMode.jsx
import { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

function CookingMode() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const recipe = state.recipe;
  const steps = recipe.steps.split(',').map(s => s.trim());

  const [step, setStep] = useState(0);
  const [listening, setListening] = useState(false);

  const recognitionRef = useRef(null);
  const isRecognizingRef = useRef(false);
  const isSpeakingRef = useRef(false);

  const stepRef = useRef(step);
  const stepsLengthRef = useRef(steps.length);

  useEffect(() => {
    stepsLengthRef.current = steps.length;
  }, [steps.length]);

  useEffect(() => {
    stepRef.current = step;
  }, [step]);

  const stopRecognition = () => {
    if (recognitionRef.current && isRecognizingRef.current) {
      recognitionRef.current.stop();
      isRecognizingRef.current = false;
    }
  };

  const startRecognition = () => {
    if (
      recognitionRef.current &&
      !isRecognizingRef.current &&
      !isSpeakingRef.current
    ) {
      try {
        recognitionRef.current.start();
        isRecognizingRef.current = true;
      } catch (e) {}
    }
  };

  const speakCurrentStep = () => {
    speakText(`Step ${stepRef.current + 1}. ${steps[stepRef.current]}`);
  };

  const speakText = (text) => {
    if (!window.speechSynthesis) return;

    window.speechSynthesis.cancel();
    stopRecognition();

    const utterance = new SpeechSynthesisUtterance(text);
    isSpeakingRef.current = true;

    utterance.onend = () => {
      isSpeakingRef.current = false;
      setTimeout(() => startRecognition(), 300);
    };

    window.speechSynthesis.speak(utterance);
  };

  useEffect(() => {
    speakCurrentStep();
  }, [step]);

  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) return;

    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => {
      isRecognizingRef.current = true;
      setListening(true);
    };

    recognition.onend = () => {
      isRecognizingRef.current = false;
      setListening(false);

      if (!isSpeakingRef.current) {
        setTimeout(() => startRecognition(), 300);
      }
    };

    recognition.onerror = () => {
      isRecognizingRef.current = false;
      setListening(false);
    };

    recognition.onresult = (event) => {
      if (isSpeakingRef.current) return;

      const command = event.results[0][0].transcript.toLowerCase();

      if (command.includes("repeat")) {
        speakCurrentStep();
      } else if (command.includes("go back") || command.includes("previous")) {
        if (stepRef.current > 0) {
          setStep(stepRef.current - 1);
        }
      } else if (command.includes("next") || command.includes("finish")) {
        if (stepRef.current + 1 < stepsLengthRef.current) {
          setStep(stepRef.current + 1);
        } else {
          stopRecognition();
          navigate('/complete', { state: { recipe } });
        }
      }
    };

    recognitionRef.current = recognition;
    startRecognition();

    return () => {
      stopRecognition();
      recognitionRef.current = null;
      window.speechSynthesis.cancel();
    };
  }, [navigate, recipe]);

  const goBack = () => {
    if (step > 0) setStep(step - 1);
  };

  const repeatStep = () => {
    speakCurrentStep();
  };

  const nextOrFinish = () => {
    if (step + 1 < steps.length) {
      setStep(step + 1);
    } else {
      stopRecognition();
      navigate('/complete', { state: { recipe } });
    }
  };

  const isLastStep = step + 1 === steps.length;

  return (
    <>
      <Navbar />
      <div className="cooking-mode-container">
        <div className="cooking-mode-left">
          <img
            src={recipe.image}
            alt={recipe.title}
            className="cooking-mode-image"
          />
        </div>

        <div className="cooking-mode-right">
          <h2>{recipe.title}</h2>
          <p>Step {step + 1}/{steps.length}</p>
          <p>{steps[step]}</p>

          <div className="button-group">
            <button onClick={goBack}>Go Back</button>
            <button onClick={repeatStep}>Repeat</button>
            <button onClick={nextOrFinish}>
              {isLastStep ? "Finish" : "Next Step"}
            </button>
          </div>

          <p className="voice-hint">
            🎤 Say "Go Back", "Repeat" or {isLastStep ? '"Finish"' : '"Next Step"'}
          </p>

          {listening && (
            <p className="listening-indicator">🔴 Listening...</p>
          )}
        </div>
      </div>
    </>
  );
}

export default CookingMode;