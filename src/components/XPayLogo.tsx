import React from 'react';

interface XPayLogoProps {
  className?: string;
  size?: number;
  showWordmark?: boolean;
}

export const XPayLogo: React.FC<XPayLogoProps> = ({
  className = '',
  size = 40,
  showWordmark = false,
}) => {
  return (
    <div className={`inline-flex items-center gap-2.5 ${className}`}>
      {/* 
        XPAY Intertwined 'X' and 'P' Vector Emblem
        Faithfully recreating the official uploaded logo:
        - Blue-cyan diagonal left leg of X
        - Flowing cyan-to-lime-green crossing ribbon that loops into the 'P'
      */}
      <svg
        width={size}
        height={size}
        viewBox="0 0 500 500"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0 drop-shadow-[0_4px_16px_rgba(6,182,212,0.35)]"
      >
        <defs>
          {/* Left diagonal leg gradient (Royal Blue) */}
          <linearGradient id="xLeftGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0066FF" />
            <stop offset="50%" stopColor="#0052D4" />
            <stop offset="100%" stopColor="#0038A8" />
          </linearGradient>

          {/* Upward diagonal band (Blue to Bright Cyan) */}
          <linearGradient id="bandGrad1" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#0055FF" />
            <stop offset="35%" stopColor="#0099FF" />
            <stop offset="70%" stopColor="#00D2FF" />
            <stop offset="100%" stopColor="#00E5C8" />
          </linearGradient>

          {/* Loop of P (Cyan to Lime Green) */}
          <linearGradient id="pLoopGrad" x1="0%" y1="0%" x2="100%" y2="50%">
            <stop offset="0%" stopColor="#00D4FF" />
            <stop offset="40%" stopColor="#00E5A3" />
            <stop offset="75%" stopColor="#22C55E" />
            <stop offset="100%" stopColor="#84CC16" />
          </linearGradient>

          {/* Inner shade for fold depth */}
          <linearGradient id="shadeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0072B5" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#002D62" stopOpacity="0.3" />
          </linearGradient>

          {/* Bottom right tail of X */}
          <linearGradient id="tailGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#009999" />
            <stop offset="50%" stopColor="#10B981" />
            <stop offset="100%" stopColor="#84CC16" />
          </linearGradient>
        </defs>

        {/* 1. Upper Left Arm of X */}
        <path
          d="M 30 50 L 140 50 L 220 180 L 145 255 L 30 50 Z"
          fill="url(#xLeftGrad)"
        />

        {/* 2. Lower Left Leg of X */}
        <path
          d="M 145 255 L 225 330 L 140 460 L 30 460 L 145 255 Z"
          fill="url(#xLeftGrad)"
        />

        {/* 3. Lower Right Tail of X (Meeting green loop) */}
        <path
          d="M 230 255 L 320 380 L 320 460 L 230 460 L 180 370 L 230 255 Z"
          fill="url(#tailGrad)"
        />

        {/* 4. Main Crossing Ribbon from bottom-left up to P loop */}
        <path
          d="M 115 460 L 50 370 L 235 150 C 275 100 330 60 405 60 C 465 60 485 105 485 160 C 485 240 405 285 320 285 L 260 285 C 275 255 310 240 350 240 C 400 240 435 210 435 165 C 435 125 405 105 365 105 C 315 105 270 140 230 195 L 115 460 Z"
          fill="url(#bandGrad1)"
        />

        {/* 5. The Top Loop of P with Lime-Green Blend */}
        <path
          d="M 205 180 C 255 105 315 55 400 55 C 465 55 485 105 485 160 C 485 240 410 285 320 285 L 270 285 C 310 250 350 240 385 240 C 425 240 445 205 445 165 C 445 125 415 105 375 105 C 325 105 275 145 235 205 L 205 180 Z"
          fill="url(#pLoopGrad)"
        />

        {/* 6. Realistic 3D overlapping shadow at the intersection */}
        <path
          d="M 180 220 L 245 285 L 210 320 L 165 245 Z"
          fill="url(#shadeGrad)"
          opacity="0.65"
        />
      </svg>

      {showWordmark && (
        <div className="flex flex-col">
          <span className="font-extrabold tracking-wider text-white text-lg font-mono leading-none">
            XPAY
          </span>
          <span className="text-[9px] uppercase tracking-widest text-cyan-400 font-semibold mt-0.5">
            Finance & Business
          </span>
        </div>
      )}
    </div>
  );
};
