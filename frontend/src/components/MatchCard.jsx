import { useNavigate } from "react-router-dom";

function MatchCard({ match }) {
  const navigate = useNavigate();

  return (
    <div className="bg-white shadow-md rounded-xl p-4 hover:shadow-lg transition">

      <h2 className="text-lg font-bold">
        {match.teamA} vs {match.teamB}
      </h2>

      <p className="text-gray-600 mt-2">
        {match.runs}/{match.wickets} ({match.overs})
      </p>

      <p className="text-sm text-red-500 mt-1">{match.status}</p>

      <div className="flex gap-3 mt-4">

        {match.streamUrl && (
          <button
            onClick={() => navigate(`/match/${match.id}`)}
            className="bg-red-500 text-white px-3 py-1 rounded"
          >
            Stream
          </button>
        )}

        <button
          onClick={() => navigate(`/match/${match.id}`)}
          className="bg-blue-500 text-white px-3 py-1 rounded"
        >
          Scorecard
        </button>

      </div>
    </div>
  );
}

export default MatchCard;