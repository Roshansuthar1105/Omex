import React from "react";
import AiNetworkHero from "../components/AiNetworkHero";
import { useTheme } from "../context/ThemeContext";
import AIDemo from "../components/AiDemo";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

function ModelAnalytics() {
  const { isDark } = useTheme();
  // Example data – replace with API calls or dynamic data later
  const data = [
    { model: "GPT-4", accuracy: 92, speed: 75 },
    { model: "Claude 3", accuracy: 89, speed: 82 },
    { model: "LLaMA-3", accuracy: 85, speed: 78 },
    { model: "Gemini", accuracy: 87, speed: 80 },
  ];

  return (
    <section className="py-11 mx-5 my-5 px-2.5 space-y-6">
      <header>
        <h1
          className={`text-3xl font-bold ${
            isDark ? "text-gray-100" : "text-gray-900"
          } `}
        >
          Model Performance Analytics
        </h1>
        <p
          className={`${
            isDark ? "text-gray-300" : "text-gray-900"
          } text-lg mt-2`}
        >
          Compare benchmark accuracy and relative inference speed of top large
          language models.
        </p>
      </header>

      <div className="bg-white mx-14 rounded-2xl shadow p-4">
        <h2
          className={`text-xl font-semibold mb-4 ${
            isDark ? "text-gray-900" : "text-gray-600"
          }`}
        >
          Accuracy vs Speed
        </h2>

        <div className="flex flex-col items-center justify-center h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="model" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="accuracy" fill="#4F46E5" name="Accuracy (%)" />
              <Bar dataKey="speed" fill="#10B981" name="Speed (%)" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </section>
  );
}

export default function AiInsights() {
  const { isDark } = useTheme();

  return (
    <div
      className={`container max-auto text-center relative z-10 m-2.5 py-7 px-6${
        isDark ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-800"
      } min-h-screen `}
    >
      {/* background circles */}
      <div class="absolute inset-0 -z-10 pointer-events-none">
        <div
          class={`absolute top-10 left-20 w-32 h-32 'bg-white/10 'rounded-full blur-3xl`}
        ></div>
        <div class="absolute top-10 right-2/4 w-32 h-32 bg-white/60 rounded-full blur-3xl"></div>
        <div class="absolute top-1/3 right-10 w-24 h-24 bg-white/10 rounded-full blur-2xl"></div>
        <div class="absolute bottom-16 left-1/4 w-40 h-40 bg-white/15 rounded-full blur-3xl"></div>
        <div class="absolute bottom-10 right-1/3 w-28 h-28 bg-white/20 rounded-full blur-2xl"></div>
        <div class="absolute top-1/2 left-0 w-36 h-36 bg-white/60 rounded-full blur-3xl"></div>
      </div>

      {/* dot pattern */}
      <div
        className={`absolute pointer-events-none top-16 left-10 inset-0 h-30 w-30 ${
          isDark
            ? "bg-[radial-gradient(circle,#f3f4f6_1px,transparent_1px)]"
            : "bg-[radial-gradient(circle,#111827_1px,transparent_1px)]"
        } bg-[size:10px_10px] animate-pulse [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_80%,transparent_100%)]`}
      />
      <div
        className={`absolute pointer-events-none top-16 left-9/10 inset-0 h-30 w-30 ${
          isDark
            ? "bg-[radial-gradient(circle,#f3f4f6_1px,transparent_1px)]"
            : "bg-[radial-gradient(circle,#111827_1px,transparent_1px)]"
        } bg-[size:10px_10px] animate-pulse [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_80%,transparent_100%)]`}
      />
      {/* hero section */}
      <div className={`flex items-center justify-center flex-col rounded-3xl py-7 px-6 max-w-4xl mx-auto hero-animate`}>

            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight hero-animate ">
                Welcome to <span className="text-blue-400">AI Insights</span>
            </h1>

            <h2 className="text-center text-2xl md:text-4xl font-bold mb-6">
                A Data Integration Platform for{" "}
                <span className="text-blue-400">DATA SCIENTIST</span>
            </h2>
            <p className={`${isDark ? 'text-gray-300'  : 'text-blue-500'} `}>
                Quick snapshot of current AI trends, key metrics, and news.
            </p>
      </div>

      {/* Partical network demo */} 
      <AiNetworkHero/>

      {/* show how AI is powerfull */}
      <AIDemo/>

      {/* model Analytics */}
      <ModelAnalytics />
    </div>
  );
}
