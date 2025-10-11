import React from "react";

function Timer({ timeLeft, progress, armProgress, id }: any) {
  return (
    <div>
      <svg
        className="group"
        width="16"
        height="16"
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          cx="50"
          cy="50"
          r="45"
          className="stroke-gray-400 dark:stroke-white"
          strokeWidth="10"
          fill="none"
        />
        <circle
          cx="50"
          cy="50"
          r="45"
          className="stroke-black dark:stroke-white"
          strokeWidth="10"
          fill="none"
          strokeDasharray="282.6"
          strokeDashoffset={progress}
          id={`progress-${id}`}
        />
        <line
          x1="50"
          y1="50"
          x2="50"
          y2="10"
          className="stroke-black dark:stroke-white"
          strokeWidth="2"
          id={`arm1-${id}`}
        />
        <line
          x1="50"
          y1="50"
          x2="50"
          y2="10"
          className="stroke-black dark:stroke-white"
          strokeWidth="2"
          id={`arm2-${id}`}
        />
        <circle cx="50" cy="50" r="3" className="fill-black dark:fill-white" />

        <style>
          {`
            @keyframes progress-animation-${id} {
              from { stroke-dashoffset: ${progress} }
              to { stroke-dashoffset: 0 }
            }
            @keyframes arm1-animation-${id} {
              from { transform: rotate(${armProgress}deg) }
              to { transform: rotate(360deg) }
            }
            @keyframes arm2-animation-${id} {
              from { transform: rotate(0deg) }
              to { transform: rotate(360deg) }
            }
            #progress-${id} {
              animation: progress-animation-${id} 86400000ms linear infinite;
              transform: rotate(-90deg);
              transform-origin: 50% 50%;
            }
            #arm1-${id} {
              animation: arm1-animation-${id} 86400000ms linear infinite;
              transform-origin: 50% 50%;
            }
          `}
        </style>
      </svg>

      <em className="tooltip-right tooltip invisible not-italic group-hover/tooltip:visible">
        {timeLeft > 24 ? getDaysAndHours(timeLeft) : getHours(timeLeft)}
      </em>
    </div>
  );
}

function getDaysAndHours(timeLeft: number): string {
  const days = Math.floor(timeLeft / 24);
  const hours = timeLeft % 24;
  return `${days} day${days === 1 ? '' : 's'} ${hours} hour${hours === 1 ? '' : 's'} remaining`;
}

function getHours(timeLeft: number): string {
  return `${timeLeft} hour${timeLeft === 1 ? '' : 's'} remaining`;
}

export default Timer;
