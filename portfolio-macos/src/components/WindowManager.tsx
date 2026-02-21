"use client"

import { X, Minus, Square, Mail, Globe, FileText } from "lucide-react"
import { motion, AnimatePresence } from "motion/react"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { VisuallyHidden } from "@/components/ui/visually-hidden"
import { WindowManagerProps } from "@/types"
import { ANIMATIONS, MACOS_DESIGN_SYSTEM, COMMON_STYLES } from "@/constants"
import { Suspense, lazy } from "react"
import { About } from "@/components/About"
import { Projects } from "@/components/Projects"

// Dynamic imports for heavy components to reduce bundle size
const MacCalendar = lazy(() => import("@/components/MacCalendar").then(m => ({ default: m.MacCalendar })))
const MacFinder = lazy(() => import("@/components/MacFinder").then(m => ({ default: m.MacFinder })))
const MacNotes = lazy(() => import("@/components/MacNotes").then(m => ({ default: m.MacNotes })))
const MacSafari = lazy(() => import("@/components/MacSafari").then(m => ({ default: m.MacSafari })))
const MacMail = lazy(() => import("@/components/MacMail").then(m => ({ default: m.MacMail })))
const MacTrash = lazy(() => import("@/components/MacTrash").then(m => ({ default: m.MacTrash })))
const MacDocuments = lazy(() => import("@/components/MacDocuments").then(m => ({ default: m.MacDocuments })))
const MacNotion = lazy(() => import("@/components/MacNotion").then(m => ({ default: m.MacNotion })))

// Loading component for Suspense fallback with authentic macOS styling
const WindowLoading = () => (
  <div className="flex items-center justify-center p-12">
    <div
      className="animate-spin rounded-full h-8 w-8 border-2 border-transparent"
      style={{
        borderTopColor: MACOS_DESIGN_SYSTEM.colors.systemBlue,
        borderRightColor: MACOS_DESIGN_SYSTEM.colors.systemBlue,
        animationDuration: '1s'
      }}
    />
  </div>
)

// Authentic macOS traffic light button component
const TrafficLightButton = ({
  color,
  icon: Icon,
  onClick,
  isHovered
}: {
  color: 'red' | 'yellow' | 'green'
  icon: React.ComponentType<any>
  onClick: () => void
  isHovered: boolean
}) => {
  const colors = {
    red: MACOS_DESIGN_SYSTEM.colors.trafficLightRed,
    yellow: MACOS_DESIGN_SYSTEM.colors.trafficLightYellow,
    green: MACOS_DESIGN_SYSTEM.colors.trafficLightGreen
  }

  return (
    <motion.button
      className="w-3 h-3 rounded-full relative group flex items-center justify-center"
      style={{ backgroundColor: colors[color] }}
      onClick={onClick}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      transition={{ duration: 0.15, ease: "easeOut" }}
    >
      <Icon
        className="w-1.5 h-1.5 text-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-150"
        strokeWidth={2.5}
      />
    </motion.button>
  )
}

