interface LogoProps {
  size?: number;
  className?: string;
}

export const Logo = ({ size = 32, className }: LogoProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id="logoGradient" x1="16" y1="0" x2="16" y2="32" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#007AFF" />
          <stop offset="100%" stopColor="#0051D5" />
        </linearGradient>
      </defs>
      
      {/* Simple macOS-style logo */}
      <rect
        x="4"
        y="4"
        width="24"
        height="24"
        rx="6"
        fill="url(#logoGradient)"
      />
      
      {/* Inner highlight */}
      <rect
        x="4"
        y="4"
        width="24"
        height="8"
        rx="6"
        fill="#FFFFFF"
        opacity="0.2"
      />
      
      {/* Logo text or symbol */}
      <circle
        cx="16"
        cy="16"
        r="6"
        fill="#FFFFFF"
        opacity="0.9"
      />
      
      <circle
        cx="16"
        cy="16"
        r="3"
        fill="url(#logoGradient)"
      />
    </svg>
  );
};