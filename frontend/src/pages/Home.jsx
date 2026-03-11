import MatchCard from "../components/MatchCard";
import { matches } from "../data/matches";

function Home() {
  return (
    <div className="p-6">

      <h1 className="text-2xl font-bold mb-6">
        Live Matches
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

        {matches.map((match) => (
          <MatchCard key={match.id} match={match} />
        ))}

      </div>

    </div>
  );
}

export default Home;
