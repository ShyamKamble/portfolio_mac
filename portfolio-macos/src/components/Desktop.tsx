"use client"

import { useState, useCallback, useMemo, useEffect, useRef } from "react"
import { Dock } from "@/components/Dock"
import { Folder } from "@/components/Folder"
import { WindowManager } from "@/components/WindowManager"
import { Particles } from "@/components/ui/particles"
import { Spotlight } from "@/components/Spotlight"
import { FolderData } from "@/types"
import { VanGoghSticker } from "@/components/VanGoghSticker"
import { MacOSGridWallpaper } from "@/components/MacOSGridWallpaper"
import { StickyNote } from "@/components/StickyNote"
import { AppleLogo } from "@/components/icons/AppleLogo"
import { DEFAULT_FOLDERS, MACOS_DESIGN_SYSTEM, COMMON_STYLES } from "@/constants"
import { useWindowManager } from "@/hooks/useWindowManager"

// Authentic macOS menu bar height (28px) - Exact specification
const MENU_BAR_HEIGHT = 28

// Ultra-precise macOS styling - Hoisted for performance
const MENU_BAR_STYLE = {
  height: `${MENU_BAR_HEIGHT}px`,
  backdropFilter: MACOS_DESIGN_SYSTEM.blur.menuBar,
  WebkitBackdropFilter: MACOS_DESIGN_SYSTEM.blur.menuBar,
  borderBottom: `0.5px solid ${MACOS_DESIGN_SYSTEM.colors.separator}`,
  boxShadow: MACOS_DESIGN_SYSTEM.shadows.menuBar,
  // Authentic macOS menu bar styling
  background: 'linear-gradient(180deg, rgba(246, 246, 246, 0.95) 0%, rgba(236, 236, 236, 0.95) 100%)',
} as const

// Distinctive desktop background with atmospheric depth
const DESKTOP_BACKGROUND_STYLE = {
  background: `
    radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.3) 0%, transparent 50%),
    radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.15) 0%, transparent 50%),
    linear-gradient(135deg, #f5f5f7 0%, #e8e8ed 50%, #f0f0f5 100%)
  `
} as const

// Authentic macOS menu items with proper spacing
const MENU_ITEMS = ['File', 'Edit', 'View', 'Window', 'Help'] as const

// System status icons with authentic styling
const SYSTEM_STATUS_ICONS = [
  { icon: '🔋', label: 'Battery' },
  { icon: '📶', label: 'WiFi' },
  { icon: '🔍', label: 'Spotlight' },
  { icon: '🔊', label: 'Volume' }
] as const

