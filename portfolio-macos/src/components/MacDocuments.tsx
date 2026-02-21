"use client"

import { useState } from "react"
import { motion } from "motion/react"
import { 
  Search, 
  Grid3X3, 
  List, 
  Columns, 
  ArrowLeft,
  ArrowRight,
  X,
  Minus,
  Square,
  FileText,
  Image,
  Folder,
  Download,
  Share,
  Eye
} from "lucide-react"
import { MacDocumentsProps } from "@/types"
import { ANIMATIONS } from "@/constants"

interface DocumentItem {
  id: string
  name: string
  type: 'pdf' | 'doc' | 'txt' | 'image' | 'folder'
  size: string
  dateModified: Date
  preview?: string
}

const SAMPLE_DOCUMENTS: DocumentItem[] = [
  {
    id: "1",
    name: "Resume.pdf",
    type: 'pdf',
    size: "245 KB",
    dateModified: new Date(2025, 0, 24, 10, 30),
    preview: "/resume-preview.jpg"
  },
  {
    id: "2",
    name: "Project Proposal.doc",
    type: 'doc',
    size: "1.2 MB",
    dateModified: new Date(2025, 0, 23, 14, 15)
  },
  {
    id: "3",
    name: "Meeting Notes.txt",
    type: 'txt',
    size: "12 KB",
    dateModified: new Date(2025, 0, 22, 9, 45)
  },
  {
    id: "4",
    name: "Screenshots",
    type: 'folder',
    size: "15 items",
    dateModified: new Date(2025, 0, 21, 16, 20)
  }
]

