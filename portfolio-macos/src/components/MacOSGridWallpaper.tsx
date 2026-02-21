"use client"

import { GridPattern } from "@/components/ui/grid-pattern"

export function MacOSGridWallpaper() {
  return (
    <div className="absolute inset-0 z-0">
      {/* Authentic macOS Grid - Very subtle like real macOS */}
      <GridPattern
        width={40}
        height={40}
        className="opacity-[0.15] text-gray-400 stroke-[0.5]"
        strokeDasharray="0"
      />
      
      {/* Additional subtle texture overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            radial-gradient(circle at 25% 25%, rgba(0,0,0,0.02) 0%, transparent 50%),
            radial-gradient(circle at 75% 75%, rgba(0,0,0,0.02) 0%, transparent 50%)
          `,
          backgroundSize: '100px 100px'
        }}
      />
    </div>
  )
}