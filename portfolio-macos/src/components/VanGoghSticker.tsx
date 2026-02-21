"use client"

import { useState } from "react"
import { motion } from "motion/react"

interface VanGoghStickerProps {
  x?: number
  y?: number
  onDrag?: (x: number, y: number) => void
}

export function VanGoghSticker({ 
  x = 300, 
  y = 150, 
  onDrag 
}: VanGoghStickerProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [position, setPosition] = useState({ x, y })

  const handleDragEnd = (event: any, info: any) => {
    const newX = Math.max(0, Math.min(window.innerWidth - 192, position.x + info.offset.x)) // 192px = w-48
    const newY = Math.max(30, Math.min(window.innerHeight - 144, position.y + info.offset.y)) // 144px = h-36
    
    setPosition({ x: newX, y: newY })
    setIsDragging(false)
    onDrag?.(newX, newY)
  }

  return (
    <motion.div
      drag
      dragMomentum={false}
      onDragStart={() => setIsDragging(true)}
      onDragEnd={handleDragEnd}
      initial={{ x: position.x, y: position.y }}
      animate={{ x: position.x, y: position.y }}
      className={`absolute z-30 cursor-move select-none ${
        isDragging ? 'z-40' : ''
      }`}
      whileHover={{ scale: 1.02 }}
      whileDrag={{ scale: 1.05, rotate: 2 }}
    >
      {/* Van Gogh Painting - Just the Image */}
      <div className={`relative transition-all duration-200 ${
        isDragging 
          ? 'drop-shadow-2xl brightness-110' 
          : 'drop-shadow-lg hover:drop-shadow-xl'
      }`}>
        {/* Van Gogh Image - Direct Display */}
        <div className="relative w-48 h-36 rounded-xl overflow-hidden border-2 border-white/80 shadow-lg">
          <img 
            src="/Vincent Van Gogh, _Starry Night_ (1889) 29_ × 36-1_4_.jpg" 
            alt="The Starry Night by Vincent van Gogh, 1889"
            className="w-full h-full object-cover"
            draggable={false}
          />
          
          {/* Subtle overlay for depth and authenticity */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>
          
          {/* Subtle highlight on top edge like a real painting */}
          <div className="absolute top-0 left-0 right-0 h-px bg-white/40"></div>
        </div>
        
        {/* Painting shadow */}
        <div className="absolute inset-0 bg-black/20 rounded-xl blur-md -z-10 translate-y-2 translate-x-1"></div>
      </div>
    </motion.div>
  )
}