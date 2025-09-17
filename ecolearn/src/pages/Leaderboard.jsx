// src/pages/Leaderboard.jsx
import { useState, useEffect } from "react";
import PageWrapper from "../components/PageWrapper";
import axios from "axios";

const topics = [
  { label: "Topic 1", value: "topic1" },
  { label: "Topic 2", value: "topic2" },
  { label: "Topic 3", value: "topic3" },
];

const years = [
  "2015-2016", "2016-2017", "2017-2018", "2018-2019", "2019-2020",
  "2020-2021", "2021-2022", "2022-2023", "2023-2024", "2024-2025"
];

const Leaderboard = () => {
  const [selectedTopic, setSelectedTopic] = useState(topics[0].value);
  const [selectedYear, setSelectedYear] = useState(years[0]);
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    // Fetch leaderboard data based on selected topic and year
    const fetchLeaderboard = async () => {
      try {
        // Replace with your actual API endpoint
        const res = await axios.get("http://127.0.0.1:8000/api/leaderboard/", {
          params: { topic: selectedTopic, year: selectedYear },
        });
        setLeaderboard(res.data);
      } catch (err) {
        console.error(err);
        // fallback dummy data if API fails
        setLeaderboard([
          { id: 1, name: "Ananya", points: 320 },
          { id: 2, name: "Rahul", points: 290 },
          { id: 3, name: "Priya", points: 250 },
        ]);
      }
    };

    fetchLeaderboard();
  }, [selectedTopic, selectedYear]);

  return (
    <PageWrapper>
      <div className="space-y-4">
        <h2 className="text-2xl font-bold mb-2">📊 Leaderboard</h2>

        {/* Dropdowns */}
        <div className="flex space-x-4 mb-4">
          {/* Topic Dropdown */}
          <select
            value={selectedTopic}
            onChange={(e) => setSelectedTopic(e.target.value)}
            className="border px-3 py-2 rounded"
          >
            {topics.map((topic) => (
              <option key={topic.value} value={topic.value}>
                {topic.label}
              </option>
            ))}
          </select>

          {/* Year Dropdown */}
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="border px-3 py-2 rounded"
          >
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>

        {/* Leaderboard */}
        <div className="bg-white rounded-lg shadow divide-y">
          {leaderboard.length === 0 ? (
            <div className="p-4 text-center text-gray-500">
              No data available
            </div>
          ) : (
            leaderboard.map((user, index) => (
              <div key={user.id} className="p-4 flex justify-between">
                <span>
                  #{index + 1} {user.name}
                </span>
                <span className="font-semibold text-green-600">
                  {user.points} pts
                </span>
              </div>
            ))
          )}
        </div>

        {/* Placeholder for charts */}
        <div className="mt-6">
          <h3 className="text-xl font-semibold text-green-700 mb-2">
            Charts
          </h3>
          <div className="bg-white p-4 rounded shadow text-gray-500 text-center">
            Charts will appear here based on the selected topic and year.
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default Leaderboard;
