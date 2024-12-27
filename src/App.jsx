import React, { useState, useEffect } from 'react';
import { shuffle } from 'lodash';

const App = () => {
  const leo = '../src/assets/Lionel Messi - FootyRenders.png';
  const ronaldinho = '../src/assets/Ronaldinho Ballon D’Or 2005 - FootyRenders.png';
  const salah = '../src/assets/Mohamed Salah - FootyRenders.png';
  const neymo = '../src/assets/Neymar - FootyRenders.png';
  const yamal = '../src/assets/Lamine Yamal - FootyRenders.png';

  const data = [
    { id: 1, name: 'leo', src: leo },
    { id: 2, name: 'ronaldinho', src: ronaldinho },
    { id: 3, name: 'salah', src: salah },
    { id: 4, name: 'neymo', src: neymo },
    { id: 5, name: 'yamal', src: yamal }
  ];

  const shuffledData = shuffle([...data, ...data]);

  const [flippedIndices, setFlippedIndices] = useState([]);
  const [matchedIndices, setMatchedIndices] = useState([]);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    // Check if all pairs are matched
    if (matchedIndices.length === data.length) {
      setGameOver(true);
    }
  }, [matchedIndices]);

  const handleCardClick = (index) => {
    if (flippedIndices.length === 2 || flippedIndices.includes(index) || matchedIndices.includes(index)) return;

    const newFlippedIndices = [...flippedIndices, index];
    setFlippedIndices(newFlippedIndices);

    if (newFlippedIndices.length === 2) {
      const [firstIndex, secondIndex] = newFlippedIndices;
      if (shuffledData[firstIndex].name === shuffledData[secondIndex].name) {
        setMatchedIndices((prev) => [...prev, firstIndex, secondIndex]);
        setFlippedIndices([]);
      } else {
        setTimeout(() => setFlippedIndices([]), 1000); // Hide unmatched cards after 1 second
      }
    }
  };

  return (
    <div className="p-3 max-w-[550px] mx-auto shadow-md">
      <h1 className="text-center text-2xl font-semibold mb-4">Football Stars</h1>
      {gameOver && <div className="text-center text-lg font-bold text-green-600 mb-4">Congratulations, you won!</div>}
      <div className="grid grid-cols-3 gap-3">
        {shuffledData.map((player, idx) => {
          const isFlipped = flippedIndices.includes(idx);
          const isMatched = matchedIndices.includes(idx);

          return (
            <div
              key={idx}
              className={`bg-gray-200 w-full h-full p-4 rounded-md shadow-md cursor-pointer hover:bg-gray-400 transition-all duration-300 ease-in-out transform hover:scale-105 ${
                isFlipped || isMatched ? 'bg-gray-300' : 'bg-gray-200'
              }`}
              onClick={() => handleCardClick(idx)}
            >
              <div className="w-full h-32 flex items-center justify-center bg-gray-300 rounded-lg">
                {isFlipped || isMatched ? (
                  <img
                    src={player.src}
                    alt={player.name}
                    className="w-24 h-24 object-contain transition-all duration-300 ease-in-out transform hover:scale-110"
                  />
                ) : (
                  <div className="w-24 h-24 bg-gray-500 rounded-lg" />
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default App;
