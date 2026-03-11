import { useParams } from "react-router-dom";
import { matches } from "../data/matches";

function MatchPage() {
  const { id } = useParams();

  const match = matches.find((m) => m.id === Number(id));

  if (!match) return <p>Match not found</p>;

  return (
    <div className="p-6">

      <h1 className="text-2xl font-bold mb-4">
        {match.teamA} vs {match.teamB}
      </h1>

      {match.streamUrl && (
        <iframe
          width="100%"
          height="400"
          src={match.streamUrl}
          title="Live Stream"
          allowFullScreen
          className="rounded-xl mb-6"
        />
      )}

      <div className="bg-white p-4 rounded shadow">

        <h2 className="font-bold mb-2">Score</h2>

        <p>
          {match.runs}/{match.wickets} ({match.overs})
        </p>

      </div>

    </div>
  );
}

export default MatchPage;