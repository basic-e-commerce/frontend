import { useState, useEffect } from "react";
import "./LoadingBar.scss";

const LoadingBar = ({ isLoading, duration = 3000 }) => {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isLoading) {
      setIsVisible(true);
      setProgress(0);

      // YouTube tarzı loading animasyonu
      const interval = setInterval(() => {
        setProgress((prevProgress) => {
          if (prevProgress >= 90) {
            clearInterval(interval);
            return 90; // %90'da durur, işlem bitince %100'e gider
          }
          return prevProgress + Math.random() * 15; // Rastgele artış
        });
      }, 200);

      return () => clearInterval(interval);
    } else {
      // Loading bittiğinde %100'e tamamla
      setProgress(100);
      setTimeout(() => {
        setIsVisible(false);
        setProgress(0);
      }, 300);
    }
  }, [isLoading]);

  if (!isVisible) return null;

  return (
    <div className="loading-bar-container">
      <div className="loading-bar" style={{ width: `${progress}%` }} />
    </div>
  );
};

export default LoadingBar;