export function WindowManager({ openWindows, onClose, onMinimize }: WindowManagerProps) {
  const getWindowContent = (windowId: string) => {
    switch (windowId) {
      case "finder":
        return (
          <Suspense fallback={<WindowLoading />}>
            <MacFinder onClose={() => onClose(windowId)} onMinimize={() => onMinimize(windowId)} />
          </Suspense>
        )
      case "calendar":
        return (
          <Suspense fallback={<WindowLoading />}>
            <MacCalendar className="h-[600px]" />
          </Suspense>
        )
      case "notes":
        return (
          <Suspense fallback={<WindowLoading />}>
            <MacNotes onClose={() => onClose(windowId)} onMinimize={() => onMinimize(windowId)} />
          </Suspense>
        )
      case "safari":
        return (
          <Suspense fallback={<WindowLoading />}>
            <MacSafari onClose={() => onClose(windowId)} onMinimize={() => onMinimize(windowId)} />
          </Suspense>
        )
      case "mail":
        return (
          <Suspense fallback={<WindowLoading />}>
            <MacMail onClose={() => onClose(windowId)} onMinimize={() => onMinimize(windowId)} />
          </Suspense>
        )
      case "trash":
        return (
          <Suspense fallback={<WindowLoading />}>
            <MacTrash onClose={() => onClose(windowId)} onMinimize={() => onMinimize(windowId)} />
          </Suspense>
        )
      case "documents":
        return (
          <Suspense fallback={<WindowLoading />}>
            <MacDocuments onClose={() => onClose(windowId)} onMinimize={() => onMinimize(windowId)} />
          </Suspense>
        )
      case "notion":
        return (
          <Suspense fallback={<WindowLoading />}>
            <MacNotion onClose={() => onClose(windowId)} onMinimize={() => onMinimize(windowId)} />
          </Suspense>
        )
      case "projects":
        return <Projects />
      case "about":
        return <About />
      case "contact":
        return (
          <div className="p-6">
            <h2 className="text-macos-title-2 font-semibold mb-6 text-gray-800">Get In Touch</h2>
            <div className="space-y-4">
              <motion.div
                className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                whileHover={{ x: 5 }}
              >
                <Mail className="w-5 h-5 text-blue-500" />
                <div>
                  <p className="text-macos-callout font-medium text-gray-800">Email</p>
                  <p className="text-macos-subheadline text-gray-600">hello@example.com</p>
                </div>
              </motion.div>

              <motion.div
                className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                whileHover={{ x: 5 }}
              >
                <Globe className="w-5 h-5 text-blue-500" />
                <div>
                  <p className="text-macos-callout font-medium text-gray-800">LinkedIn</p>
                  <p className="text-macos-subheadline text-gray-600">/in/yourprofile</p>
                </div>
              </motion.div>

              <motion.div
                className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                whileHover={{ x: 5 }}
              >
                <FileText className="w-5 h-5 text-blue-500" />
                <div>
                  <p className="text-macos-callout font-medium text-gray-800">GitHub</p>
                  <p className="text-macos-subheadline text-gray-600">/yourusername</p>
                </div>
              </motion.div>
            </div>
          </div>
        )
      default:
        return (
          <div className="p-6">
            <h2 className="text-macos-title-3 font-semibold mb-4 text-gray-800">{windowId}</h2>
            <p className="text-macos-body text-gray-600">This window is under development.</p>
          </div>
        )
    }
  }

  return (
    <AnimatePresence>
      {openWindows.map((windowId) => {
        // Apps that handle their own window chrome
        if (["finder", "notes", "safari", "mail", "trash", "documents", "notion"].includes(windowId)) {
          const components = {
            finder: MacFinder,
            notes: MacNotes,
            safari: MacSafari,
            mail: MacMail,
            trash: MacTrash,
            documents: MacDocuments,
            notion: MacNotion
          }
          const Component = components[windowId as keyof typeof components]
          return (
            <Suspense key={windowId} fallback={<WindowLoading />}>
              <Component onClose={() => onClose(windowId)} onMinimize={() => onMinimize(windowId)} />
            </Suspense>
          )
        }

        return (
          <Dialog key={windowId} open={true} onOpenChange={() => onClose(windowId)}>
            <DialogContent className="max-w-5xl p-0 bg-transparent border-none shadow-none">
              {/* Add DialogTitle for accessibility - visually hidden since we have custom title bar */}
              <VisuallyHidden>
                <DialogTitle>{windowId} Window</DialogTitle>
              </VisuallyHidden>

              {/* Ultra-Authentic macOS Window */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{
                  opacity: 0,
                  scale: 0.1,
                  y: window.innerHeight - 100,
                  x: 0,
                  transition: {
                    duration: ANIMATIONS.MINIMIZE.duration,
                    ease: ANIMATIONS.MINIMIZE.ease
                  }
                }}
                transition={ANIMATIONS.SPRING}
                className="relative rounded-xl shadow-2xl overflow-hidden"
                style={{
                  ...COMMON_STYLES.WINDOW_CHROME,
                  border: `1px solid ${MACOS_DESIGN_SYSTEM.colors.separator}`,
                }}
              >
                {/* Authentic macOS Title Bar */}
                <div className="relative border-b"
                  style={{
                    background: MACOS_DESIGN_SYSTEM.colors.windowBackground,
                    backdropFilter: MACOS_DESIGN_SYSTEM.blur.light,
                    WebkitBackdropFilter: MACOS_DESIGN_SYSTEM.blur.light,
                    borderBottomColor: MACOS_DESIGN_SYSTEM.colors.separator
                  }}>

                  {/* Title bar gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-b from-white/30 to-transparent pointer-events-none"></div>

                  {/* Traffic Light Controls */}
                  <div className="flex items-center justify-between px-5 py-4 relative z-10">
                    <div className="flex items-center space-x-2">
                      <TrafficLightButton
                        color="red"
                        icon={X}
                        onClick={() => onClose(windowId)}
                        isHovered={true}
                      />
                      <TrafficLightButton
                        color="yellow"
                        icon={Minus}
                        onClick={() => onMinimize(windowId)}
                        isHovered={true}
                      />
                      <TrafficLightButton
                        color="green"
                        icon={Square}
                        onClick={() => { }}
                        isHovered={true}
                      />
                    </div>

                    {/* Window Title */}
                    <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
                      <h3 className="text-gray-700 capitalize tracking-wide"
                        style={{
                          fontFamily: MACOS_DESIGN_SYSTEM.typography.fontFamily.system,
                          fontSize: MACOS_DESIGN_SYSTEM.typography.fontSize.footnote,
                          fontWeight: MACOS_DESIGN_SYSTEM.typography.fontWeight.medium
                        }}>
                        {windowId}
                      </h3>
                    </div>

                    {/* Right spacer for centering */}
                    <div className="w-16" />
                  </div>

                  {/* Title Bar Highlight */}
                  <div className="absolute top-0 left-0 right-0 h-px bg-white/80" />
                </div>

                {/* Window Content */}
                <div className="relative"
                  style={{
                    background: MACOS_DESIGN_SYSTEM.colors.systemBackground,
                    backdropFilter: MACOS_DESIGN_SYSTEM.blur.light,
                    WebkitBackdropFilter: MACOS_DESIGN_SYSTEM.blur.light
                  }}>
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.25, delay: 0.1 }}
                  >
                    {getWindowContent(windowId)}
                  </motion.div>
                </div>

                {/* Window Border Highlight */}
                <div className="absolute inset-0 rounded-xl border border-white/30 pointer-events-none" />
              </motion.div>
            </DialogContent>
          </Dialog>
        )
      })}
    </AnimatePresence>
  )
}