// Memoized menu bar content with ultra-precise styling
const MenuBarContent = () => {
  const currentTime = useMemo(() => {
    const now = new Date()
    return {
      date: now.toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric'
      }),
      time: now.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
      })
    }
  }, [])

  return (
    <>
      <div className="flex items-center space-x-4">
        {/* Apple Logo with authentic hover state */}
        <button
          className="flex items-center text-gray-900 hover:bg-black/5 px-2 py-1 rounded transition-all duration-150 active:bg-black/10"
          style={{
            fontFamily: MACOS_DESIGN_SYSTEM.typography.fontFamily.system,
            fontSize: MACOS_DESIGN_SYSTEM.typography.fontSize.menuBar
          }}
        >
          <AppleLogo size={14} className="text-gray-900" />
        </button>

        {/* App name with authentic weight and spacing */}
        <span
          className="text-gray-900 font-semibold hover:bg-black/5 px-2 py-1 rounded transition-all duration-150 cursor-pointer select-none"
          style={{
            fontFamily: MACOS_DESIGN_SYSTEM.typography.fontFamily.display,
            fontSize: MACOS_DESIGN_SYSTEM.typography.fontSize.menuBar,
            fontWeight: MACOS_DESIGN_SYSTEM.typography.fontWeight.semibold,
            letterSpacing: MACOS_DESIGN_SYSTEM.typography.letterSpacing.footnote
          }}
        >
          Portfolio
        </span>

        {/* Menu items with authentic macOS styling and interactions */}
        {MENU_ITEMS.map((item) => (
          <button
            key={item}
            className="text-gray-700 hover:bg-black/5 px-2 py-1 rounded transition-all duration-150 cursor-pointer select-none active:bg-black/10"
            style={{
              fontFamily: MACOS_DESIGN_SYSTEM.typography.fontFamily.system,
              fontSize: MACOS_DESIGN_SYSTEM.typography.fontSize.menuBar,
              fontWeight: MACOS_DESIGN_SYSTEM.typography.fontWeight.regular,
              letterSpacing: MACOS_DESIGN_SYSTEM.typography.letterSpacing.footnote
            }}
          >
            {item}
          </button>
        ))}
      </div>

      <div className="flex items-center space-x-4">
        {/* System status items with authentic spacing and interactions */}
        <div className="flex items-center space-x-2">
          {SYSTEM_STATUS_ICONS.map(({ icon, label }) => (
            <button
              key={label}
              className="hover:bg-black/5 px-1.5 py-1 rounded transition-all duration-150 cursor-pointer active:bg-black/10"
              title={label}
              style={{
                fontSize: MACOS_DESIGN_SYSTEM.typography.fontSize.menuBar
              }}
            >
              {icon}
            </button>
          ))}
        </div>

        {/* Date and time with authentic formatting and typography */}
        <button
          className="flex items-center space-x-2 text-gray-900 font-medium hover:bg-black/5 px-2 py-1 rounded transition-all duration-150 cursor-pointer select-none active:bg-black/10"
          style={{
            fontFamily: MACOS_DESIGN_SYSTEM.typography.fontFamily.system,
            fontSize: MACOS_DESIGN_SYSTEM.typography.fontSize.menuBar,
            fontWeight: MACOS_DESIGN_SYSTEM.typography.fontWeight.medium,
            letterSpacing: MACOS_DESIGN_SYSTEM.typography.letterSpacing.footnote
          }}
        >
          <span>{currentTime.date}</span>
          <span>{currentTime.time}</span>
        </button>
      </div>
    </>
  )
}

