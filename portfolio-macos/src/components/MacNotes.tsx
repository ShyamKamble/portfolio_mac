"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import { 
  Search, 
  Plus, 
  Trash2, 
  Share, 
  MoreHorizontal,
  Edit3,
  Calendar,
  Clock,
  X,
  Minus,
  Square
} from "lucide-react"
import { MacNotesProps } from "@/types"
import { ANIMATIONS } from "@/constants"

interface Note {
  id: string
  title: string
  content: string
  preview: string
  date: Date
  folder: string
}

const SAMPLE_NOTES: Note[] = [
  {
    id: "1",
    title: "Portfolio Ideas",
    content: "# Portfolio Ideas\n\n- Add interactive animations\n- Implement dark mode\n- Create project showcase\n- Add contact form\n- Optimize performance",
    preview: "Add interactive animations, Implement dark mode, Create project showcase...",
    date: new Date(2025, 0, 24, 14, 30),
    folder: "Notes"
  },
  {
    id: "2", 
    title: "Meeting Notes - Jan 24",
    content: "# Team Meeting - January 24, 2025\n\n## Agenda\n- Project updates\n- Timeline review\n- Resource allocation\n\n## Action Items\n- [ ] Update documentation\n- [ ] Schedule follow-up\n- [ ] Review designs",
    preview: "Team Meeting - January 24, 2025. Agenda: Project updates, Timeline review...",
    date: new Date(2025, 0, 24, 10, 0),
    folder: "Work"
  },
  {
    id: "3",
    title: "Shopping List",
    content: "# Shopping List\n\n- [ ] Groceries\n  - Milk\n  - Bread\n  - Eggs\n- [ ] Electronics\n  - USB Cable\n  - Headphones\n- [ ] Books\n  - Design patterns\n  - React guide",
    preview: "Groceries: Milk, Bread, Eggs. Electronics: USB Cable, Headphones...",
    date: new Date(2025, 0, 23, 16, 45),
    folder: "Personal"
  }
]

