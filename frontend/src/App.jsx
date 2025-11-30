import { useState, useEffect } from "react";

function App() {
  const [text, setText] = useState("");
  const [versions, setVersions] = useState([]);
  const [showHistory, setShowHistory] = useState(false);

  const fetchHistory = async () => {
    const res = await fetch("https://mini-audit-trail-generator-1.onrender.com/api/data");
    const data = await res.json();
    setVersions(data);
  };

  const handleSave = async () => {
    await fetch("https://mini-audit-trail-generator-1.onrender.com/api/data", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    });

    fetchHistory();
    alert("Version saved successfully!");
  };

  const handleHistory = () => {
    setShowHistory(!showHistory);
    if (!showHistory) fetchHistory();
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">
        Mini Audit Trail Generator
      </h1>

      <textarea
        placeholder="Write something..."
        className="w-full h-40 border border-gray-400 rounded-lg p-3 text-lg focus:ring-2 focus:ring-blue-500 outline-none"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <div className="flex gap-4 justify-center mt-4">
        <button
          onClick={handleSave}
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-semibold"
        >
          Save
        </button>

        <button
          onClick={handleHistory}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold"
        >
          History
        </button>
      </div>

      {showHistory && (
        <div className="mt-8 p-5 border-t border-gray-300">
          <h2 className="text-2xl font-bold mb-4">Version History</h2>

          {versions.length === 0 && (
            <p className="text-gray-600">No history yet</p>
          )}

          {versions.map((v) => (
            <div
              key={v._id}
              className="bg-gray-100 p-4 rounded-lg mb-3 shadow-sm border-l-4 border-blue-600"
            >
              <p><span className="font-semibold">Time:</span> {new Date(v.createdAt).toLocaleString()}</p>
              <p><span className="font-semibold">Added:</span> {v.addedWords?.join(", ") || "-"}</p>
              <p><span className="font-semibold">Removed:</span> {v.removedWords?.join(", ") ||
              <p className="text-red-600 font-bold text-sm"> Not Found</p> }</p>
              <p>
                <span className="font-semibold">Old:</span> {v.oldLength} |
                <span className="font-semibold ml-2">New:</span> {v.newLength}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
