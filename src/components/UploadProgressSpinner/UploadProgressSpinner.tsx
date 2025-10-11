import React, { useEffect, useState } from 'react';

interface UploadProgressSpinnerProps {
  size?: string;
  color?: string;
  isUploading?: boolean;
  uploadProgress?: number;
}

const UploadProgressSpinner: React.FC<UploadProgressSpinnerProps> = ({ 
  size = "h-5 w-5",
  color = "text-blue-500",
  isUploading = true,
  uploadProgress
}) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!isUploading) {
      setProgress(100);
      return;
    }

    if (uploadProgress !== undefined) {
      setProgress(uploadProgress);
      return;
    }

    setProgress(0);
    const startTime = Date.now();
    const duration = 4000;
    
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progressPercent = Math.min((elapsed / duration) * 100, 90);
      setProgress(progressPercent);
    }, 50);

    return () => clearInterval(interval);
  }, [isUploading, uploadProgress]);

  return (
    <div className={`relative ${size}`}>
      <svg className={`${size} ${color}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle 
          className="opacity-25" 
          cx="12" 
          cy="12" 
          r="10" 
          stroke="currentColor" 
          strokeWidth="4"
        />
      </svg>
      
      <svg className={`absolute top-0 left-0 ${size} ${color}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray={`${2 * Math.PI * 10}`}
          strokeDashoffset={`${2 * Math.PI * 10 * (1 - progress / 100)}`}
          className="opacity-75 transition-all duration-100 ease-out"
          style={{
            transform: 'rotate(-90deg)',
            transformOrigin: 'center'
          }}
        />
      </svg>
    </div>
  );
};

export default UploadProgressSpinner;
