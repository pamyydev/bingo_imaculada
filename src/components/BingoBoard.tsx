
import React from 'react';
import { Card } from '@/components/ui/card';

interface BingoBoardProps {
  onNumberDrawn: (number: number) => void;
  selectedNumbers: number[];
  onReset: () => void;
  onBingo: () => void;
}

const BingoBoard: React.FC<BingoBoardProps> = ({ 
  selectedNumbers
}) => {
  const allNumbers = Array.from({ length: 75 }, (_, i) => i + 1);
  
  const getBingoLetter = (number: number) => {
    if (number <= 15) return 'B';
    if (number <= 30) return 'I';
    if (number <= 45) return 'N';
    if (number <= 60) return 'G';
    return 'O';
  };
  
  return (
    <div className="mb-8">
      <Card className="p-6 backdrop-blur-md bg-white/80 border-paroquia-blue/30 shadow-lg">
        {/* Numbers grid */}
        <div className="grid grid-cols-15 gap-2 max-w-6xl mx-auto">
          {allNumbers.map(number => {
            const isSelected = selectedNumbers.includes(number);
            
            return (
              <div 
                key={number}
                id={`number-${number}`}
                className={`
                  w-12 h-12 md:w-14 md:h-14 flex items-center justify-center rounded-full text-lg md:text-xl font-semibold transition-all
                  ${isSelected 
                    ? 'bg-paroquia-blue text-white shadow-lg' 
                    : 'bg-white border-2 border-paroquia-blue/30 text-gray-700'}
                `}
              >
                <div className="flex flex-col items-center justify-center">
                  {isSelected && <span className="text-xs font-normal">{getBingoLetter(number)}</span>}
                  {number}
                </div>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
};

export default BingoBoard;
