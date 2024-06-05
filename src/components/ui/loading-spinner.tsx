import React from 'react';
import { useTheme } from 'next-themes';

const LoadingSpinner: React.FC = () => {
  const { theme } = useTheme();

  const spinnerStyle: React.CSSProperties = {
    display: 'inline-block',
    width: '80px',
    height: '80px',
    border: '8px solid rgba(0, 0, 0, 0.1)',
    borderRadius: '50%',
    borderTopColor: theme === 'dark' ? '#ff6c2c' : '#000',
    animation: 'spin 1s linear infinite',
  };

  const containerStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '20vh',
  };

  return (
    <div style={containerStyle}>
      <div style={spinnerStyle}></div>
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
};

export default LoadingSpinner;
