import React, { useState } from 'react';

const SolveIntegral = () => {
  const [userAnswer, setUserAnswer] = useState('');
  const [result, setResult] = useState('');

  const correctAnswer = '0'; // <-- you set what the correct answer is here!

  const handleSubmit = () => {
    if (userAnswer.trim() === correctAnswer) {
      setResult('✅ Correct!');
    } else {
      setResult('❌ Try again!');
    }
  };

  return (
    <div className="text-center p-4">
      <div className="text-2xl font-bold mb-4">
        Solve this integral
      </div>
      <img src="/skill_test.png" alt="Integral Time :)" className="mx-auto mb-4" />
      
      <input
        type="text"
        value={userAnswer}
        onChange={(e) => setUserAnswer(e.target.value)}
        placeholder="Enter your answer"
        className="border border-gray-300 rounded p-2 mb-4"
      />
      <br />

      <button
        onClick={handleSubmit}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Submit
      </button>

      {result && (
        <div className="mt-4 text-xl">
          {result}
        </div>
      )}
    </div>
  );
};

export default SolveIntegral;
