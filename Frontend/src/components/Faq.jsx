import { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const faqs = [
  {
    question: "What is Omex?",
    answer:
      "Omex is an AI-powered platform designed for developers to write cleaner, faster, and more reliable code. It offers tools for code optimization, generation, complexity analysis, and comparison, helping developers focus more on problem-solving rather than repetitive coding tasks."
  },
  {
    question: "How does Omex optimize my code?",
    answer:
      "Omex analyzes your code for potential bottlenecks in performance, readability, and maintainability. Using AI models, it suggests alternative approaches, refactors inefficient code blocks, and recommends best practices aligned with modern coding standards. This ensures your codebase remains scalable and easier to maintain in the long run."
  },
  {
    question: "Can I generate complete code using Omex?",
    answer:
      "Yes! Omex can generate complete code snippets, boilerplate structures, and even function implementations based on your requirements. Whether you need starter templates for APIs, UI components, or algorithm implementations, Omex assists in generating production-ready code that follows best practices."
  },
  {
    question: "Is Omex free to use?",
    answer:
      "Omex provides a free tier that allows developers to explore its essential features with limited usage. For professional and enterprise developers, Omex offers paid plans that unlock unlimited code generation, in-depth optimization reports, priority support, and integration with developer tools such as GitHub, VS Code, and CI/CD pipelines."
  },
  {
    question: "Do I need to install anything to use Omex?",
    answer:
      "No installation is required. Omex runs entirely on the web, which means you can access it directly from your browser without worrying about setup or system compatibility. For convenience, we also provide browser extensions and IDE plugins so you can integrate Omex seamlessly into your existing workflow."
  },
  {
    question: "Who can benefit from using Omex?",
    answer:
      "Omex is designed for a wide range of users, including students, individual developers, startups, and large enterprises. Beginners can use it to learn coding best practices, while professionals and teams can rely on it for maintaining large codebases, reducing technical debt, and ensuring consistency across projects."
  },
  {
    question: "Does Omex support multiple programming languages?",
    answer:
      "Yes. Omex supports multiple popular programming languages including JavaScript, Python, Java, C++, and more. Our team is continuously working on expanding language support to meet the needs of diverse developer communities worldwide."
  }
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-[#0B1120] text-white py-16 px-6 md:px-20" id="faq">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">Frequently Asked Questions</h2>
        <p className="text-gray-400 mb-12">
          Everything you need to know about Omex and how it can improve your coding workflow.
        </p>
      </div>

      <div className="max-w-3xl mx-auto space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="bg-[#111827] rounded-2xl shadow-md p-5 cursor-pointer transition-all duration-300 hover:bg-[#1F2937] hover:shadow-[#374151]"
            onClick={() => toggleFAQ(index)}
          >
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">{faq.question}</h3>
              {openIndex === index ? (
                <FaChevronUp className="w-5 h-5 text-blue-400" />
              ) : (
                <FaChevronDown className="w-5 h-5 text-blue-400" />
              )}
            </div>
            {openIndex === index && (
              <p className="mt-3 text-gray-400">{faq.answer}</p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
