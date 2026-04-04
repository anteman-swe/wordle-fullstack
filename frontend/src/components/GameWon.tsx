import React, { useRef } from 'react';
import { Fireworks } from '@fireworks-js/react';

interface FyrverkeriModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const GameWon: React.FC<FyrverkeriModalProps> = ({ isOpen, onClose }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
      }}
    >
      <div
        ref={containerRef}
        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
      >
        <Fireworks
          options={{
            hue: {
              min: 0,
              max: 360,
            },
            rocketsPoint: {
              min: 0,
              max: 100,
            },
            mouse: {
              click: false,
              move: false,
              max: 1,
            },
            sound: {
              enabled: false
            },
            delay: {
              min: 15,
              max: 30,
            },
            brightness: {
              min: 50,
              max: 80,
            },
            decay: {
              min: 0.015,
              max: 0.03,
            },
            lineWidth: {
              explosion: {
                min: 1,
                max: 3,
              },
              trace: {
                min: 1,
                max: 2,
              },
            },
            lineStyle: 'round',
            explosion: 5,
            acceleration: 1.05,
            friction: 0.97,
            gravity: 1.5,
            particles: 90,
            traceLength: 3,
            flickering: 50,
            traceSpeed: 10,
            intensity: 30, 
          }}
          style={{
            top: '10%',
            left: '10%',
            width: '80%',
            height: '80%',
            position: 'absolute',
          }}
        />
      </div>
      <div
        style={{
          backgroundColor: 'white',
          padding: '2rem',
          borderRadius: '8px',
          textAlign: 'center',
          zIndex: 1001,
        }}
      >
        <h2 style={{color: 'darkgray'}}>Grattis! du hittade ordet! 🎉</h2>
        {/* TOD0: Om det är highscore ska namnet kunna läggas till highscore-listan*/}
        <button
          onClick={onClose}
          style={{
            marginTop: '1rem',
            padding: '0.5rem 1rem',
            backgroundColor: '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Starta om
        </button>
      </div>
    </div>
  );
};

export default GameWon;