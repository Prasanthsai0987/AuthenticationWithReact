import React from 'react';
import confetti from 'canvas-confetti';

const Dashboard = () => {
  const handleCelebrate = () => {
    const count = 200;
    const defaults = {
      origin: { y: 0.7 }
    };

    function fire(particleRatio, opts) {
      confetti(Object.assign({}, defaults, opts, {
        particleCount: Math.floor(count * particleRatio)
      }));
    }

    fire(0.25, {
      spread: 26,
      startVelocity: 55
    });
    fire(0.2, {
      spread: 60
    });
    fire(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      scalar: 1.2
    });
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Dashboard</h1>
      <p>Welcome to the dashboard!</p>

      <div className="confetti-container" style={{ marginTop: '20px' }}>
        <button onClick={handleCelebrate}>
          Celebrate! 🎉
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