export function MacDocuments({ onClose, onMinimize, className }: MacDocumentsProps) {
  const [documents, setDocuments] = useState(SAMPLE_DOCUMENTS)
  const [viewMode, setViewMode] = useState<'icon' | 'list' | 'column'>('icon')
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedItem, setSelectedItem] = useState<DocumentItem | null>(null)

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'pdf': return '📄'
      case 'doc': return '📝'
      case 'txt': return '📃'
      case 'image': return '🖼️'
      case 'folder': return '📁'
      default: return '📄'
    }
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    })
  }

  const filteredDocuments = documents.filter(doc =>
    doc.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

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
      {/* macOS Title Bar */}
      <div className="relative bg-gray-50/85 backdrop-blur-xl border-b border-gray-200/40">
        <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent"></div>
        
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center space-x-2">
            <motion.button 
              className="w-3 h-3 bg-red-500 rounded-full hover:bg-red-600 transition-colors relative group"
              onClick={onClose}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <X className="w-2 h-2 text-red-800 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.button>
            
            <motion.button 
              className="w-3 h-3 bg-yellow-500 rounded-full hover:bg-yellow-600 transition-colors relative group"
              onClick={onMinimize}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Minus className="w-2 h-2 text-yellow-800 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.button>
            
            <motion.button 
              className="w-3 h-3 bg-green-500 rounded-full hover:bg-green-600 transition-colors relative group"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Square className="w-1.5 h-1.5 text-green-800 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.button>
          </div>
          
          <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <h3 className="text-macos-window-title text-gray-700 tracking-wide">
              Documents
            </h3>
          </div>
          
          <div className="w-16" />
        </div>
        
        <div className="absolute top-0 left-0 right-0 h-px bg-white/60" />
      </div>

      {/* Toolbar */}
      <div className="flex items-center justify-between px-4 py-2 bg-white/70 border-b border-gray-200/30">
        <div className="flex items-center space-x-2">
          <button className="p-1.5 hover:bg-gray-100/60 rounded-md transition-colors">
            <ArrowLeft className="w-4 h-4 text-gray-600" />
          </button>
          <button className="p-1.5 hover:bg-gray-100/60 rounded-md transition-colors">
            <ArrowRight className="w-4 h-4 text-gray-600" />
          </button>
        </div>

        <div className="flex-1 mx-4">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-3 h-3 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 bg-gray-100/80 border border-gray-200/50 rounded-md text-macos-footnote focus:outline-none focus:ring-1 focus:ring-blue-500/50"
              placeholder="Search Documents"
            />
          </div>
        </div>

        <div className="flex items-center space-x-1">
          {[
            { icon: Grid3X3, mode: 'icon' as const },
            { icon: List, mode: 'list' as const },
            { icon: Columns, mode: 'column' as const }
          ].map(({ icon: Icon, mode }) => (
            <button
              key={mode}
              onClick={() => setViewMode(mode)}
              className={`p-1.5 rounded-md transition-colors ${
                viewMode === mode 
                  ? 'bg-blue-100/60 text-blue-600' 
                  : 'hover:bg-gray-100/60 text-gray-600'
              }`}
            >
              <Icon className="w-4 h-4" />
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-4 overflow-y-auto bg-white/50">
        {viewMode === 'icon' && (
          <div className="grid grid-cols-4 gap-4">
            {filteredDocuments.map((doc) => (
              <motion.div
                key={doc.id}
                className="flex flex-col items-center p-4 rounded-lg hover:bg-gray-100/60 cursor-pointer transition-colors"
                onClick={() => setSelectedItem(doc)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="text-4xl mb-2">
                  {getFileIcon(doc.type)}
                </div>
                <h3 className="text-macos-caption-1 font-medium text-gray-900 text-center truncate w-full">
                  {doc.name}
                </h3>
                <p className="text-macos-caption-2 text-gray-500 text-center">
                  {doc.size}
                </p>
              </motion.div>
            ))}
          </div>
        )}

        {viewMode === 'list' && (
          <div className="space-y-1">
            {filteredDocuments.map((doc) => (
              <motion.div
                key={doc.id}
                className="flex items-center p-3 rounded-lg hover:bg-gray-100/60 cursor-pointer transition-colors"
                onClick={() => setSelectedItem(doc)}
                whileHover={{ x: 2 }}
              >
                <div className="text-2xl mr-3">
                  {getFileIcon(doc.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-macos-footnote font-medium text-gray-900 truncate">
                    {doc.name}
                  </h3>
                  <p className="text-macos-caption-2 text-gray-500">
                    {formatDate(doc.dateModified)} • {doc.size}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <button className="p-1 hover:bg-gray-200/60 rounded transition-colors">
                    <Eye className="w-3 h-3 text-gray-500" />
                  </button>
                  <button className="p-1 hover:bg-gray-200/60 rounded transition-colors">
                    <Share className="w-3 h-3 text-gray-500" />
                  </button>
                  <button className="p-1 hover:bg-gray-200/60 rounded transition-colors">
                    <Download className="w-3 h-3 text-gray-500" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {filteredDocuments.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <FileText className="w-16 h-16 text-gray-300 mb-4" />
            <h2 className="text-macos-title-3 text-gray-500 mb-2">No Documents Found</h2>
            <p className="text-macos-body text-gray-400">
              {searchQuery ? 'Try adjusting your search terms.' : 'Your documents will appear here.'}
            </p>
          </div>
        )}
      </div>

      {/* Quick Look Preview */}
      {selectedItem && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-60 bg-black/40 backdrop-blur-sm flex items-center justify-center p-8"
          onClick={() => setSelectedItem(null)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white/95 backdrop-blur-xl rounded-xl p-6 max-w-2xl w-full border border-gray-200/50"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-macos-callout font-medium text-gray-900">
                {selectedItem.name}
              </h3>
              <button
                onClick={() => setSelectedItem(null)}
                className="p-1 hover:bg-gray-100/60 rounded transition-colors"
              >
                <X className="w-4 h-4 text-gray-500" />
              </button>
            </div>
            
            <div className="text-center py-12">
              <div className="text-6xl mb-4">
                {getFileIcon(selectedItem.type)}
              </div>
              <p className="text-macos-footnote text-gray-600 mb-2">
                Size: {selectedItem.size}
              </p>
              <p className="text-macos-caption-2 text-gray-500">
                Modified: {formatDate(selectedItem.dateModified)}
              </p>
            </div>
            
            <div className="flex justify-center space-x-3">
              <button className="px-4 py-2 text-macos-footnote text-white bg-blue-500 hover:bg-blue-600 rounded-md transition-colors">
                Open
              </button>
              <button className="px-4 py-2 text-macos-footnote text-gray-600 hover:bg-gray-100/60 rounded-md transition-colors">
                Share
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  )
}