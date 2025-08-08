import React, { useState } from "react";

function App() {
  const [topic, setTopic] = useState("");
  const [numQuestions, setNumQuestions] = useState(1);
  const [loading, setLoading] = useState(false);
  const [quiz, setQuiz] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const response = await fetch("https://kindlearn-api.onrender.com/generate-quiz", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ topic, num_questions: numQuestions }),
    });

    const data = await response.json();
    setQuiz(data.quiz || "Failed to generate quiz.");
    setLoading(false);
  };

  return (
    <div className="h-screen bg-gradient-to-br from-green-100 to-blue-100 text-gray-800 p-4 font-sans">
      <div className="max-w-md mx-auto mt-20 bg-white p-6 rounded-xl shadow-lg">
        <h1 className="text-2xl font-bold text-center mb-4">KindLearn™</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Enter topic"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className="w-full px-4 py-2 border rounded"
          />
          <input
            type="number"
            placeholder="Number of questions"
            value={numQuestions}
            onChange={(e) => setNumQuestions(e.target.value)}
            className="w-full px-4 py-2 border rounded"
          />
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded"
          >
            {loading ? "Loading..." : "Generate Quiz"}
          </button>
        </form>
        {quiz && <div className="mt-4 whitespace-pre-wrap">{quiz}</div>}
      </div>
    </div>
  );
}

export default App;
