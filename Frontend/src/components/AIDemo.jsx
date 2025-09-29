import { useState } from "react";
import OpenAI from "openai";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";

export default function AIDemo() {
  const client = new OpenAI({
    apiKey: import.meta.env.VITE_OPENAI_KEY,
    dangerouslyAllowBrowser: true, // for quick demo only
  });

  // ---------- State ---------- 

  const { transcript, listening, resetTranscript } = useSpeechRecognition();

  // ---------- Handlers ---------- 
  const startListening = () =>
    SpeechRecognition.startListening({ continuous: true, language: "en-US" });

  // ---------- UI ----------
  return (
    <div className="max-w-3xl relative overflow-hidden mx-auto space-y-12 py-20 px-4">
      <h1 className="text-4xl font-bold text-center mb-8">
        🚀 AI Power Demo
      </h1>  
      {/* ===== Speech Recognition ===== */}
      <section className="space-y-4 bg-white/10 p-6 rounded-2xl shadow">
        <h2 className="text-2xl font-semibold">Speech Recognition</h2>
        <div className="flex gap-3">
          <button
            onClick={startListening}
            className="px-4 py-2 bg-purple-800 text-white rounded hover:bg-purple-950"
          >
            🎙️ Start
          </button>
          <button
            onClick={SpeechRecognition.stopListening}
            className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
          >
            ⏹️ Stop
          </button>
          <button
            onClick={resetTranscript}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            🔄 Reset
          </button>
        </div>
        <p className="mt-4">
          <strong>Status:</strong> {listening ? "Listening..." : "Stopped"}
        </p>
        <div className="bg-white/20 relative px-4 py-5 rounded-2xl shadow-2xl shadow-amber-300 my-4 text-center ">
         <p className="absolute text-2xl top-0 font-bold py-2 left-1/5">Your Text will appear Here</p>
         <p className="my-7 text-lg" >{transcript} </p>
        </div>
      </section>
    </div>
  );
}
