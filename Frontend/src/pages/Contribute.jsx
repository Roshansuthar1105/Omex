import { useEffect, useState } from "react";
import { FaGithub } from "react-icons/fa";
import { useTheme } from "../context/ThemeContext";
import Loader from "../components/Loader";

const GITHUB_REPO = "Roshansuthar1105/Omex";

const Contribute = () => {
  const { isDark } = useTheme();
  const [contributors, setContributors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch contributors on mount
  useEffect(() => {
    const fetchContributors = async () => {
      try {
        const res = await fetch(
          `https://api.github.com/repos/${GITHUB_REPO}/contributors?per_page=12`
        );
        if (!res.ok) throw new Error("Failed to fetch contributors");
        const data = await res.json();
        if (Array.isArray(data)) {
          setContributors(data);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
        window.scrollTo(0, 0);
      }
    };
    fetchContributors();
  }, []);

  if (loading) {
    return (
      <div
        className={`min-h-screen flex items-center justify-center ${
          isDark ? "bg-gray-800" : "bg-gray-100"
        }`}
      >
        <Loader fullscreen size="xl" color="purple" text="Our Contributors..." />
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen w-full ${
        isDark ? "bg-gray-900 text-gray-100" : "bg-gray-100 text-gray-900"
      } relative overflow-hidden`}
    >
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-purple-700 opacity-5"></div>
        <div
          className="absolute inset-0 bg-cover bg-center opacity-5"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1596524430615-b46475ddff6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')",
          }}
        ></div>
      </div>

      <div className="container mx-auto px-4 py-12 relative z-10 max-w-5xl">
        {/* Header */}
        <div className="text-center mb-14">
          <h1 className="text-4xl font-extrabold mb-3 tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500">
            🤝 How to Contribute
          </h1>
          <p
            className={`mx-auto max-w-3xl text-lg ${
              isDark ? "text-gray-300" : "text-gray-600"
            }`}
          >
            Want to add resources, fix bugs, or make Omex better? Follow these
            clear steps!
          </p>
        </div>

        {/* Contribution Steps */}
        <div
          className={`rounded-xl p-8 mb-14 shadow-lg ${
            isDark
              ? "bg-gray-900/90 backdrop-blur-[16px] border border-gray-700"
              : "bg-white"
          }`}
        >
          <section>
            <h2 className="text-2xl font-semibold mb-6 border-b border-gray-300 pb-2 dark:border-gray-700">
              📝 Contribution Steps
            </h2>
            <ol
              className={`list-decimal list-inside space-y-3 ${
                isDark ? "text-gray-300" : "text-gray-700"
              }`}
            >
              <li>
                🍴 <strong>Fork</strong> the repository.
              </li>
              <li>
                💻 <strong>Clone</strong> your fork locally:
                <br />
                <code className="break-all dark:bg-gray-700 p-1 rounded">
                  git clone https://github.com/YOUR-USERNAME/Omex.git
                </code>
              </li>
              <li>
                🌿 <strong>Create a feature branch</strong>:
                <br />
                <code className="break-all dark:bg-gray-700 p-1 rounded">
                  git checkout -b feature/YourFeatureName
                </code>
              </li>
              <li>
                📦 <strong>Install dependencies</strong>: <code>npm install</code>
              </li>
              <li>✨ Make your changes following UI/UX and code guidelines.</li>
              <li>🧪 Test with <code>npm start</code>.</li>
              <li>
                💾 Commit:
                <br />
                <code className="break-all dark:bg-gray-700 p-1 rounded">
                  git add . <br />
                  git commit -m "Add your feature"
                </code>
              </li>
              <li>
                🛫 Push:
                <br />
                <code className="break-all dark:bg-gray-700 p-1 rounded">
                  git push origin feature/YourFeatureName
                </code>
              </li>
              <li>📬 Open a Pull Request.</li>
            </ol>
          </section>
        </div>

        {/* Community Guidelines */}
        <div
          className={`rounded-xl p-8 mb-14 shadow-lg ${
            isDark
              ? "bg-gray-800/80 backdrop-blur-md"
              : "bg-white"
          }`}
        >
          <section>
            <h2 className="text-2xl font-semibold mb-6 border-b border-gray-300 pb-2 dark:border-gray-700">
              🌈 Community & Coding Guidelines
            </h2>
            <ul
              className={`list-disc list-inside space-y-3 ${
                isDark ? "text-gray-300" : "text-gray-700"
              }`}
            >
              <li>Write clear commit messages.</li>
              <li>Keep the code clean, modular, and readable.</li>
              <li>Follow consistent theme & UI patterns.</li>
              <li>
                Keep resource JSON structure: University → Courses → Branches → Years → Subjects → Resources.
              </li>
              <li>Test changes on desktop & mobile.</li>
              <li>
                Review{" "}
                <a
                  href="https://github.com/Roshansuthar1105/Omex/blob/main/CONTRIBUTING.md"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  Contribution Guide
                </a>{" "}
                &{" "}
                <a
                  href="https://github.com/Roshansuthar1105/Omex/blob/main/CODE_OF_CONDUCT.md"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  Code of Conduct
                </a>
                .
              </li>
            </ul>
          </section>
        </div>

        {/* Top Contributors */}
        <div
          className={`rounded-xl p-8 shadow-lg ${
            isDark
              ? "bg-gray-800/80 backdrop-blur-md"
              : "bg-white"
          }`}
        >
          <section>
            <h2 className="text-2xl font-semibold mb-6 border-b border-gray-300 pb-2 dark:border-gray-700">
              ⚡ Top Contributors
            </h2>
            {error ? (
              <p className="text-red-500">{error}</p>
            ) : contributors.length === 0 ? (
              <p className={isDark ? "text-gray-400" : "text-gray-600"}>
                No contributors found.
              </p>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-6">
                {contributors.map(({ id, avatar_url, login, html_url }) => (
                  <a
                    key={id}
                    href={html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex flex-col items-center bg-opacity-20 rounded-lg p-3 transition-transform transform hover:scale-105 ${
                      isDark
                        ? "bg-purple-800 text-white"
                        : "bg-purple-100 text-purple-900"
                    }`}
                    title={login}
                  >
                    <img
                      className="w-14 h-14 rounded-full mb-2 shadow-md"
                      src={avatar_url}
                      alt={`${login}'s avatar`}
                    />
                    <span className="truncate max-w-full text-center font-medium">
                      {login}
                    </span>
                    <FaGithub className="mt-1 text-xl" />
                  </a>
                ))}
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
};

export default Contribute;
