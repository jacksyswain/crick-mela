import { useParams, useNavigate } from "react-router-dom";
import { matches } from "../data/matches";

function MatchPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const match = matches.find((m) => m.id === Number(id));

  if (!match) {
    return (
      <div className="p-6">
        <p className="text-red-500">Match not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      {/* Back Button */}
      <button
        onClick={() => navigate("/")}
        className="mb-4 bg-gray-200 px-4 py-1 rounded hover:bg-gray-300"
      >
        ← Back
      </button>

      {/* Match Header */}
      <div className="bg-white p-6 rounded-xl shadow mb-6">

        <div className="flex justify-between items-center">

          <h1 className="text-2xl font-bold">
            {match.teamA} vs {match.teamB}
          </h1>

          <span
            className={`px-3 py-1 rounded text-sm text-white ${
              match.status === "LIVE"
                ? "bg-red-500"
                : "bg-gray-500"
            }`}
          >
            {match.status}
          </span>

        </div>

        <p className="text-lg mt-3">
          {match.runs}/{match.wickets} ({match.overs})
        </p>

      </div>

      {/* Video Player */}
      {match.streamUrl && (
        <div className="bg-black rounded-xl overflow-hidden mb-6">

          <iframe
            width="100%"
            height="420"
            src={match.streamUrl}
            title="Live Stream"
            allowFullScreen
          />

        </div>
      )}

      {/* Scorecard Section */}
      <div className="grid md:grid-cols-2 gap-6">

        {/* Batsmen */}
        <div className="bg-white rounded-xl shadow p-4">

          <h2 className="font-bold mb-4 text-lg">Batsmen</h2>

          <table className="w-full text-left">

            <thead className="border-b">
              <tr>
                <th>Name</th>
                <th>R</th>
                <th>B</th>
                <th>4s</th>
                <th>6s</th>
              </tr>
            </thead>

            <tbody>

              {(match.batsmen || []).map((player, index) => (
                <tr key={index} className="border-b">

                  <td className="py-2">{player.name}</td>
                  <td>{player.runs}</td>
                  <td>{player.balls}</td>
                  <td>{player.fours}</td>
                  <td>{player.sixes}</td>

                </tr>
              ))}

            </tbody>

          </table>

        </div>

        {/* Bowlers */}
        <div className="bg-white rounded-xl shadow p-4">

          <h2 className="font-bold mb-4 text-lg">Bowlers</h2>

          <table className="w-full text-left">

            <thead className="border-b">
              <tr>
                <th>Name</th>
                <th>O</th>
                <th>R</th>
                <th>W</th>
              </tr>
            </thead>

            <tbody>

              {(match.bowlers || []).map((bowler, index) => (
                <tr key={index} className="border-b">

                  <td className="py-2">{bowler.name}</td>
                  <td>{bowler.overs}</td>
                  <td>{bowler.runs}</td>
                  <td>{bowler.wickets}</td>

                </tr>
              ))}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}

export default MatchPage;