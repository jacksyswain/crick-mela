import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../services/firebase";
import { signOut } from "firebase/auth";

import MatchCard from "../components/MatchCard";
import { matches } from "../data/matches";

function Home() {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [sortType, setSortType] = useState("latest");

  // protect route
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) navigate("/login");
    });

    return () => unsubscribe();
  }, []);

  // search filter
  const filteredMatches = matches.filter((match) =>
    `${match.teamA} ${match.teamB}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  // sorting
  const sortedMatches = [...filteredMatches].sort((a, b) => {
    if (sortType === "team") {
      return a.teamA.localeCompare(b.teamA);
    }
    return b.id - a.id;
  });

  const liveMatches = sortedMatches.filter((m) => m.status === "LIVE");
  const pastMatches = sortedMatches.filter((m) => m.status !== "LIVE");

  return (
    <div className="min-h-screen bg-gray-100">

      {/* Header */}
      <div className="flex justify-between items-center p-6 bg-white shadow">
        <h1 className="text-2xl font-bold">Cricket Live Platform</h1>

        <div className="flex items-center gap-4">
          <p className="text-sm">
            {auth.currentUser?.displayName}
          </p>

          <button
            onClick={() => signOut(auth)}
            className="bg-red-500 text-white px-4 py-1 rounded"
          >
            Logout
          </button>
        </div>
      </div>

      <div className="p-6">

        {/* Search + Sort */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">

          <input
            type="text"
            placeholder="Search team..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border p-2 rounded w-full md:w-1/3"
          />

          <select
            value={sortType}
            onChange={(e) => setSortType(e.target.value)}
            className="border p-2 rounded w-full md:w-1/4"
          >
            <option value="latest">Latest</option>
            <option value="team">Team Name</option>
          </select>

        </div>

        {/* Live Matches */}
        <h2 className="text-xl font-semibold mb-4">Live Matches</h2>

        {liveMatches.length === 0 && (
          <p className="text-gray-500 mb-6">No live matches</p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {liveMatches.map((match) => (
            <MatchCard key={match.id} match={match} />
          ))}
        </div>

        {/* Past Matches */}
        <h2 className="text-xl font-semibold mb-4">Past Matches</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pastMatches.map((match) => (
            <MatchCard key={match.id} match={match} />
          ))}
        </div>

      </div>
    </div>
  );
}

export default Home;