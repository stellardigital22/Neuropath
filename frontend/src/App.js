
import React, { useState } from 'react';
import './index.css';

function App() {
  const [topic, setTopic] = useState('');
  const [grade, setGrade] = useState('');
  const [quiz, setQuiz] = useState('');
  const [loading, setLoading] = useState(false);

  const generateQuiz = async () => {
    setLoading(true);
    const response = await fetch('https://kindlearn-api.onrender.com/generate-quiz', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ topic, grade_level: grade })
    });
    const data = await response.json();
    setQuiz(data.quiz);
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 to-blue-100 text-gray-800 p-4 font-sans">
      <div className="max-w-xl mx-auto bg-white shadow-xl rounded-2xl p-6 mt-10">
        <h1 className="text-3xl font-bold text-center mb-6">KindLearn™</h1>
        <input placeholder="Topic" className="w-full p-2 border mb-4 rounded" value={topic} onChange={e => setTopic(e.target.value)} />
        <input placeholder="Grade Level" className="w-full p-2 border mb-4 rounded" value={grade} onChange={e => setGrade(e.target.value)} />
        <button className="w-full py-2 px-4 bg-blue-500 text-white rounded" onClick={generateQuiz}>
          {loading ? 'Loading...' : 'Generate Quiz'}
        </button>
        {quiz && <pre className="mt-6 whitespace-pre-wrap bg-gray-50 p-4 rounded">{quiz}</pre>}
      </div>
    </div>
  );
}

export default App;
