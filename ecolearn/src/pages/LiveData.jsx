// src/pages/LiveData.jsx
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

const LiveData = () => {
  const [selectedTopic, setSelectedTopic] = useState(topics[0].value);
  const [selectedYear, setSelectedYear] = useState(years[0]);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchLiveData = async () => {
      try {
        // Replace with your real API endpoint for live data
        const res = await axios.get("http://127.0.0.1:8000/api/livedata/", {
          params: { topic: selectedTopic, year: selectedYear },
        });
        setData(res.data);
      } catch (err) {
        console.error(err);
        // fallback dummy data if API fails
        setData([
          { id: 1, name: "Solar Energy Usage", value: "320 kWh" },
          { id: 2, name: "Water Saved", value: "1,200 L" },
          { id: 3, name: "CO₂ Reduced", value: "85 kg" },
        ]);
      }
    };

    fetchLiveData();
  }, [selectedTopic, selectedYear]);

  return (
    <PageWrapper>
      <div className="space-y-4">
        <h2 className="text-2xl font-bold mb-2">📡 Live Data</h2>

        {/* Dropdowns */}
        <div className="flex space-x-4 mb-4">
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

        {/* Live Data Display */}
        <div className="bg-white rounded-lg shadow divide-y">
          {data.length === 0 ? (
            <div className="p-4 text-center text-gray-500">
              No live data available
            </div>
          ) : (
            data.map((item) => (
              <div key={item.id} className="p-4 flex justify-between">
                <span className="font-medium">{item.name}</span>
                <span className="font-semibold text-green-600">
                  {item.value}
                </span>
              </div>
            ))
          )}
        </div>

        {/* Placeholder for charts */}
        <div className="mt-6">
          <h3 className="text-xl font-semibold text-green-700 mb-2">
            Visual Insights
          </h3>
          <div className="bg-white p-4 rounded shadow text-gray-500 text-center">
            Charts will appear here based on the selected topic and year.
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default LiveData;
