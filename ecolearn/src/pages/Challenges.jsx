// src/pages/Challenges.jsx
import PageWrapper from "../components/PageWrapper";
const Challenges = () => {
  const dummyChallenges = [
    { id: 1, task: "Plant a tree 🌱", reward: "+50 Eco Points" },
    { id: 2, task: "Segregate your waste ♻️", reward: "+30 Eco Points" },
    { id: 3, task: "Use public transport 🚇", reward: "+20 Eco Points" },
  ];

  return (
    <PageWrapper>
    <div>
      <h2 className="text-2xl font-bold mb-4">🏆 Challenges</h2>
      <div className="space-y-4">
        {dummyChallenges.map((ch) => (
          <div key={ch.id} className="p-4 bg-white rounded-lg shadow flex justify-between">
            <span>{ch.task}</span>
            <span className="text-green-600 font-semibold">{ch.reward}</span>
          </div>
        ))}
      </div>
    </div>
    </PageWrapper>
  );
};

export default Challenges;
    