import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaTrophy, FaStar, FaCode, FaUsers, FaGithub, FaSearch } from "react-icons/fa";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { useTheme } from "../context/ThemeContext"; // Add theme context

const GITHUB_REPO = "Roshansuthar1105/Omex";

// Points configuration for different PR levels
const POINTS = {
  "level 1": 3, // Easy
  "level 2": 7, // Medium
  "level 3": 10, // Hard/Feature
};

// Badge component for PR counts
const Badge = ({ count, label, color }) => (
  <div
    className={`flex items-center px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium ${color} bg-opacity-20`}
  >
    <FaCode className="mr-1 sm:mr-1.5 text-xs" />
    <span>
      {count} {label}
    </span>
  </div>
);

export default function LeaderBoard() {
  const [contributors, setContributors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalPRs: 0,
    totalContributors: 0,
    totalPoints: 0,
  });
  const [searchTerm, setSearchTerm] = useState(""); // Add search state
  const { isDark } = useTheme(); // Theme context

  useEffect(() => {
    const fetchContributorsWithPoints = async () => {
      try {
        let contributorsMap = {};
        let page = 1;
        const MAX_PAGES = 10;
        let keepFetching = true;

        // --- GITHUB API NOTE ---
        // The endpoint used below only returns contributors, not PRs.
        // To get PRs, you must use the /pulls endpoint and you need a GitHub token for private or high-volume requests.
        // For public repos and small requests, token is not strictly necessary, but rate limits are very low.
        // If you want to fetch PRs with labels, you MUST use the /pulls endpoint and pass your token in the headers.
        // See below for a correct fetch example.

        while (keepFetching && page <= MAX_PAGES) {
          const res = await fetch(
            `https://api.github.com/repos/${GITHUB_REPO}/pulls?state=closed&per_page=100&page=${page}`,
            {
              headers: {
                Accept: "application/vnd.github.v3+json",
              },
            }
          );
          const prs = await res.json();

          console.log(prs)

          if (!Array.isArray(prs) || prs.length === 0 || (prs.length === 1 && prs[0].message)) {
            keepFetching = false;
            break;
          }

          prs.forEach((pr) => {
            if (!pr.merged_at) return;

            // PR labels
            const labels = pr.labels.map((l) => l.name.toLowerCase());
            if (!labels.includes("gssoc25")) return;

            const author = pr.user.login;
            let points = 0;
            labels.forEach((label) => {
              if (POINTS[label]) points += POINTS[label];
            });

            if (!contributorsMap[author]) {
              contributorsMap[author] = {
                username: author,
                avatar: pr.user.avatar_url,
                profile: pr.user.html_url,
                points: 0,
                prs: 0,
              };
            }

            contributorsMap[author].points += points;
            contributorsMap[author].prs += 1;
          });

          page += 1;
        }

        setContributors(
          Object.values(contributorsMap).sort((a, b) => b.points - a.points)
        );
      } catch (error) {
        console.error("Error fetching contributors:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchContributorsWithPoints();
  }, []);

  useEffect(() => {
    if (contributors.length > 0) {
      const totalPRs = contributors.reduce((sum, c) => sum + Number(c.prs), 0);
      const totalPoints = contributors.reduce(
        (sum, c) => sum + Number(c.points),
        0
      );

      const flooredTotalPRs = Math.floor(totalPRs / 10) * 10;
      const flooredTotalPoints = Math.floor(totalPoints / 10) * 10;
      const flooredContributorsCount =
        Math.floor(contributors.length / 10) * 10;

      setStats({
        flooredTotalPRs,
        totalContributors: flooredContributorsCount,
        flooredTotalPoints,
      });
    }
  }, [contributors]);

  // Filter contributors by search term (username)
  const filteredContributors = contributors.filter((c) =>
    c.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination variables and states
  const PAGE_SIZE = 10;
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate which contributors to show on current page
  const indexOfLast = currentPage * PAGE_SIZE;
  const indexOfFirst = indexOfLast - PAGE_SIZE;
  const currentContributors = filteredContributors.slice(indexOfFirst, indexOfLast);

  const totalPages = Math.ceil(filteredContributors.length / PAGE_SIZE);

  // Skeleton Loader Component
  const SkeletonLoader = () => (
    <div
      className={`${
        isDark ? "bg-[#1a202e]" : "bg-white"
      } rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden`}
    >
      <div
        className={`hidden sm:grid grid-cols-12 gap-4 px-6 py-4 ${
          isDark ? "bg-[#232a3a]" : "bg-gray-50"
        } border-b border-gray-100 dark:border-gray-700`}
      >
        <div className="col-span-1 text-sm font-medium text-gray-500 dark:text-gray-400">
          #
        </div>
        <div className="col-span-6 md:col-span-7 text-sm font-medium text-gray-500 dark:text-gray-400">
          Contributor
        </div>
        <div className="col-span-5 md:col-span-4 text-sm font-medium text-gray-500 dark:text-gray-400 text-right">
          Contributions
        </div>
      </div>
      <div className="divide-y divide-gray-100 dark:divide-gray-700">
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            className="p-4 sm:grid sm:grid-cols-12 sm:gap-4 sm:items-center sm:px-6 sm:py-4"
          >
            <div className="flex items-center space-x-3 sm:hidden">
              <div
                className={`w-8 h-8 rounded-full animate-pulse flex-shrink-0 ${
                  isDark ? "bg-gray-700" : "bg-gray-200"
                }`}
              ></div>
              <div
                className={`w-10 h-10 rounded-full animate-pulse flex-shrink-0 ${
                  isDark ? "bg-gray-700" : "bg-gray-200"
                }`}
              ></div>
              <div className="flex-1 space-y-2">
                <div
                  className={`w-24 h-4 rounded animate-pulse ${
                    isDark ? "bg-gray-700" : "bg-gray-200"
                  }`}
                ></div>
                <div className="flex space-x-2">
                  <div
                    className={`w-12 h-6 rounded-full animate-pulse ${
                      isDark ? "bg-gray-700" : "bg-gray-200"
                    }`}
                  ></div>
                  <div
                    className={`w-12 h-6 rounded-full animate-pulse ${
                      isDark ? "bg-gray-700" : "bg-gray-200"
                    }`}
                  ></div>
                </div>
              </div>
            </div>
            <div className="hidden sm:contents">
              <div className="col-span-1">
                <div
                  className={`w-8 h-8 rounded-full animate-pulse ${
                    isDark ? "bg-gray-700" : "bg-gray-200"
                  }`}
                ></div>
              </div>
              <div className="col-span-6 md:col-span-7">
                <div className="flex items-center space-x-4">
                  <div
                    className={`w-10 h-10 rounded-full animate-pulse ${
                      isDark ? "bg-gray-700" : "bg-gray-200"
                    }`}
                  ></div>
                  <div className="space-y-2">
                    <div
                      className={`w-32 h-4 rounded animate-pulse ${
                        isDark ? "bg-gray-700" : "bg-gray-200"
                      }`}
                    ></div>
                    <div
                      className={`w-24 h-3 rounded animate-pulse ${
                        isDark ? "bg-gray-700" : "bg-gray-200"
                      }`}
                    ></div>
                  </div>
                </div>
              </div>
              <div className="col-span-5 md:col-span-4">
                <div className="flex items-center justify-end space-x-3">
                  <div
                    className={`w-16 h-8 rounded-full animate-pulse ${
                      isDark ? "bg-gray-700" : "bg-gray-200"
                    }`}
                  ></div>
                  <div
                    className={`w-16 h-8 rounded-full animate-pulse ${
                      isDark ? "bg-gray-700" : "bg-gray-200"
                    }`}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className={`${isDark ? "bg-[#0B1120]" : "bg-gray-50"} min-h-screen py-6 sm:py-12 px-2 sm:px-4`}>
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-8 sm:mb-12 px-2"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className={`text-2xl sm:text-4xl font-bold mb-2 sm:mb-4 ${isDark ? "text-blue-400" : "text-primary-600"}`}>
            GSSoC'25 Leaderboard
          </h1>
          <p className={`text-sm sm:text-lg max-w-3xl mx-auto leading-relaxed ${isDark ? "text-gray-300" : "text-gray-600"}`}>
            Celebrating the amazing contributions from GSSoC'25 participants.
            Join us in building something incredible together!
          </p>
        </motion.div>

        {/* Search Bar */}
        <div className="flex justify-center mb-6 px-2">
          <div className={`relative w-full max-w-xs`}>
            <input
              type="text"
              placeholder="Search contributor..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1); // Reset to first page on search
              }}
              className={`w-full pl-10 pr-4 py-2 rounded-lg border focus:outline-none transition-colors ${
                isDark
                  ? "bg-[#232a3a] border-gray-700 text-white placeholder:text-gray-400"
                  : "bg-white border-gray-300 text-gray-800 placeholder:text-gray-500"
              }`}
            />
            <FaSearch
              className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${
                isDark ? "text-gray-400" : "text-gray-500"
              }`}
            />
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-6 mb-8 sm:mb-12 px-2">
          <div className={`${isDark ? "bg-[#1a202e] border-gray-700" : "bg-white border-gray-100"} p-4 sm:p-6 rounded-xl shadow-sm border`}>
            <div className="flex items-center">
              <div className={`p-2 sm:p-3 rounded-lg ${isDark ? "bg-blue-900/30 text-blue-400" : "bg-blue-100 text-blue-600"} mr-3 sm:mr-4 flex-shrink-0`}>
                <FaUsers className="text-lg sm:text-2xl" />
              </div>
              <div className="min-w-0">
                <p className={`text-xs sm:text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                  Contributors
                </p>
                <p className={`text-lg sm:text-2xl font-bold ${isDark ? "text-white" : "text-gray-800"}`}>
                  {loading ? "..." : stats.totalContributors}+
                </p>
              </div>
            </div>
          </div>

          <div className={`${isDark ? "bg-[#1a202e] border-gray-700" : "bg-white border-gray-100"} p-4 sm:p-6 rounded-xl shadow-sm border`}>
            <div className="flex items-center">
              <div className={`p-2 sm:p-3 rounded-lg ${isDark ? "bg-green-900/30 text-green-400" : "bg-green-100 text-green-600"} mr-3 sm:mr-4 flex-shrink-0`}>
                <FaCode className="text-lg sm:text-2xl" />
              </div>
              <div className="min-w-0">
                <p className={`text-xs sm:text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                  Pull Requests
                </p>
                <p className={`text-lg sm:text-2xl font-bold ${isDark ? "text-white" : "text-gray-800"}`}>
                  {loading ? "..." : stats.flooredTotalPRs}+
                </p>
              </div>
            </div>
          </div>

          <div className={`${isDark ? "bg-[#1a202e] border-gray-700" : "bg-white border-gray-100"} p-4 sm:p-6 rounded-xl shadow-sm border sm:col-span-2 md:col-span-1`}>
            <div className="flex items-center">
              <div className={`p-2 sm:p-3 rounded-lg ${isDark ? "bg-purple-900/30 text-purple-400" : "bg-purple-100 text-purple-600"} mr-3 sm:mr-4 flex-shrink-0`}>
                <FaStar className="text-lg sm:text-2xl" />
              </div>
              <div className="min-w-0">
                <p className={`text-xs sm:text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                  Total Points
                </p>
                <p className={`text-lg sm:text-2xl font-bold ${isDark ? "text-white" : "text-gray-800"}`}>
                  {loading ? "..." : stats.flooredTotalPoints}+
                </p>
              </div>
            </div>
          </div>
        </div>

        {loading ? (
          <SkeletonLoader />
        ) : (
          <div className={`${isDark ? "bg-[#1a202e] border-gray-700" : "bg-white border-gray-100"} rounded-xl shadow-sm border overflow-hidden mx-2 sm:mx-0`}>
            {/* Desktop Table Header - Hidden on mobile */}
            <div className={`hidden sm:grid grid-cols-12 gap-4 px-6 py-4 ${isDark ? "bg-[#232a3a] border-gray-700" : "bg-gray-50 border-gray-100"} border-b`}>
              <div className="col-span-1 text-sm font-medium text-gray-500 dark:text-gray-400">
                #
              </div>
              <div className="col-span-6 md:col-span-7 text-sm font-medium text-gray-500 dark:text-gray-400">
                Contributor
              </div>
              <div className="col-span-5 md:col-span-4 text-sm font-medium text-gray-500 dark:text-gray-400 text-right">
                Contributions
              </div>
            </div>

            {/* Contributors List */}
            <div className="divide-y divide-gray-100 dark:divide-gray-700">
              {currentContributors.length === 0 ? (
                <div className="text-center py-8 text-gray-400">
                  No contributors found.
                </div>
              ) : (
                currentContributors.map((contributor, index) => (
                  <motion.div
                    key={contributor.username}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.03 }}
                    className={`group ${isDark ? "hover:bg-[#232a3a]" : "hover:bg-gray-50"} transition-colors`}
                  >
                    {/* Mobile Layout */}
                    <div className="sm:hidden p-4">
                      <div className="flex items-center space-x-3">
                        {/* Rank Badge */}
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium flex-shrink-0 ${
                            index === 0
                              ? isDark
                                ? "bg-yellow-900/30 text-yellow-400"
                                : "bg-yellow-100 text-yellow-600"
                              : index === 1
                              ? isDark
                                ? "bg-gray-800 text-gray-300"
                                : "bg-gray-100 text-gray-600"
                              : index === 2
                              ? isDark
                                ? "bg-amber-900/30 text-amber-400"
                                : "bg-amber-100 text-amber-600"
                              : isDark
                                ? "bg-gray-800/50 text-gray-400"
                                : "bg-gray-100 text-gray-500"
                          }`}
                        >
                          {indexOfFirst + index + 1}
                        </div>

                        {/* Avatar */}
                        <img
                          src={contributor.avatar}
                          alt={contributor.username}
                          className={`w-10 h-10 rounded-full border-2 ${isDark ? "border-gray-700" : "border-white"} shadow-sm flex-shrink-0`}
                        />

                        {/* User Info */}
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                            <div className="min-w-0">
                              <a
                                href={contributor.profile}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`font-medium ${isDark ? "text-white hover:text-blue-400" : "text-gray-900 hover:text-primary-600"} transition-colors text-sm truncate block`}
                              >
                                {contributor.username}
                              </a>
                              <a
                                href={`https://github.com/${GITHUB_REPO}/pulls?q=is:pr+author:${contributor.username}+is:merged`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`text-xs ${isDark ? "text-gray-400 hover:text-blue-400" : "text-gray-500 hover:text-primary-600"} transition-colors block`}
                              >
                                View Contributions →
                              </a>
                            </div>
                          </div>

                          {/* Badges */}
                          <div className="flex items-center space-x-2 mt-2">
                            <Badge
                              count={contributor.prs}
                              label={`PR${contributor.prs !== 1 ? "s" : ""}`}
                              color={isDark ? "bg-blue-900/30 text-blue-400" : "bg-blue-100 text-blue-700"}
                            />
                            <Badge
                              count={contributor.points}
                              label="Points"
                              color={isDark ? "bg-purple-900/30 text-purple-400" : "bg-purple-100 text-purple-700"}
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Desktop Layout - Hidden on mobile */}
                    <div className="hidden sm:grid grid-cols-12 gap-4 items-center px-6 py-4">
                      <div className="col-span-1">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            index === 0
                              ? isDark
                                ? "bg-yellow-900/30 text-yellow-400"
                                : "bg-yellow-100 text-yellow-600"
                              : index === 1
                              ? isDark
                                ? "bg-gray-800 text-gray-300"
                                : "bg-gray-100 text-gray-600"
                              : index === 2
                              ? isDark
                                ? "bg-amber-900/30 text-amber-400"
                                : "bg-amber-100 text-amber-600"
                              : isDark
                                ? "bg-gray-800/50 text-gray-400"
                                : "bg-gray-100 text-gray-500"
                          }`}
                        >
                          <span className="font-medium">
                            {indexOfFirst + index + 1}
                          </span>
                        </div>
                      </div>

                      <div className="col-span-6 md:col-span-7">
                        <div className="flex items-center space-x-4">
                          <img
                            src={contributor.avatar}
                            alt={contributor.username}
                            className={`w-10 h-10 rounded-full border-2 ${isDark ? "border-gray-700" : "border-white"} shadow-sm`}
                          />
                          <div>
                            <a
                              href={contributor.profile}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={`font-medium ${isDark ? "text-white hover:text-blue-400" : "text-gray-900 hover:text-primary-600"} transition-colors`}
                            >
                              {contributor.username}
                            </a>
                            <div className="flex items-center mt-1 space-x-2">
                              <a
                                href={`https://github.com/${GITHUB_REPO}/pulls?q=is:pr+author:${contributor.username}+is:merged`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`text-xs ${isDark ? "text-gray-400 hover:text-blue-400" : "text-gray-500 hover:text-primary-600"} transition-colors`}
                              >
                                View Contributions →
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="col-span-5 md:col-span-4">
                        <div className="flex items-center justify-end space-x-3">
                          <Badge
                            count={contributor.prs}
                            label={`PR${contributor.prs !== 1 ? "s" : ""}`}
                            color={isDark ? "bg-blue-900/30 text-blue-400" : "bg-blue-100 text-blue-700"}
                          />
                          <Badge
                            count={contributor.points}
                            label="Points"
                            color={isDark ? "bg-purple-900/30 text-purple-400" : "bg-purple-100 text-purple-700"}
                          />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>
            

            {/* Pagination Controls */}

            <div className={`flex justify-center items-center gap-2 py-4 border-t ${isDark ? "border-gray-700" : "border-gray-200"}`}>
              {/* Left Arrow Button (Previous Page) */}
              <button
                disabled={currentPage === 1} // Disable if we are already on the first page
                onClick={() => setCurrentPage((p) => p - 1)} // Go back one page when clicked
                className={`px-3 py-1 rounded-md ${isDark ? "bg-[#232a3a] text-white" : "bg-gray-50 text-black"} text-sm disabled:opacity-50 flex items-center justify-center mt-5`}
              >
                {/* ChevronLeft Icon for Previous */}
                <ChevronLeft size={16} />
              </button>



              {/* Page Numbers Section */}
              <div className="flex justify-center gap-2 mt-4">
                {Array.from(
                  { length: Math.ceil(filteredContributors.length / PAGE_SIZE) }, // Create an array with total number of pages
                  (_, i) => (
                    <button
                      key={i + 1} // Unique key for each page button
                      onClick={() => setCurrentPage(i + 1)} // Set page number on click
                      className={`px-3 py-1 rounded ${
                        currentPage === i + 1
                          ? isDark
                            ? "bg-blue-500 text-white"
                            : "bg-blue-500 text-white"
                          : isDark
                            ? "bg-[#232a3a] text-white"
                            : "bg-gray-200 text-black"
                      }`}
                    >



                      {/* Display the page number */}
                      {i + 1}
                    </button>



                  )
                )}
              </div>

              {/* Right Arrow Button (Next Page) */}
              <button
                disabled={currentPage === totalPages} // Disable if we are already on the last page
                onClick={() => setCurrentPage((p) => p + 1)} // Move forward one page when clicked
                className={`px-3 py-1 rounded-md ${isDark ? "bg-[#232a3a] text-white" : "bg-gray-50 text-black"} text-sm disabled:opacity-50 flex items-center justify-center mt-5`}
              >



                {/* ChevronRight Icon for Next */}
                <ChevronRight size={16} />
              </button>
            </div>




            {/* CTA Footer */}
            <div className={`${isDark ? "bg-[#232a3a] border-gray-700" : "bg-gray-50 border-gray-100"} px-4 sm:px-6 py-4 text-center border-t`}>
              <p className={`text-xs sm:text-sm ${isDark ? "text-gray-400" : "text-gray-500"} mb-3`}>
                Want to see your name here? Join GSSoC'25 and start
                contributing!
              </p>
              <a
                href="https://gssoc.girlscript.tech/"
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center px-3 sm:px-4 py-2 ${isDark ? "bg-blue-500 hover:bg-blue-600" : "bg-primary-600 hover:bg-primary-700"} text-white text-xs sm:text-sm font-medium rounded-lg transition-colors`}
              >
                <FaGithub className="mr-1.5 sm:mr-2" /> Join GSSoC'25
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}