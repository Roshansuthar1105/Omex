import { useEffect, useState } from "react";
import { FaUser, FaCodeBranch, FaPlus, FaStar } from "react-icons/fa";

const ContributorsLeaderboard = () => {
  const [contributors, setContributors] = useState([]);

  useEffect(() => {
    fetch("https://api.github.com/repos/Roshansuthar1105/Omex/contributors")
      .then((res) => res.json())
      .then((data) => {
        const sorted = data.sort((a, b) => b.contributions - a.contributions);
        setContributors(sorted);
      })
      .catch((err) => console.error("Error fetching contributors:", err));
  }, []);

  const stats = [
    { label: "Contributors", value: "20+", icon: <FaUser /> },
    { label: "Pull Requests", value: "31+", icon: <FaCodeBranch /> },
    { label: "Contributions", value: "115+", icon: <FaPlus /> },
    { label: "Total Points", value: "500+", icon: <FaStar /> },
  ];

  const getMedalBg = (index) => {
    if (index === 0) return "bg-yellow-500 text-black"; // 🥇
    if (index === 1) return "bg-gray-400 text-black";   // 🥈
    if (index === 2) return "bg-orange-500 text-black"; // 🥉
    return "bg-gray-700 text-white";
  };

  return (
    <div className="bg-black min-h-screen text-white p-6">
      {/* Title */}
      <h1 className="text-4xl font-extrabold text-center text-purple-400 mb-2">
        GSsoc'25 Leaderboard
      </h1>
      <p className="text-center text-gray-400 mb-8">
        Celebrating the amazing contributions from GSSoc'25 participants.
      </p>

      {/* Stats section */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto mb-10">
        {stats.map((stat, i) => (
          <div
            key={i}
            className="bg-[#1a1a1a] rounded-xl p-6 text-center shadow-lg"
          >
            <div className="text-purple-400 text-2xl mb-2 flex justify-center">
              {stat.icon}
            </div>
            <h3 className="text-2xl font-bold text-purple-300">{stat.value}</h3>
            <p className="text-gray-400">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Leaderboard table */}
      <div className="max-w-5xl mx-auto bg-[#1a1a1a] rounded-xl shadow-lg overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead className="bg-[#222] text-gray-300">
            <tr>
              <th className="p-4">#</th>
              <th className="p-4">Contributor</th>
              <th className="p-4">PRs</th>
              <th className="p-4">Contributions</th>
              <th className="p-4">Progress</th>
            </tr>
          </thead>
          <tbody>
            {contributors.map((contributor, index) => (
              <tr
                key={contributor.login}
                className="border-t border-gray-700 hover:bg-[#2a2a2a] transition"
              >
                {/* Rank with medal */}
                <td className="p-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-bold ${getMedalBg(
                      index
                    )}`}
                  >
                    {index + 1}
                  </span>
                </td>

                {/* Contributor avatar + name */}
                <td className="p-4 flex items-center space-x-3">
                  <img
                    src={contributor.avatar_url}
                    alt={contributor.login}
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <p className="font-semibold">{contributor.login}</p>
                    <a
                      href={contributor.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-purple-400 hover:underline"
                    >
                      View Contributions →
                    </a>
                  </div>
                </td>

                {/* Placeholder for PRs */}
                <td className="p-4 text-purple-400 font-bold">4</td>

                {/* Contributions */}
                <td className="p-4 text-gray-300 font-bold">
                  {contributor.contributions}
                </td>

                {/* Progress bar */}
                <td className="p-4">
                  <div className="w-full bg-gray-700 rounded-full h-3">
                    <div
                      className="bg-purple-400 h-3 rounded-full"
                      style={{
                        width: `${Math.min(
                          (contributor.contributions /
                            contributors[0].contributions) *
                            100,
                          100
                        )}%`,
                      }}
                    ></div>
                  </div>
                  <p className="text-sm text-gray-400 mt-1">
                    {Math.min(
                      Math.round(
                        (contributor.contributions /
                          contributors[0].contributions) *
                          100
                      ),
                      100
                    )}
                    %
                  </p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ContributorsLeaderboard;
