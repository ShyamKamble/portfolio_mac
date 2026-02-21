"use client"

interface BomIconProps {
  className?: string
}

export function BomIcon({ className = "w-14 h-14" }: BomIconProps) {
  return (
    <div className={`${className} rounded-xl overflow-hidden shadow-lg flex items-center justify-center bg-gray-100`}>
      {/* You can use the bomicon.icns file here if you have a way to display .icns files */}
      {/* For now, we'll use our SVG version */}
      <img 
        src="/macos-trash-icon.svg" 
        alt="Bin Icon" 
        className="w-full h-full object-cover"
        draggable={false}
      />
    </div>
  )
}