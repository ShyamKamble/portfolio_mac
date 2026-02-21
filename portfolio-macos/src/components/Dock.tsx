"use client"

import React, { useState, useCallback, memo } from "react"
import { Dock as MagicDock, DockIcon } from "@/components/ui/dock"
import { DockProps, AppConfig } from "@/types"
import { DOCK_CONFIG, MACOS_DESIGN_SYSTEM, ANIMATIONS } from "@/constants"
// Direct imports to avoid barrel file overhead
import { FinderIcon } from "./dock/AppIcons"
import { SafariIcon } from "./dock/AppIcons"
import { MailIcon } from "./dock/AppIcons"
import { CalendarIcon } from "./dock/AppIcons"
import { NotesIcon } from "./dock/AppIcons"
import { DocumentsIcon } from "./dock/AppIcons"
import { NotionIcon } from "./dock/AppIcons"
import { TrashIcon } from "./dock/AppIcons"

// Hoist static data outside component to prevent re-creation
const APPS: AppConfig[] = [
  { id: "finder", icon: FinderIcon, name: "Finder" },
  { id: "safari", icon: SafariIcon, name: "Safari" },
  { id: "mail", icon: MailIcon, name: "Mail" },
  { id: "calendar", icon: CalendarIcon, name: "Calendar" },
  { id: "notes", icon: NotesIcon, name: "Notes" },
  { id: "documents", icon: DocumentsIcon, name: "Documents" },
  { id: "notion", icon: NotionIcon, name: "Notion" },
  { id: "trash", icon: TrashIcon, name: "Trash" },
]

// Authentic macOS dock styling
const DOCK_CONTAINER_STYLE = {
  background: MACOS_DESIGN_SYSTEM.colors.dockBackground,
  backdropFilter: MACOS_DESIGN_SYSTEM.blur.medium,
  WebkitBackdropFilter: MACOS_DESIGN_SYSTEM.blur.medium,
  border: `0.5px solid ${MACOS_DESIGN_SYSTEM.colors.dockBorder}`,
  boxShadow: MACOS_DESIGN_SYSTEM.shadows.dock,
  borderRadius: `${DOCK_CONFIG.borderRadius}px`
} as const

const SEPARATOR_STYLE = {
  width: '1px',
  height: '56px',
  background: 'linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.15) 20%, rgba(0,0,0,0.25) 50%, rgba(0,0,0,0.15) 80%, transparent 100%)'
} as const

interface EnhancedDockIconProps {
  app: AppConfig
  index: number
  isHovered: boolean
  onHover: () => void
  onLeave: () => void
  onClick: () => void
  windowState: string
}

