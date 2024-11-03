import React from 'react';
import Game from './components/Game';

function App() {
  return (
    <div className="min-h-screen bg-gray-800 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl aspect-video bg-gray-900 rounded-lg shadow-2xl overflow-hidden">
        <Game />
      </div>
    </div>
  );
}

export default App;