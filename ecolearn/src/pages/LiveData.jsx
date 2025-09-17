// src/pages/LiveData.jsx
import { useState, useEffect } from "react";
import PageWrapper from "../components/PageWrapper";
import axios from "axios";
import { motion } from "framer-motion"; // ✅ Add this at the top

const topics = [
  { label: "🌳 Trees", value: "trees" },
  { label: "💧 Waste Water", value: "wastewater" },
  { label: "🌍 Climate Change", value: "climate" },
];

const years = [
  "2015-2016",
  "2016-2017",
  "2017-2018",
  "2018-2019",
  "2019-2020",
  "2020-2021",
  "2021-2022",
  "2022-2023",
  "2023-2024",
  "2024-2025",
];

const rotatingMessages = [
  "🌱 Every tree planted absorbs about 22kg of CO₂ every year.",
  "💧 Recycling 1L of water saves enough energy to power a bulb for 4 hours.",
  "🌍 Switching to clean energy can cut CO₂ emissions by 70% by 2050!",
  "♻ 1 ton of recycled paper saves 17 trees and 26,000 liters of water.",
  "⚡ Turning off unused devices can save up to 10% of your household energy.",
];

const tips = {
  trees: "🌱 Planting 20 trees absorbs as much CO₂ as a car emits in a year!",
  wastewater:
    "💧 Every litre of recycled water saves 1.5L of groundwater – small steps save big resources!",
  climate:
    "🌍 Switching to renewable energy can cut CO₂ emissions by 70% by 2050!",
};

// Centralized Tableau Dashboard Config
const tableauDashboards = {
  trees: {
    "2015-2016": {
      name: "Trees2015-2016_17579280434060/Dashboard1",
      static_image:
        "https://public.tableau.com/static/images/Tr/Trees2015-2016_17579280434060/Dashboard1/1.png",
    },
    "2016-2017": {
      name: "Trees2016-2017/Dashboard1",
      static_image:
        "https://public.tableau.com/static/images/Tr/Trees2016-2017/Dashboard1/1.png",
    },
    "2017-2018": {
      name: "Trees2017-2018/Dashboard1",
      static_image:
        "https://public.tableau.com/static/images/Tr/Trees2017-2018/Dashboard1/1.png",
    },
    "2018-2019": {
      name: "Trees2018-2019/Dashboard1",
      static_image:
        "https://public.tableau.com/static/images/Tr/Trees2018-2019/Dashboard1/1.png",
    },
    "2019-2020": {
      name: "2019-2020_17574108594310/Dashboard2",
      static_image:
        "https://public.tableau.com/static/images/20/2019-2020_17574108594310/Dashboard2/1.png",
    },
    "2020-2021": {
      name: "Trees2020-20211/Dashboard1",
      static_image:
        "https://public.tableau.com/static/images/Tr/Trees2020-20211/Dashboard1/1.png",
    },
    "2021-2022": {
      name: "Trees2021-20221/Dashboard1",
      static_image:
        "https://public.tableau.com/static/images/Tr/Trees2021-20221/Dashboard1/1.png",
    },
    "2022-2023": {
      name: "Trees2022-2023/Dashboard1",
      static_image:
        "https://public.tableau.com/static/images/Tr/Trees2022-2023/Dashboard1/1.png",
    },
    "2023-2024": {
      name: "Trees2023-20241/Dashboard1",
      static_image:
        "https://public.tableau.com/static/images/Tr/Trees2023-20241/Dashboard1/1.png",
    },
    "2024-2025": {
      name: "Trees2024-2025/Dashboard1",
      static_image:
        "https://public.tableau.com/static/images/Tr/Trees2024-2025/Dashboard1/1.png",
    },
  },

  wastewater: {
    "2015-2016": {
      name: "Wastewater2025-2016/Dashboard1",
      static_image:
        "https://public.tableau.com/static/images/Wa/Wastewater2025-2016/Dashboard1/1.png",
    },
    "2016-2017": {
      name: "WasteWater2016-2017/Dashboard1",
      static_image:
        "https://public.tableau.com/static/images/Wa/WasteWater2016-2017/Dashboard1/1.png",
    },
    "2017-2018": {
      name: "WasteWater2017-2018/Dashboard1",
      static_image:
        "https://public.tableau.com/static/images/Wa/WasteWater2017-2018/Dashboard1/1.png",
    },
    "2018-2019": {
      name: "WasteWater2018-2019/Dashboard1",
      static_image:
        "https://public.tableau.com/static/images/Wa/WasteWater2018-2019/Dashboard1/1.png",
    },
    "2019-2020": {
      name: "WasteWater2019-2020/Dashboard1",
      static_image:
        "https://public.tableau.com/static/images/Wa/WasteWater2019-2020/Dashboard1/1.png",
    },
    "2020-2021": {
      name: "WasteWater2020-2021/Dashboard1",
      static_image:
        "https://public.tableau.com/static/images/Wa/WasteWater2020-2021/Dashboard1/1.png",
    },
    "2021-2022": {
      name: "WasteWater2021-2022/Dashboard1",
      static_image:
        "https://public.tableau.com/static/images/Wa/WasteWater2021-2022/Dashboard1/1.png",
    },
    "2022-2023": {
      name: "WasteWater2022-2023/Dashboard1",
      static_image:
        "https://public.tableau.com/static/images/Wa/WasteWater2022-2023/Dashboard1/1.png",
    },
    "2023-2024": {
      name: "WasteWater2023-2024/Dashboard1",
      static_image:
        "https://public.tableau.com/static/images/Wa/WasteWater2023-2024/Dashboard1/1.png",
    },
    "2024-2025": {
      name: "WasteWater2024-2025/Dashboard1",
      static_image:
        "https://public.tableau.com/static/images/Wa/WasteWater2024-2025/Dashboard1/1.png",
    },
  },

  climate: {
    "2015-2016": {
      name: "Climate2015-2016/Dashboard1",
      static_image:
        "https://public.tableau.com/static/images/Cl/Climate2015-2016/Dashboard1/1.png",
    },
    "2016-2017": {
      name: "Climate2016-2017/Dashboard1",
      static_image:
        "https://public.tableau.com/static/images/Cl/Climate2016-2017/Dashboard1/1.png",
    },
    "2017-2018": {
      name: "Climate2017-2018/Dashboard1",
      static_image:
        "https://public.tableau.com/static/images/Cl/Climate2017-2018/Dashboard1/1.png",
    },
    "2018-2019": {
      name: "Climate2018-2019/Dashboard1",
      static_image:
        "https://public.tableau.com/static/images/Cl/Climate2018-2019/Dashboard1/1.png",
    },
    "2019-2020": {
      name: "Climate2019-2020/Dashboard1",
      static_image:
        "https://public.tableau.com/static/images/Cl/Climate2019-2020/Dashboard1/1.png",
    },
    "2020-2021": {
      name: "Climate2020-2021/Dashboard1",
      static_image:
        "https://public.tableau.com/static/images/Cl/Climate2020-2021/Dashboard1/1.png",
    },
    "2021-2022": {
      name: "Climate2021-2022/Dashboard1",
      static_image:
        "https://public.tableau.com/static/images/Cl/Climate2021-2022/Dashboard1/1.png",
    },
    "2022-2023": {
      name: "Climate2022-2023/Dashboard1",
      static_image:
        "https://public.tableau.com/static/images/Cl/Climate2022-2023/Dashboard1/1.png",
    },
    "2023-2024": {
      name: "Climate2023-2024/Dashboard1",
      static_image:
        "https://public.tableau.com/static/images/Cl/Climate2023-2024/Dashboard1/1.png",
    },
    "2024-2025": {
      name: "Climate2024-2025/Dashboard1",
      static_image:
        "https://public.tableau.com/static/images/Cl/Climate2024-2025/Dashboard1/1.png",
    },
  },
};