// Memoized dock icon component with authentic macOS interactions
const EnhancedDockIcon = memo(({ 
  app, 
  index, 
  isHovered, 
  onHover, 
  onLeave, 
  onClick, 
  windowState 
}: EnhancedDockIconProps) => {
  const isRunning = windowState === 'open' || windowState === 'minimized'
  const isMinimized = windowState === 'minimized'
  
  return (
    <div
      className="relative flex flex-col items-center group"
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      {/* Authentic macOS tooltip */}
      <div
        className={`absolute -top-14 px-3 py-2 text-white text-sm rounded-lg shadow-xl border border-white/10 whitespace-nowrap transition-all pointer-events-none z-50 ${
          isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
        }`}
        style={{
          background: 'rgba(42, 42, 42, 0.95)',
          backdropFilter: 'blur(20px) saturate(1.8)',
          WebkitBackdropFilter: 'blur(20px) saturate(1.8)',
          fontFamily: MACOS_DESIGN_SYSTEM.typography.fontFamily.system,
          fontSize: MACOS_DESIGN_SYSTEM.typography.fontSize.caption1,
          fontWeight: MACOS_DESIGN_SYSTEM.typography.fontWeight.medium,
          transitionDuration: `${ANIMATIONS.DOCK_HOVER.duration * 1000}ms`,
          transitionTimingFunction: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
        }}
      >
        {app.name}
        {/* Tooltip arrow with authentic styling */}
        <div className="absolute left-1/2 -translate-x-1/2 -bottom-1.5 w-3 h-3 rotate-45 border-r border-b border-white/10"
             style={{ background: 'rgba(42, 42, 42, 0.95)' }} />
      </div>

      {/* Icon container with authentic macOS hover scaling */}
      <div
        className={`transition-all ease-out cursor-pointer ${
          isHovered ? 'scale-125 -translate-y-4' : 'scale-100 translate-y-0'
        }`}
        style={{
          transitionDuration: `${ANIMATIONS.DOCK_HOVER.duration * 1000}ms`,
          transitionTimingFunction: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
        }}
        onClick={onClick}
      >
        <DockIcon 
          className="hover:bg-white/10 transition-all duration-200 rounded-2xl p-1.5"
          style={{
            filter: isMinimized ? 'brightness(0.7) saturate(0.8)' : 'none'
          }}
        >
          <div className="relative">
            <div className={`transition-all duration-300 ${isMinimized ? 'opacity-70 scale-95' : ''}`}>
              <app.icon />
            </div>
            
            {/* Authentic macOS app indicator dot */}
            {isRunning && (
              <div 
                className={`absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 rounded-full shadow-sm transition-all duration-300 ${
                  isMinimized ? 'bg-yellow-400/90' : 'bg-white/90'
                }`}
                style={{
                  boxShadow: isMinimized 
                    ? '0 0 4px rgba(255, 193, 7, 0.6)' 
                    : '0 0 4px rgba(255, 255, 255, 0.6)'
                }}
              />
            )}
          </div>
        </DockIcon>
      </div>

      {/* Enhanced reflection with authentic macOS styling */}
      <div
        className={`mt-1 transition-all ease-out pointer-events-none ${
          isHovered ? 'scale-125 opacity-30' : 'scale-100 opacity-20'
        }`}
        style={{
          transform: `scaleY(-1) ${isHovered ? 'scale(1.25)' : 'scale(1)'}`,
          maskImage: 'linear-gradient(to bottom, rgba(0,0,0,0.25) 0%, transparent 70%)',
          WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,0.25) 0%, transparent 70%)',
          filter: 'blur(1px)',
          transitionDuration: `${ANIMATIONS.DOCK_HOVER.duration * 1000}ms`,
          transitionTimingFunction: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
        }}
      >
        <div className={`transition-all duration-300 ${isMinimized ? 'opacity-60 scale-95' : ''}`}>
          <app.icon />
        </div>
      </div>
    </div>
  )
})

EnhancedDockIcon.displayName = 'EnhancedDockIcon'

export function Dock({ onAppClick, getWindowState }: DockProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  // Use useCallback for stable function references
  const handleHover = useCallback((index: number) => {
    setHoveredIndex(index)
  }, [])

  const handleLeave = useCallback(() => {
    setHoveredIndex(null)
  }, [])

  const handleAppClick = useCallback((appId: string) => {
    onAppClick(appId)
  }, [onAppClick])

  return (
    <div className="fixed bottom-3 left-1/2 transform -translate-x-1/2 z-50">
      <div 
        className="px-3 py-3"
        style={DOCK_CONTAINER_STYLE}
      >
        <MagicDock 
          iconSize={DOCK_CONFIG.iconSize}
          iconMagnification={DOCK_CONFIG.iconMagnification}
          direction={DOCK_CONFIG.direction}
          className="flex items-end gap-1"
          disableMagnification={true}
        >
        {APPS.map((app, index) => {
          const windowState = getWindowState(app.id)
          
          return (
            <React.Fragment key={app.id}>
              {/* Authentic separator before Trash */}
              {index === APPS.length - 1 && (
                <div 
                  className="mx-2 self-center"
                  style={SEPARATOR_STYLE}
                />
              )}
              
              <EnhancedDockIcon
                app={app}
                index={index}
                isHovered={hoveredIndex === index}
                onHover={() => handleHover(index)}
                onLeave={handleLeave}
                onClick={() => handleAppClick(app.id)}
                windowState={windowState}
              />
            </React.Fragment>
          )
        })}
        </MagicDock>
      </div>
    </div>
  )
}