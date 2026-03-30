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
  const stepRef = useRef(step);
  const stepsLengthRef = useRef(steps.length);

  useEffect(() => {
    stepsLengthRef.current = steps.length;
  }, [steps.length]);

  useEffect(() => {
    const isBrave = navigator.brave?.isBrave?.();
    if (isBrave) alert("Brave blocks voice. Use Chrome.");
  }, []);

  useEffect(() => {
    stepRef.current = step;
  }, [step]);

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) return;

    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.continuous = false;
    recognition.interimResults = true;

    recognition.onstart = () => setListening(true);
    recognition.onend = () => {
      setListening(false);
      if (recognitionRef.current) {
        setTimeout(() => {
          if (recognitionRef.current) recognition.start();
        }, 500);
      }
    };
    recognition.onerror = () => setListening(false);
    recognition.onresult = (event) => {
      const command = event.results[event.results.length - 1][0].transcript.toLowerCase();
      const latest = event.results[event.results.length - 1].isFinal;
      
      if (latest) {
        if (command.includes("go back") || command.includes("previous")) {
          if (stepRef.current > 0) setStep(stepRef.current - 1);
        }
        else if (command.includes("next") || command.includes("finish")) {
          if (stepRef.current + 1 < stepsLengthRef.current) {
            setStep(stepRef.current + 1);
          } else {
            if (recognitionRef.current) recognition.stop();
            navigate('/complete', { state: { recipe } });
          }
        }
      }
    };

    recognition.start();
    recognitionRef.current = recognition;
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
        recognitionRef.current = null;
      }
    };
  }, [navigate, recipe]);

  const goBack = () => { if (step > 0) setStep(step - 1); };
  const nextOrFinish = () => {
    if (step + 1 < steps.length) {
      setStep(step + 1);
    } else {
      if (recognitionRef.current) recognitionRef.current.stop();
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
            <button onClick={nextOrFinish}>{isLastStep ? "Finish" : "Next Step"}</button>
          </div>
          <p className="voice-hint">🎤 Say "Go Back" or {isLastStep ? '"Finish"' : '"Next Step"'}</p>
          {listening && <p className="listening-indicator">🔴 Listening...</p>}
        </div>
      </div>
    </>
  );
}

export default CookingMode;