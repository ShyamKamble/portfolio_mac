"use client"

import { useState } from "react"
import { motion } from "motion/react"
import { X } from "lucide-react"

interface StickyNoteProps {
  initialContent?: string
  onClose?: () => void
  position?: { x: number; y: number }
  className?: string
}

export function StickyNote({ 
  initialContent = "To do:\nLand my dream UX job\nDrink water\nMove to the US\nFinish grad school without losing my mind\nGet really good at pottery glazing\nWorld domination\nEat really good ice cream today\nTravel somewhere new every year",
  onClose,
  position = { x: 50, y: 50 },
  className = ""
}: StickyNoteProps) {
  const [content, setContent] = useState(initialContent)
  const [isEditing, setIsEditing] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, rotate: -2 }}
      animate={{ opacity: 1, scale: 1, rotate: -1 }}
      exit={{ opacity: 0, scale: 0.8, rotate: -5 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={`fixed z-40 w-56 h-64 ${className}`}
      style={{
        left: position.x,
        top: position.y,
        transform: 'rotate(-1deg)',
      }}
      drag
      dragMomentum={false}
      whileDrag={{ scale: 1.05, rotate: 0, zIndex: 50 }}
    >
      {/* Main sticky note body - authentic macOS Stickies design */}
      <div 
        className="w-full h-full relative overflow-hidden cursor-move"
        style={{
          // Authentic macOS Stickies yellow - more saturated and vibrant
          background: 'linear-gradient(135deg, #FFEB3B 0%, #FDD835 50%, #FFEB3B 100%)',
          borderRadius: '4px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.15), 0 1px 3px rgba(0,0,0,0.1)',
          border: '1px solid rgba(0,0,0,0.1)'
        }}
      >
        {/* Authentic paper texture - more subtle */}
        <div 
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `
              repeating-linear-gradient(
                0deg,
                transparent,
                transparent 2px,
                rgba(0,0,0,0.02) 2px,
                rgba(0,0,0,0.02) 3px
              )
            `,
            backgroundSize: '100% 20px'
          }}
        />

        {/* Top highlight for paper effect */}
        <div 
          className="absolute top-0 left-0 right-0 h-px"
          style={{
            background: 'rgba(255,255,255,0.5)'
          }}
        />

        {/* Close button - simple X in top right like real Stickies */}
        {onClose && (
          <motion.button
            className="absolute top-1 right-1 w-4 h-4 flex items-center justify-center rounded-full opacity-0 hover:opacity-100 transition-opacity duration-200"
            style={{
              background: 'rgba(0,0,0,0.1)',
            }}
            onClick={onClose}
            whileHover={{ 
              scale: 1.1,
              background: 'rgba(0,0,0,0.2)'
            }}
            whileTap={{ scale: 0.9 }}
          >
            <X className="w-2.5 h-2.5 text-gray-700" strokeWidth={2} />
          </motion.button>
        )}

        {/* Content area - full height like real Stickies */}
        <div className="relative p-3 h-full overflow-hidden">
          {isEditing ? (
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              onBlur={() => setIsEditing(false)}
              className="w-full h-full resize-none border-none outline-none bg-transparent text-gray-900 text-sm leading-relaxed font-normal scrollbar-hide"
              style={{
                // Authentic macOS system font - slightly larger for readability
                fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Helvetica Neue", Helvetica, Arial, sans-serif',
                fontSize: '14px',
                lineHeight: '1.5',
                fontWeight: '400',
                letterSpacing: '-0.01em',
                // Hide scrollbar
                scrollbarWidth: 'none',
                msOverflowStyle: 'none'
              }}
              autoFocus
            />
          ) : (
            <div
              className="w-full h-full text-gray-900 text-sm leading-relaxed font-normal whitespace-pre-wrap cursor-text overflow-hidden"
              style={{
                // Authentic macOS system font - slightly larger for readability
                fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Helvetica Neue", Helvetica, Arial, sans-serif',
                fontSize: '14px',
                lineHeight: '1.5',
                fontWeight: '400',
                letterSpacing: '-0.01em',
                color: '#1d1d1f'
              }}
              onClick={() => setIsEditing(true)}
            >
              {content}
            </div>
          )}
        </div>

        {/* Subtle bottom shadow for depth */}
        <div 
          className="absolute bottom-0 right-0 w-12 h-12 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at bottom right, rgba(0,0,0,0.05) 0%, transparent 70%)'
          }}
        />

        {/* Corner curl effect - very subtle like real paper */}
        <div 
          className="absolute top-0 right-0 w-4 h-4"
          style={{
            background: 'linear-gradient(-45deg, rgba(0,0,0,0.03) 0%, transparent 50%)',
            clipPath: 'polygon(100% 0%, 0% 100%, 100% 100%)'
          }}
        />
      </div>
    </motion.div>
  )
}