export function Desktop() {
  const [folders, setFolders] = useState<FolderData[]>([...DEFAULT_FOLDERS])
  const [stickerPosition, setStickerPosition] = useState({ x: 300, y: 150 })
  const [isSpotlightOpen, setIsSpotlightOpen] = useState(false)
  const desktopRef = useRef<HTMLDivElement>(null)

  // Use custom hook for window management with performance optimization
  const {
    getWindowState,
    openWindow,
    closeWindow,
    minimizeWindow,
    openWindows,
    minimizedWindows
  } = useWindowManager()

  // Keyboard shortcuts with authentic macOS behavior
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Spotlight: Cmd + Space (authentic macOS shortcut)
      if (e.metaKey && e.code === 'Space') {
        e.preventDefault()
        setIsSpotlightOpen(true)
      }

      // Close Spotlight: Escape
      if (e.key === 'Escape' && isSpotlightOpen) {
        setIsSpotlightOpen(false)
      }

      // Quick app shortcuts with Cmd + Shift (authentic macOS pattern)
      if (e.metaKey && e.shiftKey) {
        const shortcuts: Record<string, string> = {
          'F': 'finder',
          'S': 'safari',
          'M': 'mail',
          'N': 'notes',
          'C': 'calendar',
          'T': 'notion'
        }

        if (shortcuts[e.key]) {
          e.preventDefault()
          openWindow(shortcuts[e.key])
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isSpotlightOpen, openWindow])

  // Optimized folder drag handler with performance considerations
  const handleFolderDrag = useCallback((folderId: string, newX: number, newY: number) => {
    setFolders(prevFolders =>
      prevFolders.map(folder =>
        folder.id === folderId
          ? { ...folder, x: newX, y: newY }
          : folder
      )
    )
  }, [])

  // Optimized sticker drag handler
  const handleStickerDrag = useCallback((x: number, y: number) => {
    setStickerPosition({ x, y })
  }, [])

  // Spotlight close handler with stable reference
  const handleSpotlightClose = useCallback(() => {
    setIsSpotlightOpen(false)
  }, [])

  return (
    <div
      ref={desktopRef}
      className="relative h-screen w-full overflow-hidden select-none cursor-default"
      style={DESKTOP_BACKGROUND_STYLE}
    >
      {/* Authentic macOS Desktop Background with atmospheric depth */}
      <div className="absolute inset-0">
        {/* macOS Grid Wallpaper */}
        <MacOSGridWallpaper />

        {/* Distinctive atmospheric tinting - Creative visual depth */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/6 via-transparent to-purple-50/3 mix-blend-soft-light" />

        {/* Additional depth layer with subtle noise texture */}
        <div
          className="absolute inset-0 opacity-[0.015] mix-blend-overlay"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        />

        {/* Subtle radial gradient for depth */}
        <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-black/[0.02]" />
      </div>

      {/* Refined particles with authentic macOS colors */}
      <Particles
        className="absolute inset-0 z-10"
        quantity={8}
        ease={160}
        color={MACOS_DESIGN_SYSTEM.colors.systemGray4}
        size={0.2}
        refresh={false}
      />

      {/* Ultra-Authentic macOS Menu Bar */}
      <div
        className="absolute top-0 left-0 right-0 flex items-center justify-between px-5 text-gray-800 z-50"
        style={MENU_BAR_STYLE}
      >
        {/* Subtle inner highlight for authentic depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/40 to-transparent pointer-events-none" />
        <div className="relative z-10 flex items-center justify-between w-full">
          <MenuBarContent />
        </div>
      </div>

      {/* Van Gogh Sticker Widget with enhanced atmospheric shadow */}
      <div
        className="absolute z-20"
        style={{
          left: stickerPosition.x,
          top: stickerPosition.y,
          filter: 'drop-shadow(0 6px 20px rgba(0, 0, 0, 0.15)) drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1))'
        }}
      >
        <VanGoghSticker
          x={stickerPosition.x}
          y={stickerPosition.y}
          onDrag={handleStickerDrag}
        />
      </div>

      {/* Sticky Note Widget with authentic paper-like shadow */}
      <div
        className="absolute z-20"
        style={{
          left: 50,
          top: 80,
          filter: 'drop-shadow(0 8px 25px rgba(0, 0, 0, 0.12)) drop-shadow(0 3px 6px rgba(0, 0, 0, 0.08))'
        }}
      >
        <StickyNote
          position={{ x: 50, y: 80 }}
          initialContent={`To do:
`}
        />
      </div>

      {/* Draggable Folders with enhanced depth and authentic shadows */}
      {folders.map((folder) => (
        <div
          key={folder.id}
          className="absolute z-20"
          style={{
            left: folder.x,
            top: folder.y,
            filter: 'drop-shadow(0 3px 12px rgba(0, 0, 0, 0.1)) drop-shadow(0 1px 3px rgba(0, 0, 0, 0.08))'
          }}
        >
          <Folder
            id={folder.id}
            name={folder.name}
            x={folder.x}
            y={folder.y}
            onClick={() => openWindow(folder.windowId)}
            onDrag={handleFolderDrag}
          />
        </div>
      ))}

      {/* Ultra-Enhanced macOS Dock with authentic styling */}
      <Dock
        onAppClick={openWindow}
        minimizedWindows={minimizedWindows}
        getWindowState={getWindowState}
      />

      {/* Window Manager with enhanced performance */}
      <WindowManager
        openWindows={openWindows}
        onClose={closeWindow}
        onMinimize={minimizeWindow}
      />

      {/* Spotlight Search with authentic macOS behavior */}
      <Spotlight
        isOpen={isSpotlightOpen}
        onClose={handleSpotlightClose}
        onOpenApp={openWindow}
      />
    </div>
  )
}