const LiveData = () => {
  const [selectedTopic, setSelectedTopic] = useState(topics[0].value);
  const [selectedYear, setSelectedYear] = useState(years[0]);
  const [data, setData] = useState([]);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    const fetchLiveData = async () => {
      try {
        const res = await axios.get("http://127.0.0.1:8000/api/livedata/", {
          params: { topic: selectedTopic, year: selectedYear },
        });
        setData(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchLiveData();
  }, [selectedTopic, selectedYear]);

  // Typewriter effect
  useEffect(() => {
    let charIndex = 0;
    let typingInterval;

    const typeMessage = () => {
      const currentMessage = rotatingMessages[currentMessageIndex];
      if (charIndex < currentMessage.length) {
        setDisplayedText((prev) => prev + currentMessage[charIndex]);
        charIndex++;
      } else {
        clearInterval(typingInterval);
        setTimeout(() => {
          setDisplayedText("");
          setCurrentMessageIndex(
            (prev) => (prev + 1) % rotatingMessages.length
          );
        }, 3000);
      }
    };

    setDisplayedText("");
    typingInterval = setInterval(typeMessage, 50);

    return () => clearInterval(typingInterval);
  }, [currentMessageIndex]);

  const dashboardConfig = tableauDashboards[selectedTopic]?.[selectedYear];
  const tableauUrl = dashboardConfig
    ? `https://public.tableau.com/views/${dashboardConfig.name}?:showVizHome=no&:embed=true`
    : null;

  return (
    <PageWrapper>
      <div className="space-y-4">
        <h2 className="text-2xl font-bold mb-2">📡 Live Data</h2>

        {/* Animated Insight Box */}
        <div className="bg-green-50 p-4 rounded-lg border border-green-200 shadow-sm min-h-[60px] flex items-center justify-center">
          <motion.p
            key={currentMessageIndex}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 120, damping: 10 }}
            className="text-green-700 text-base font-semibold text-center"
          >
            {displayedText}
            <span className="animate-pulse">|</span>
          </motion.p>
        </div>

        {/* Visual Insights */}
        <div className="mt-6">
          <h3 className="text-xl font-semibold text-green-700 mb-2">
            Visual Insights
          </h3>

          {/* ✅ Dropdowns */}
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

          {tableauUrl ? (
            <div className="bg-white p-4 rounded shadow">
              <iframe
                src={tableauUrl}
                width="100%"
                height="700"
                frameBorder="0"
                allowFullScreen
                title={`Dashboard-${selectedTopic}-${selectedYear}`}
                style={{ border: "none" }}
              />
            </div>
          ) : (
            <div className="bg-white p-4 rounded shadow text-gray-500 text-center">
              No dashboard available for this selection.
            </div>
          )}
        </div>
      </div>
    </PageWrapper>
  );
};

export default LiveData;
