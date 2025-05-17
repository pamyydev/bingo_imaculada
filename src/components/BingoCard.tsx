
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { CircleDot } from 'lucide-react';
import { createFireworks } from '@/lib/animations';

interface BingoCardProps {
  cardId: number;
  selectedNumbers: number[];
  onBingo: () => void;
}

const BingoCard: React.FC<BingoCardProps> = ({ cardId, selectedNumbers, onBingo }) => {
  const { toast } = useToast();
  const [card, setCard] = useState<number[][]>([]);
  const [selected, setSelected] = useState<boolean[][]>(Array(5).fill(Array(5).fill(false)));
  const [bingoAchieved, setBingoAchieved] = useState(false);

  useEffect(() => {
    generateCard();
  }, []);

  useEffect(() => {
    // Check if drawn numbers are on the card
    if (card.length > 0 && selectedNumbers.length > 0) {
      const newSelected = [...selected]; 
      
      // Deep copy the 2D array
      const deepCopySelected = selected.map(row => [...row]);
      
      for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 5; j++) {
          if (i === 2 && j === 2) { 
            // Free space in the middle
            deepCopySelected[i][j] = true;
          } else if (selectedNumbers.includes(card[i][j])) {
            deepCopySelected[i][j] = true;
          }
        }
      }
      
      setSelected(deepCopySelected);
    }
  }, [selectedNumbers, card]);

  useEffect(() => {
    if (checkBingo()) {
      if (!bingoAchieved) {
        setBingoAchieved(true);
      }
    }
  }, [selected]);

  const generateCard = () => {
    // Generate columns B (1-15), I (16-30), N (31-45), G (46-60), O (61-75)
    const columns = Array(5).fill(0).map((_, colIndex) => {
      const min = colIndex * 15 + 1;
      const max = min + 14;
      
      // Get 5 unique random numbers for each column
      return getRandomNumbers(min, max, 5);
    });

    // Create a 5x5 grid
    const newCard = Array(5).fill(0).map((_, rowIndex) => {
      return Array(5).fill(0).map((_, colIndex) => {
        // Free space in the middle
        if (rowIndex === 2 && colIndex === 2) return 0;
        return columns[colIndex][rowIndex];
      });
    });
    
    setCard(newCard);
  };

  const getRandomNumbers = (min: number, max: number, count: number) => {
    const numbers = new Set<number>();
    while (numbers.size < count) {
      numbers.add(Math.floor(Math.random() * (max - min + 1)) + min);
    }
    return Array.from(numbers);
  };

  const checkBingo = () => {
    // Check rows
    for (let i = 0; i < 5; i++) {
      if (selected[i].every(cell => cell)) return true;
    }

    // Check columns
    for (let j = 0; j < 5; j++) {
      if (selected.every(row => row[j])) return true;
    }

    // Check diagonals
    if (selected[0][0] && selected[1][1] && selected[2][2] && selected[3][3] && selected[4][4]) return true;
    if (selected[0][4] && selected[1][3] && selected[2][2] && selected[3][1] && selected[4][0]) return true;

    return false;
  };

  const handleBingo = () => {
    if (bingoAchieved) {
      onBingo();
      createFireworks();
      toast({
        title: "BINGO!",
        description: `Parabéns! Você completou o Cartão #${cardId}`,
      });
    } else {
      toast({
        title: "Ainda não!",
        description: "Continue marcando os números sorteados.",
        variant: "destructive",
      });
    }
  };

  const getBingoLetters = () => {
    return ['B', 'I', 'N', 'G', 'O'];
  };

  return (
    <div className="bingo-card p-4 rounded-lg mb-8 transform transition-all duration-300 hover:scale-105">
      <div className="text-center mb-4">
        <h3 className="font-merriweather text-xl text-paroquia-blue font-bold">Cartão #{cardId}</h3>
      </div>
      
      <div className="flex justify-center mb-2">
        {getBingoLetters().map((letter, index) => (
          <div 
            key={index} 
            className="w-12 h-12 flex items-center justify-center font-merriweather font-bold text-2xl text-paroquia-blue"
          >
            {letter}
          </div>
        ))}
      </div>
      
      <div className="grid grid-cols-5 gap-1">
        {card.map((row, rowIndex) => (
          row.map((num, colIndex) => (
            <div 
              key={`${rowIndex}-${colIndex}`}
              className={`
                number-ball w-12 h-12 flex items-center justify-center rounded-full 
                font-opensans text-lg border-2 font-semibold
                ${selected[rowIndex][colIndex] ? 'selected' : 'bg-white border-paroquia-lightBlue'}
                ${rowIndex === 2 && colIndex === 2 ? 'bg-paroquia-gold/20 border-paroquia-gold/50' : ''}
              `}
            >
              {rowIndex === 2 && colIndex === 2 ? (
                <CircleDot className="w-8 h-8 text-paroquia-gold" />
              ) : (
                num
              )}
            </div>
          ))
        ))}
      </div>
      
      <div className="mt-6 flex justify-center">
        <Button 
          onClick={handleBingo} 
          className={`
            bg-paroquia-blue hover:bg-paroquia-blue/80 text-white font-merriweather font-bold px-8 py-2 rounded-full
            transition-all duration-300 transform hover:scale-105
            ${bingoAchieved ? 'bingo-button-glow animate-button-pulse' : ''}
          `}
        >
          BINGO!
        </Button>
      </div>
    </div>
  );
};

export default BingoCard;
