import { useNavigate } from "react-router-dom";

function MatchCard({ match }) {
  const navigate = useNavigate();

  const isLive = match.status === "LIVE";

  return (
    <div className="bg-white rounded-xl shadow-md p-5 hover:shadow-xl transition duration-300 flex flex-col justify-between">

      {/* Match Header */}
      <div className="flex justify-between items-center">

        <h2 className="text-lg font-bold">
          {match.teamA} vs {match.teamB}
        </h2>

        <span
          className={`text-xs px-2 py-1 rounded text-white ${
            isLive ? "bg-red-500" : "bg-gray-500"
          }`}
        >
          {match.status}
        </span>

      </div>

      {/* Venue + Date */}
      <p className="text-sm text-gray-500 mt-1">
        {match.venue}
      </p>

      <p className="text-xs text-gray-400">
        {match.date}
      </p>

      {/* Score */}
      <div className="mt-3">

        <p className="text-xl font-semibold">
          {match.runs}/{match.wickets}
        </p>

        <p className="text-sm text-gray-600">
          Overs: {match.overs}
        </p>

      </div>

      {/* Result if completed */}
      {match.status !== "LIVE" && match.result && (
        <p className="text-sm text-green-600 mt-2">
          {match.result}
        </p>
      )}

      <div className="flex gap-3 mt-4">

        {match.streamUrl && (
          <button
            onClick={() => navigate(`/match/${match.id}`)}
            className="flex-1 bg-red-500 hover:bg-red-600 text-white py-1 rounded"
          >
            Watch
          </button>
        )}

        <button
          onClick={() => navigate(`/match/${match.id}`)}
          className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-1 rounded"
        >
          Scorecard
        </button>

      </div>

    </div>
  );
}

export default MatchCard;