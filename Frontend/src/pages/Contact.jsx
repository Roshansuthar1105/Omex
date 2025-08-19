import React, { useRef, useState, useEffect } from "react";
import axios from "axios";
import { useTheme } from "../context/ThemeContext";

const Contact = () => {
  // If your ThemeContext uses isDark (old), adapt this line accordingly:
  const { theme } = useTheme(); // or const { isDark } = useTheme()
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [aiReply, setAiReply] = useState("");
  const [aiIntent, setAiIntent] = useState("");
  const [loading, setLoading] = useState(false);
  const timerRef = useRef(null);

  // optional: set axios baseURL once if you aren’t using a Vite proxy
  // axios.defaults.baseURL = import.meta.env.VITE_API_BASE || "http://localhost:5000";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((s) => ({ ...s, [name]: value }));

    if (name === "message") {
      // clear previous timer
      if (timerRef.current) clearTimeout(timerRef.current);

      if (value.trim().length < 6) {
        setAiReply("");
        setAiIntent("");
        return;
      }

      // debounce 400ms
      timerRef.current = setTimeout(async () => {
        try {
          setLoading(true);
          const res = await axios.post("/api/ai/intent-detect", { message: value });
          setAiReply(res.data?.reply || "");
          setAiIntent(res.data?.intent || "");
        } catch (err) {
          console.error("AI Suggestion Error:", err);
          setAiReply("Sorry, I couldn't generate a suggestion.");
          setAiIntent("");
        } finally {
          setLoading(false);
        }
      }, 400);
    }
  };

  useEffect(() => () => timerRef.current && clearTimeout(timerRef.current), []);

  const handleSubmit = (e) => {
    e.preventDefault();
    // keep your existing email flow or post to your backend here (optional submission requirement)
    console.log("Form submitted:", formData);
  };

  return (
    <div className={`contact-page ${theme}`}>
      <h2>Contact Us</h2>
      <form onSubmit={handleSubmit}>
        <input name="name" value={formData.name} onChange={handleChange} placeholder="Your Name" />
        <input name="email" type="email" value={formData.email} onChange={handleChange} placeholder="Your Email" />
        <textarea name="message" value={formData.message} onChange={handleChange} placeholder="Your Message" />

        {formData.message && (
          <div
            className={`ai-reply-box ${theme}`}
            style={{
              marginTop: 10,
              padding: 12,
              borderRadius: 8,
              backgroundColor: theme === "dark" ? "#222" : "#f9f9f9",
              border: "1px solid #ccc",
            }}
          >
            <strong>Smart Assistant</strong>
            {aiIntent ? (
              <span style={{ marginLeft: 8, fontSize: 12, padding: "2px 6px", border: "1px solid #999", borderRadius: 999 }}>
                {aiIntent}
              </span>
            ) : null}
            <p style={{ marginTop: 8 }}>{loading ? "Thinking..." : aiReply || " "}</p>
          </div>
        )}

        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default Contact;
