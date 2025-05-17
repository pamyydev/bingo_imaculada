
import React, { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { createFireworks } from '@/lib/animations';
import { ArrowLeft } from 'lucide-react';

interface BingoCelebrationProps {
  onReturn: () => void;
}

const BingoCelebration: React.FC<BingoCelebrationProps> = ({ onReturn }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Create fireworks on mount
    const interval = setInterval(() => {
      createFireworks();
    }, 800);
    
    // Initial fireworks burst
    for (let i = 0; i < 3; i++) {
      setTimeout(() => createFireworks(), i * 300);
    }
    
    // Play celebration sound
    audioRef.current = new Audio('https://assets.mixkit.co/active_storage/sfx/2413/2413-preview.mp3');
    audioRef.current.volume = 0.6;
    audioRef.current.play().catch(e => console.log('Auto-play prevented:', e));
    
    // Clean up
    return () => {
      clearInterval(interval);
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-paroquia-softBlue overflow-hidden">
      <div className="absolute inset-0 overflow-hidden z-0"></div>
      
      <div className="relative z-10 flex flex-col items-center">
        {/* Large BINGO text with animation */}
        <h1 className="text-9xl md:text-[180px] font-bold font-merriweather text-paroquia-gold mb-8 animate-pulse">
          BINGO!
        </h1>
        
        {/* Success message */}
        <p className="text-4xl md:text-6xl text-paroquia-blue font-merriweather mb-12 animate-fade-in">
          Temos um ganhador!
        </p>
        
        {/* Return button */}
        <Button
          onClick={onReturn}
          className="mt-12 bg-paroquia-blue/90 hover:bg-paroquia-blue text-white px-8 py-4 h-auto rounded-full text-2xl"
        >
          <ArrowLeft className="mr-2" size={28} />
          Voltar ao Jogo
        </Button>
      </div>
    </div>
  );
};

export default BingoCelebration;
