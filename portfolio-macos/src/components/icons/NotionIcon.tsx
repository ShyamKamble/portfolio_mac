"use client"

interface NotionIconProps {
  size?: number
  className?: string
}

export function NotionIcon({ size = 64, className = "" }: NotionIconProps) {
  return (
    <div 
      className={`relative ${className}`}
      style={{ width: size, height: size }}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Background */}
        <rect
          width="64"
          height="64"
          rx="12"
          fill="url(#notionGradient)"
        />
        
        {/* Notion Logo */}
        <path
          d="M16 20h32c2.2 0 4 1.8 4 4v16c0 2.2-1.8 4-4 4H16c-2.2 0-4-1.8-4-4V24c0-2.2 1.8-4 4-4z"
          fill="white"
          fillOpacity="0.9"
        />
        
        {/* Text Lines */}
        <rect x="20" y="26" width="20" height="2" rx="1" fill="#37352F" fillOpacity="0.8" />
        <rect x="20" y="30" width="16" height="2" rx="1" fill="#37352F" fillOpacity="0.6" />
        <rect x="20" y="34" width="18" height="2" rx="1" fill="#37352F" fillOpacity="0.4" />
        <rect x="20" y="38" width="14" height="2" rx="1" fill="#37352F" fillOpacity="0.3" />
        
        {/* Notion "N" Symbol */}
        <path
          d="M44 26v12l4-2V24l-4 2z"
          fill="#37352F"
          fillOpacity="0.7"
        />
        
        <defs>
          <linearGradient
            id="notionGradient"
            x1="0"
            y1="0"
            x2="64"
            y2="64"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#FFFFFF" />
            <stop offset="1" stopColor="#F7F6F3" />
          </linearGradient>
        </defs>
      </svg>
      
      {/* Subtle shadow overlay */}
      <div 
        className="absolute inset-0 rounded-xl"
        style={{
          background: 'linear-gradient(135deg, rgba(0,0,0,0.1) 0%, transparent 50%, rgba(255,255,255,0.1) 100%)',
          mixBlendMode: 'overlay'
        }}
      />
    </div>
  )
}