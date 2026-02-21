"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "motion/react"
import { Search, Command, Calculator, Calendar, Mail, FileText, Folder, Globe, Clock } from "lucide-react"
import { MACOS_DESIGN_SYSTEM, ANIMATIONS } from "@/constants"

interface SpotlightResult {
  id: string
  title: string
  subtitle?: string
  icon: React.ComponentType<any>
  category: 'app' | 'file' | 'web' | 'calculation' | 'definition'
  action: () => void
}

interface SpotlightProps {
  isOpen: boolean
  onClose: () => void
  onOpenApp: (appId: string) => void
}

export function Spotlight({ isOpen, onClose, onOpenApp }: SpotlightProps) {
  const [query, setQuery] = useState("")
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [results, setResults] = useState<SpotlightResult[]>([])
  const inputRef = useRef<HTMLInputElement>(null)

  // Sample data for search results
  const searchData = [
    { id: "finder", title: "Finder", category: "app", icon: Folder },
    { id: "safari", title: "Safari", category: "app", icon: Globe },
    { id: "mail", title: "Mail", category: "app", icon: Mail },
    { id: "calendar", title: "Calendar", category: "app", icon: Calendar },
    { id: "notes", title: "Notes", category: "app", icon: FileText },
    { id: "documents", title: "Documents", category: "app", icon: FileText },
    { id: "trash", title: "Trash", category: "app", icon: FileText },
  ]

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  useEffect(() => {
    if (!query.trim()) {
      setResults([])
      setSelectedIndex(0)
      return
    }

    const filtered = searchData
      .filter(item => 
        item.title.toLowerCase().includes(query.toLowerCase())
      )
      .map(item => ({
        id: item.id,
        title: item.title,
        subtitle: `Application`,
        icon: item.icon,
        category: item.category as any,
        action: () => {
          onOpenApp(item.id)
          handleClose()
        }
      }))

    // Add calculation if query looks like math
    if (/^[\d+\-*/().\s]+$/.test(query)) {
      try {
        const result = eval(query)
        if (!isNaN(result)) {
          filtered.unshift({
            id: 'calc',
            title: `${query} = ${result}`,
            subtitle: 'Calculator',
            icon: Calculator,
            category: 'calculation',
            action: () => {
              navigator.clipboard.writeText(result.toString())
              handleClose()
            }
          })
        }
      } catch (e) {
        // Invalid calculation
      }
    }

    // Add web search option
    if (query.length > 2) {
      filtered.push({
        id: 'web',
        title: `Search for "${query}"`,
        subtitle: 'Search the web',
        icon: Globe,
        category: 'web',
        action: () => {
          window.open(`https://www.google.com/search?q=${encodeURIComponent(query)}`, '_blank')
          handleClose()
        }
      })
    }

    setResults(filtered.slice(0, 8))
    setSelectedIndex(0)
  }, [query, onOpenApp])

  const handleClose = () => {
    setQuery("")
    setResults([])
    setSelectedIndex(0)
    onClose()
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case 'Escape':
        handleClose()
        break
      case 'ArrowDown':
        e.preventDefault()
        setSelectedIndex(prev => Math.min(prev + 1, results.length - 1))
        break
      case 'ArrowUp':
        e.preventDefault()
        setSelectedIndex(prev => Math.max(prev - 1, 0))
        break
      case 'Enter':
        e.preventDefault()
        if (results[selectedIndex]) {
          results[selectedIndex].action()
        }
        break
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'app': return MACOS_DESIGN_SYSTEM.colors.systemBlue
      case 'file': return MACOS_DESIGN_SYSTEM.colors.systemGreen
      case 'web': return MACOS_DESIGN_SYSTEM.colors.systemPurple
      case 'calculation': return MACOS_DESIGN_SYSTEM.colors.systemOrange
      default: return MACOS_DESIGN_SYSTEM.colors.systemGray
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/20 backdrop-blur-sm"
            onClick={handleClose}
          />

          {/* Spotlight Window */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={ANIMATIONS.SPRING}
            className="fixed top-32 left-1/2 transform -translate-x-1/2 z-[101] w-full max-w-2xl mx-4"
          >
            <div
              className="rounded-xl shadow-2xl overflow-hidden border"
              style={{
                background: MACOS_DESIGN_SYSTEM.colors.windowBackground,
                backdropFilter: MACOS_DESIGN_SYSTEM.blur.heavy,
                WebkitBackdropFilter: MACOS_DESIGN_SYSTEM.blur.heavy,
                borderColor: MACOS_DESIGN_SYSTEM.colors.separator,
                boxShadow: MACOS_DESIGN_SYSTEM.shadows.window
              }}
            >
              {/* Search Input */}
              <div className="p-6 border-b" style={{ borderColor: MACOS_DESIGN_SYSTEM.colors.separator }}>
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    ref={inputRef}
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="w-full pl-12 pr-4 py-3 bg-transparent border-none outline-none text-gray-900 placeholder-gray-500"
                    placeholder="Spotlight Search"
                    style={{
                      fontFamily: MACOS_DESIGN_SYSTEM.typography.fontFamily.system,
                      fontSize: MACOS_DESIGN_SYSTEM.typography.fontSize.title3,
                      fontWeight: MACOS_DESIGN_SYSTEM.typography.fontWeight.regular
                    }}
                  />
                  <div className="absolute right-4 top-1/2 transform -translate-y-1/2 flex items-center space-x-1 text-gray-400">
                    <Command className="w-4 h-4" />
                    <span className="text-sm">Space</span>
                  </div>
                </div>
              </div>

              {/* Results */}
              {results.length > 0 && (
                <div className="max-h-96 overflow-y-auto">
                  {results.map((result, index) => {
                    const Icon = result.icon
                    const isSelected = index === selectedIndex
                    
                    return (
                      <motion.div
                        key={result.id}
                        className={`flex items-center px-6 py-3 cursor-pointer transition-colors ${
                          isSelected 
                            ? 'bg-blue-500 text-white' 
                            : 'hover:bg-gray-100/50 text-gray-900'
                        }`}
                        onClick={result.action}
                        whileHover={{ x: 2 }}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                      >
                        <div 
                          className={`w-10 h-10 rounded-lg flex items-center justify-center mr-4 ${
                            isSelected ? 'bg-white/20' : 'bg-gray-100'
                          }`}
                          style={{
                            backgroundColor: isSelected 
                              ? 'rgba(255, 255, 255, 0.2)' 
                              : getCategoryColor(result.category) + '20'
                          }}
                        >
                          <Icon 
                            className={`w-5 h-5 ${
                              isSelected 
                                ? 'text-white' 
                                : 'text-gray-700'
                            }`}
                            style={{
                              color: isSelected 
                                ? 'white' 
                                : getCategoryColor(result.category)
                            }}
                          />
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <h3 
                            className={`font-medium truncate ${
                              isSelected ? 'text-white' : 'text-gray-900'
                            }`}
                            style={{
                              fontFamily: MACOS_DESIGN_SYSTEM.typography.fontFamily.system,
                              fontSize: MACOS_DESIGN_SYSTEM.typography.fontSize.callout,
                              fontWeight: MACOS_DESIGN_SYSTEM.typography.fontWeight.medium
                            }}
                          >
                            {result.title}
                          </h3>
                          {result.subtitle && (
                            <p 
                              className={`text-sm truncate ${
                                isSelected ? 'text-white/80' : 'text-gray-500'
                              }`}
                              style={{
                                fontFamily: MACOS_DESIGN_SYSTEM.typography.fontFamily.system,
                                fontSize: MACOS_DESIGN_SYSTEM.typography.fontSize.caption1
                              }}
                            >
                              {result.subtitle}
                            </p>
                          )}
                        </div>

                        {/* Keyboard shortcut hint */}
                        {index === selectedIndex && (
                          <div className="flex items-center space-x-1 text-white/60 text-xs">
                            <span>⏎</span>
                          </div>
                        )}
                      </motion.div>
                    )
                  })}
                </div>
              )}

              {/* No Results */}
              {query && results.length === 0 && (
                <div className="px-6 py-8 text-center">
                  <Search className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-500" style={{
                    fontFamily: MACOS_DESIGN_SYSTEM.typography.fontFamily.system,
                    fontSize: MACOS_DESIGN_SYSTEM.typography.fontSize.callout
                  }}>
                    No results for "{query}"
                  </p>
                </div>
              )}

              {/* Footer */}
              {!query && (
                <div className="px-6 py-4 border-t text-center" style={{ borderColor: MACOS_DESIGN_SYSTEM.colors.separator }}>
                  <p className="text-gray-500 text-sm" style={{
                    fontFamily: MACOS_DESIGN_SYSTEM.typography.fontFamily.system,
                    fontSize: MACOS_DESIGN_SYSTEM.typography.fontSize.caption1
                  }}>
                    Search for apps, files, and more
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}