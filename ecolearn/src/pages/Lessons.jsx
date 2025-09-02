// src/pages/Lessons.jsx
import PageWrapper from "../components/PageWrapper";
const Lessons = () => {
  const dummyLessons = [
    { id: 1, title: "Introduction to Sustainability", progress: "20%" },
    { id: 2, title: "Waste Segregation Basics", progress: "0%" },
    { id: 3, title: "Climate Change Awareness", progress: "50%" },
  ];

  return (
    <PageWrapper>
    <div>
      <h2 className="text-2xl font-bold mb-4">📘 Lessons</h2>
      <div className="space-y-4">
        {dummyLessons.map((lesson) => (
          <div key={lesson.id} className="p-4 bg-white rounded-lg shadow flex justify-between">
            <span>{lesson.title}</span>
            <span className="text-sm text-gray-500">Progress: {lesson.progress}</span>
          </div>
        ))}
      </div>
    </div>
    </PageWrapper>
  );
};

export default Lessons;
