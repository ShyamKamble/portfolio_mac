"use client"

import { motion } from "motion/react"
import { useState } from "react"
import { MacFolderIcon } from "@/components/icons"

interface FolderProps {
  name: string
  x: number
  y: number
  onClick: () => void
  onDrag?: (id: string, x: number, y: number) => void
  id: string
}

export function Folder({ name, x, y, onClick, onDrag, id }: FolderProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [hasBeenDragged, setHasBeenDragged] = useState(false)

  return (
    <motion.div
      className={`absolute select-none ${isDragging ? 'cursor-grabbing z-50' : 'cursor-grab z-30'}`}
      initial={{ x, y }}
      animate={{ x, y }}
      drag
      dragMomentum={false}
      dragElastic={0.2}
      dragConstraints={{
        left: 0,
        right: (typeof window !== 'undefined' ? window.innerWidth - 120 : 1080),
        top: 30, // Account for top menu bar
        bottom: (typeof window !== 'undefined' ? window.innerHeight - 120 : 680)
      }}
      whileHover={!isDragging ? { scale: 1.05 } : {}}
      whileTap={{ scale: 0.95 }}
      whileDrag={{ 
        scale: 1.1,
        rotate: 3,
        zIndex: 100,
        transition: { duration: 0.1 }
      }}
      onDragStart={() => {
        setIsDragging(true)
        setHasBeenDragged(true)
      }}
      onDragEnd={(_, info) => {
        setIsDragging(false)
        if (onDrag) {
          const newX = Math.max(0, Math.min((typeof window !== 'undefined' ? window.innerWidth - 120 : 1080), x + info.offset.x))
          const newY = Math.max(30, Math.min((typeof window !== 'undefined' ? window.innerHeight - 120 : 680), y + info.offset.y))
          onDrag(id, newX, newY)
        }
        // Reset drag flag after animation
        setTimeout(() => setHasBeenDragged(false), 200)
      }}
      onClick={() => {
        // Only open window if folder wasn't just dragged
        if (!hasBeenDragged) {
          onClick()
        }
      }}
    >
      <div className="flex flex-col items-center space-y-2 p-2 group">
        {/* Ultra-accurate macOS folder icon */}
        <div className="relative">
          <div className={`transition-all duration-200 ${
            isDragging 
              ? 'drop-shadow-2xl brightness-110 contrast-110' 
              : 'drop-shadow-md group-hover:brightness-105 group-hover:drop-shadow-lg group-hover:contrast-105'
          }`}>
            <MacFolderIcon 
              size={64} 
              className={`transition-all duration-200 ${
                isDragging ? 'scale-110' : 'group-hover:scale-105'
              }`}
            />
          </div>
          
          {/* Selection indicator when dragging */}
          {isDragging && (
            <motion.div 
              className="absolute -inset-1 border-2 border-blue-400 border-dashed rounded-lg bg-blue-100/20"
              animate={{ 
                borderColor: ['#60A5FA', '#3B82F6', '#60A5FA'],
                backgroundColor: ['rgba(59, 130, 246, 0.1)', 'rgba(96, 165, 250, 0.2)', 'rgba(59, 130, 246, 0.1)']
              }}
              transition={{ duration: 1, repeat: Infinity }}
            />
          )}
        </div>
        
        {/* Folder name with macOS styling */}
        <motion.span 
          className={`text-macos-caption-1 text-gray-800 text-center max-w-24 break-words px-2 py-1 rounded-md transition-all duration-200 ${
            isDragging 
              ? 'bg-blue-100 border border-blue-300 shadow-lg' 
              : 'bg-white/90 border border-gray-200/50 shadow-sm group-hover:bg-white group-hover:shadow-md backdrop-blur-sm'
          }`}
          animate={isDragging ? { scale: 1.05 } : { scale: 1 }}
        >
          {name}
        </motion.span>
      </div>
    </motion.div>
  )
}