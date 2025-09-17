// src/pages/Lessons.jsx
import { useState } from "react";
import PageWrapper from "../components/PageWrapper";

const Lessons = () => {
  const [lessons, setLessons] = useState([
    { id: 1, title: "Introduction to Sustainability", completed: false },
    { id: 2, title: "Waste Segregation Basics", completed: false },
    { id: 3, title: "Climate Change Awareness", completed: false },
  ]);

  const total = lessons.length;
  const completed = lessons.filter((l) => l.completed).length;
  const progress = Math.round((completed / total) * 100);

  const toggleLesson = (id) => {
    setLessons((prev) =>
      prev.map((lesson) =>
        lesson.id === id ? { ...lesson, completed: !lesson.completed } : lesson
      )
    );
  };

  return (
    <PageWrapper>
      <h2 className="text-2xl font-retroHeading text-green-600 mb-4">
        📘 Lessons
      </h2>

      {/* Progress Tracker */}
      <div className="mb-6 font-retroBody">
        <div className="w-full bg-gray-300 rounded-full h-4">
          <div
            className="bg-green-500 h-4 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <p className="text-sm mt-2 text-gray-600">{progress}% completed</p>
      </div>

      {/* Lessons */}
      <div className="space-y-4 font-retroBody">
        {lessons.map((lesson) => (
          <div
            key={lesson.id}
            className="p-4 bg-white rounded-lg shadow flex justify-between items-center"
          >
            <span>{lesson.title}</span>
            <button
              onClick={() => toggleLesson(lesson.id)}
              className={`px-4 py-2 rounded-lg text-white ${
                lesson.completed
                  ? "bg-gray-500 hover:bg-gray-600"
                  : "bg-green-500 hover:bg-green-600"
              }`}
            >
              {lesson.completed ? "Finish" : "Start"}
            </button>
          </div>
        ))}
      </div>
    </PageWrapper>
  );
};

export default Lessons;