export function MacNotes({ onClose, onMinimize, className }: MacNotesProps) {
  const [selectedNote, setSelectedNote] = useState<Note>(SAMPLE_NOTES[0])
  const [searchQuery, setSearchQuery] = useState("")
  const [isEditing, setIsEditing] = useState(false)
  const [editContent, setEditContent] = useState(selectedNote.content)

  const filteredNotes = SAMPLE_NOTES.filter(note =>
    note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    note.content.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const formatDate = (date: Date) => {
    const now = new Date()
    const diffTime = Math.abs(now.getTime() - date.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    
    if (diffDays === 1) return "Today"
    if (diffDays === 2) return "Yesterday"
    if (diffDays <= 7) return date.toLocaleDateString('en-US', { weekday: 'long' })
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  }

  const handleSave = () => {
    setSelectedNote(prev => ({ ...prev, content: editContent }))
    setIsEditing(false)
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: 20 }}
      transition={{ duration: ANIMATIONS.WINDOW_OPEN.duration, ease: ANIMATIONS.WINDOW_OPEN.ease }}
      className={`fixed inset-4 z-50 flex flex-col bg-white/95 backdrop-blur-xl rounded-xl shadow-2xl border border-gray-200/50 overflow-hidden ${className}`}
      style={{
        background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(248,250,252,0.95) 100%)'
      }}
    >
      {/* macOS Title Bar with Traffic Light Controls */}
      <div className="relative bg-gray-50/85 backdrop-blur-xl border-b border-gray-200/40">
        {/* Subtle title bar gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent"></div>
        
        {/* Traffic Light Controls */}
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center space-x-2">
            {/* Close Button */}
            <motion.button 
              className="w-3 h-3 bg-red-500 rounded-full hover:bg-red-600 transition-colors relative group"
              onClick={onClose}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <X className="w-2 h-2 text-red-800 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.button>
            
            {/* Minimize Button */}
            <motion.button 
              className="w-3 h-3 bg-yellow-500 rounded-full hover:bg-yellow-600 transition-colors relative group"
              onClick={onMinimize}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Minus className="w-2 h-2 text-yellow-800 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.button>
            
            {/* Maximize Button */}
            <motion.button 
              className="w-3 h-3 bg-green-500 rounded-full hover:bg-green-600 transition-colors relative group"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Square className="w-1.5 h-1.5 text-green-800 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.button>
          </div>
          
          {/* Window Title */}
          <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <h3 className="text-macos-window-title text-gray-700 tracking-wide">
              Notes
            </h3>
          </div>
          
          {/* Right spacer for centering */}
          <div className="w-16" />
        </div>
        
        {/* Title Bar Highlight */}
        <div className="absolute top-0 left-0 right-0 h-px bg-white/60" />
      </div>

      {/* Main Content Container */}
      <div className="flex flex-1 overflow-hidden">
      {/* Sidebar */}
      <div className="w-60 bg-gray-50/90 backdrop-blur-sm border-r border-gray-200/60 flex flex-col">
        {/* Sidebar Header */}
        <div className="px-3 py-3 border-b border-gray-200/40">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-macos-callout font-medium text-gray-900">Notes</h2>
            <button className="p-1 hover:bg-gray-200/60 rounded-md transition-colors">
              <Plus className="w-3.5 h-3.5 text-gray-600" />
            </button>
          </div>
          
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 transform -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-2.5 py-1.5 bg-white/80 border border-gray-200/60 rounded-md text-macos-footnote placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500/50 focus:border-blue-500/60"
            />
          </div>
        </div>

        {/* Notes List */}
        <div className="flex-1 overflow-y-auto">
          {filteredNotes.map((note) => (
            <motion.div
              key={note.id}
              className={`px-3 py-2.5 border-b border-gray-200/30 cursor-pointer transition-colors ${
                selectedNote.id === note.id 
                  ? 'bg-blue-500/10 border-l-2 border-l-blue-500' 
                  : 'hover:bg-gray-100/60'
              }`}
              onClick={() => {
                setSelectedNote(note)
                setEditContent(note.content)
                setIsEditing(false)
              }}
              whileHover={{ x: 1 }}
            >
              <h3 className="text-macos-footnote font-medium text-gray-900 mb-0.5 truncate">
                {note.title}
              </h3>
              <p className="text-macos-caption-1 text-gray-600 mb-1.5 line-clamp-2 leading-tight">
                {note.preview}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-macos-caption-2 text-gray-500">
                  {formatDate(note.date)}
                </span>
                <span className="text-macos-caption-2 text-gray-400 bg-gray-200/60 px-1.5 py-0.5 rounded text-xs">
                  {note.folder}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Toolbar */}
        <div className="px-4 py-3 border-b border-gray-200/40 bg-white/70 backdrop-blur-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <h1 className="text-macos-callout font-medium text-gray-900">
                {selectedNote.title}
              </h1>
              <div className="flex items-center space-x-1 text-gray-500">
                <Calendar className="w-3 h-3" />
                <span className="text-macos-caption-2">
                  {selectedNote.date.toLocaleDateString('en-US', { 
                    month: 'short', 
                    day: 'numeric',
                    hour: 'numeric',
                    minute: '2-digit'
                  })}
                </span>
              </div>
            </div>
            
            <div className="flex items-center space-x-1">
              <button
                onClick={() => setIsEditing(!isEditing)}
                className={`p-1.5 rounded-md transition-colors ${
                  isEditing 
                    ? 'bg-blue-100/80 text-blue-600' 
                    : 'hover:bg-gray-100/80 text-gray-600'
                }`}
              >
                <Edit3 className="w-3.5 h-3.5" />
              </button>
              <button className="p-1.5 hover:bg-gray-100/80 rounded-md transition-colors">
                <Share className="w-3.5 h-3.5 text-gray-600" />
              </button>
              <button className="p-1.5 hover:bg-gray-100/80 rounded-md transition-colors">
                <MoreHorizontal className="w-3.5 h-3.5 text-gray-600" />
              </button>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 p-4 overflow-y-auto bg-white/50">
          <AnimatePresence mode="wait">
            {isEditing ? (
              <motion.div
                key="editor"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="h-full"
              >
                <textarea
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                  className="w-full h-full resize-none border-none outline-none text-macos-callout text-gray-900 bg-transparent placeholder-gray-500 leading-relaxed"
                  placeholder="Start writing..."
                  style={{ 
                    fontFamily: 'SF Pro Text, -apple-system, BlinkMacSystemFont, sans-serif',
                    lineHeight: '1.5'
                  }}
                />
                <div className="flex justify-end space-x-2 mt-3">
                  <button
                    onClick={() => setIsEditing(false)}
                    className="px-3 py-1.5 text-macos-footnote text-gray-600 hover:bg-gray-100/80 rounded-md transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    className="px-3 py-1.5 text-macos-footnote text-white bg-blue-500 hover:bg-blue-600 rounded-md transition-colors"
                  >
                    Save
                  </button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="viewer"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="prose prose-gray max-w-none"
              >
                <div 
                  className="text-macos-callout text-gray-900 leading-relaxed whitespace-pre-wrap"
                  style={{ 
                    fontFamily: 'SF Pro Text, -apple-system, BlinkMacSystemFont, sans-serif',
                    lineHeight: '1.5'
                  }}
                >
                  {selectedNote.content}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      </div>
    </motion.div>
  )
}