import React, { useState, useEffect } from 'react';
import BingoBoard from '@/components/BingoBoard';
import BingoCelebration from '@/components/BingoCelebration';
import { Button } from '@/components/ui/button';
import { RefreshCw, Flag, Dices } from 'lucide-react';
import NotasBlocoMini from "@/components/NotasBlocoMini";

const Index = () => {
  const [selectedNumbers, setSelectedNumbers] = useState<number[]>([]);
  const [showCelebration, setShowCelebration] = useState(false);
  const [isDrawing, setIsDrawing] = useState(false);
  const [currentNumber, setCurrentNumber] = useState<number | null>(null);

  useEffect(() => {
    // Remove floating elements and sparkles if they exist
    document.querySelectorAll('.floating-star, .sparkle, .confetti, .firework').forEach(el => el.remove());

    // Update title
    document.title = "Bingo Paroquial";
    
    // Preload sound effects
    const drawSound = new Audio('https://assets.mixkit.co/active_storage/sfx/2073/2073-preview.mp3');
    const resetSound = new Audio('https://assets.mixkit.co/active_storage/sfx/220/220-preview.mp3');
    
    drawSound.load();
    resetSound.load();
  }, []);

  const drawNumber = () => {
    if (selectedNumbers.length >= 76 || isDrawing) return;
    
    // Play draw sound
    const drawSound = new Audio('https://assets.mixkit.co/active_storage/sfx/2073/2073-preview.mp3');
    drawSound.volume = 0.4;
    drawSound.play().catch(e => console.log('Auto-play prevented:', e));
    
    // Find available numbers
    const allNumbers = Array.from({ length: 75 }, (_, i) => i + 1);
    const availableNumbers = allNumbers.filter(num => !selectedNumbers.includes(num));
    
    // Draw a random number
    const randomIndex = Math.floor(Math.random() * availableNumbers.length);
    const newNumber = availableNumbers[randomIndex];
    
    // Start animation
    setIsDrawing(true);
    setCurrentNumber(newNumber);
    
    // After animation completes, add to selected numbers
    setTimeout(() => {
      setSelectedNumbers([...selectedNumbers, newNumber]);
      setIsDrawing(false);
    }, 2000);
  };

  const handleBingo = () => {
    // Play bingo sound
    const bingoSound = new Audio('https://assets.mixkit.co/active_storage/sfx/583/583-preview.mp3');
    bingoSound.volume = 0.5;
    bingoSound.play().catch(e => console.log('Auto-play prevented:', e));
    
    // Show celebration
    setShowCelebration(true);
  };

  const handleReset = () => {
    // Play reset sound
    const resetSound = new Audio('https://assets.mixkit.co/active_storage/sfx/220/220-preview.mp3');
    resetSound.volume = 0.3;
    resetSound.play().catch(e => console.log('Auto-play prevented:', e));
    
    setSelectedNumbers([]);
    setCurrentNumber(null);
  };

  const handleReturnFromCelebration = () => {
    setShowCelebration(false);
  };

  // If celebration is active, show the celebration screen
  if (showCelebration) {
    return <BingoCelebration onReturn={handleReturnFromCelebration} />;
  }

  return (
    <>
      <NotasBlocoMini />
      <div className="min-h-screen py-6 px-4 relative overflow-hidden bg-paroquia-softBlue">
        {/* Logo at the top */}
        <div className="flex flex-col items-center justify-center mb-6">
          <div className="flex items-center mb-4">
            <img 
              src="/paroquia.png" 
              alt="Paróquia Imaculada Conceição" 
              className="h-24 md:h-32 lg:h-36"
            />
          </div>
          <h1 className="text-5xl md:text-7xl font-bold font-merriweather text-paroquia-blue text-center">
            Bingo Paroquial
          </h1>
        </div>

        {/* Main content area */}
        <div className="container mx-auto max-w-9xl">
          {/* Current number display - large and centered */}
          <div className="flex justify-center my-9">
            <div className={`
              w-60 h-60 md:w-80 md:h-80 rounded-full flex items-center justify-center text-8xl md:text-9xl font-bold 
              shadow-lg transition-all duration-500 transform
              ${isDrawing ? 'animate-spin-slow bg-paroquia-gold text-white' : 'bg-white text-paroquia-blue border-8 border-paroquia-blue'}
            `}>
              {currentNumber ? (
                <>
                  <span className="text-2xl md:text-3xl absolute top-9 md:top-10">
                    {currentNumber <= 15 ? 'B' : 
                     currentNumber <= 30 ? 'I' : 
                     currentNumber <= 45 ? 'N' : 
                     currentNumber <= 60 ? 'G' : 'O'}
                  </span>
                  {currentNumber}
                </>
              ) : '?'}
            </div>
          </div>

          {/* Numbers grid */}
          <div className="bg-white/80 backdrop-blur-md rounded-lg p-6 shadow-lg border border-paroquia-blue/12 mb-10 flex items-stretch">
            {/* Letras BINGO na vertical */}
            <div className="flex flex-col justify-center items-center mr-5 select-none">
              {['B', 'I', 'N', 'G', 'O'].map((letra, idx) => (
                <span
                  key={letra}
                  className="text-paroquia-blue font-merriweather font-bold text-2xl md:text-4xl lg:text-4xl"
                  style={{
                    height: '58.5px',
                    display: 'flex',
                    alignItems: 'center',
                    marginBottom: idx !== 3.6 ? '9.6px' : 0
                  }}
                >
                  {letra}
                </span>
              ))}
            </div>
            {/* Tabela de números */}
            <div className="grid grid-cols-15 gap-2 md:gap-3 flex-1 items-center content-center">
              {Array.from({ length: 75 }, (_, i) => i + 1).map(number => {
                const isSelected = selectedNumbers.includes(number);
                const isCurrentNumber = number === currentNumber;
                
                return (
                  <div 
                    key={number}
                    id={`number-${number}`}
                    className={`
                      w-10 h-10 md:w-14 md:h-14 flex items-center justify-center rounded-full text-lg md:text-xl font-semibold transition-all
                      ${isSelected 
                        ? 'bg-paroquia-blue text-white shadow-md' 
                        : 'bg-white border-2 border-paroquia-blue/30 text-gray-700'}
                      ${isCurrentNumber ? 'ring-4 ring-paroquia-gold scale-110' : ''}
                    `}
                  >
                    {number}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Action buttons - discreet but functional */}
          <div className="flex justify-center gap-8 mt-8">
            <Button 
              variant="outline" 
              className="border-2 border-paroquia-blue/30 hover:bg-paroquia-blue/10 rounded-full p-5" 
              onClick={handleReset}
              title="Reiniciar"
            >
              <RefreshCw size={32} className="text-paroquia-blue" />
              <span className="sr-only">Reiniciar</span>
            </Button>
            
            <Button 
              onClick={drawNumber} 
              disabled={isDrawing || selectedNumbers.length >= 75}
              className="bg-paroquia-blue hover:bg-paroquia-blue/80 rounded-full p-5 text-white shadow-md"
              title="Sortear Número"
            >
              <Dices size={32} />
              <span className="sr-only">Sortear</span>
            </Button>
            
            <Button 
              variant="outline"
              className="border-2 border-paroquia-gold/50 hover:bg-paroquia-gold/10 rounded-full p-5"
              onClick={handleBingo}
              title="Bingo!"
            >
              <Flag size={32} className="text-paroquia-gold" />
              <span className="sr-only">Bingo!</span>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Index;
