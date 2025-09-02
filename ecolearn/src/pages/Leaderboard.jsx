// src/pages/Leaderboard.jsx
import PageWrapper from "../components/PageWrapper";
const Leaderboard = () => {
  const dummyLeaderboard = [
    { id: 1, name: "Ananya", points: 320 },
    { id: 2, name: "Rahul", points: 290 },
    { id: 3, name: "Priya", points: 250 },
  ];

  return (
    <PageWrapper>
    <div>
      <h2 className="text-2xl font-bold mb-4">📊 Leaderboard</h2>
      <div className="bg-white rounded-lg shadow divide-y">
        {dummyLeaderboard.map((user) => (
          <div key={user.id} className="p-4 flex justify-between">
            <span>{user.name}</span>
            <span className="font-semibold text-green-600">{user.points} pts</span>
          </div>
        ))}
      </div>
    </div>
    </PageWrapper>
  );
};

export default Leaderboard;
