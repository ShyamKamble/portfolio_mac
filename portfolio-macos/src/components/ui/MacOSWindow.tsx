"use client"

import { motion } from "motion/react"
import { X, Minus, Square } from "lucide-react"
import { ANIMATIONS } from "@/constants"

interface MacOSWindowProps {
  title: string
  onClose: () => void
  onMinimize?: () => void
  children: React.ReactNode
  className?: string
}

export function MacOSWindow({ title, onClose, onMinimize, children, className }: MacOSWindowProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: 20 }}
      transition={{ duration: ANIMATIONS.WINDOW_OPEN.duration, ease: ANIMATIONS.WINDOW_OPEN.ease }}
      className={`fixed inset-4 z-50 flex flex-col bg-white/92 backdrop-blur-2xl rounded-[10px] shadow-2xl border border-black/10 overflow-hidden ${className}`}
      style={{
        background: 'rgba(246, 246, 246, 0.92)',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 0.5px rgba(0, 0, 0, 0.05)'
      }}
    >
      {/* Authentic macOS Title Bar */}
      <div 
        className="relative border-b flex items-center px-5"
        style={{
          height: '28px',
          background: 'linear-gradient(180deg, rgba(236, 236, 236, 0.95) 0%, rgba(220, 220, 220, 0.95) 100%)',
          backdropFilter: 'blur(20px) saturate(1.8)',
          WebkitBackdropFilter: 'blur(20px) saturate(1.8)',
          borderBottomColor: 'rgba(0, 0, 0, 0.08)'
        }}
      >
        {/* Title bar inner highlight */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/40 to-transparent pointer-events-none"></div>
        
        {/* Traffic Light Controls */}
        <div className="flex items-center space-x-2">
          {/* Close Button - Authentic macOS Red */}
          <motion.button 
            className="w-[13px] h-[13px] rounded-full relative group border"
            style={{
              background: '#ff5f57',
              borderColor: 'rgba(224, 68, 62, 0.2)',
              boxShadow: '0 1px 2px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.3)'
            }}
            onClick={onClose}
            whileHover={{ 
              scale: 1.05,
              background: '#ff4136'
            }}
            whileTap={{ scale: 0.95 }}
          >
            <X className="w-[7px] h-[7px] text-[#bf0e08] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity" />
          </motion.button>
          
          {/* Minimize Button - Authentic macOS Yellow */}
          <motion.button 
            className="w-[13px] h-[13px] rounded-full relative group border"
            style={{
              background: '#ffbd2e',
              borderColor: 'rgba(222, 161, 35, 0.2)',
              boxShadow: '0 1px 2px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.3)'
            }}
            onClick={onMinimize}
            whileHover={{ 
              scale: 1.05,
              background: '#ffb524'
            }}
            whileTap={{ scale: 0.95 }}
          >
            <Minus className="w-[7px] h-[7px] text-[#995700] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity" />
          </motion.button>
          
          {/* Maximize Button - Authentic macOS Green */}
          <motion.button 
            className="w-[13px] h-[13px] rounded-full relative group border"
            style={{
              background: '#28ca42',
              borderColor: 'rgba(40, 167, 69, 0.2)',
              boxShadow: '0 1px 2px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.3)'
            }}
            whileHover={{ 
              scale: 1.05,
              background: '#20c936'
            }}
            whileTap={{ scale: 0.95 }}
          >
            <Square className="w-[6px] h-[6px] text-[#0d5016] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity" />
          </motion.button>
        </div>
        
        {/* Window Title */}
        <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <h3 
            className="text-gray-700 tracking-wide"
            style={{
              fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif',
              fontSize: '13px',
              fontWeight: '500',
              letterSpacing: '-0.01em'
            }}
          >
            {title}
          </h3>
        </div>
        
        {/* Title bar bottom highlight */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-white/60" />
      </div>

      {/* Window Content */}
      <div className="flex-1 overflow-hidden">
        {children}
      </div>
    </motion.div>
  )
}