import React, { useState } from "react";

export default function AIChat() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    // Add user message
    setMessages((prev) => [...prev, { text: input, sender: "user" }]);
    const userQuery = input;
    setInput("");
    setLoading(true);

    try {
      // Replace with your actual API call
      const res = await fetch("/api/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: userQuery }),
      });

      const data = await res.json();

      // Add AI response
      setMessages((prev) => [...prev, { text: data.answer, sender: "ai" }]);
    } catch (error) {
      console.error("Error:", error);
      setMessages((prev) => [
        ...prev,
        { text: "❌ Error fetching response. Try again.", sender: "ai" },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto bg-white dark:bg-gray-900 rounded-xl shadow-lg">
      <div className="h-64 overflow-y-auto border p-3 mb-4 rounded space-y-2">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`p-2 rounded-lg max-w-[80%] ${
              msg.sender === "user"
                ? "ml-auto bg-indigo-100 text-right"
                : "mr-auto bg-gray-200 dark:bg-gray-700 text-left"
            }`}
          >
            {msg.text}
          </div>
        ))}

        {/* 💡 Skeleton Placeholder instead of spinner */}
        {loading && (
          <div className="mr-auto space-y-2">
            <div className="w-40 h-4 bg-gray-300 dark:bg-gray-700 rounded animate-pulse"></div>
            <div className="w-28 h-4 bg-gray-300 dark:bg-gray-700 rounded animate-pulse"></div>
          </div>
        )}
      </div>

      <div className="flex gap-2">
        <input
          className="flex-1 p-2 border rounded dark:bg-gray-800 dark:text-white disabled:opacity-50"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask something..."
          disabled={loading}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <button
          onClick={handleSend}
          disabled={loading}
          className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Send
        </button>
      </div>
    </div>
  );
}
