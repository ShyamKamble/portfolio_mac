"use client"

import { useState } from "react"
import { motion } from "motion/react"
import { 
  Trash2, 
  RotateCcw, 
  X,
  Minus,
  Square,
  FileText,
  Image,
  Folder,
  AlertTriangle
} from "lucide-react"
import { MacTrashProps } from "@/types"
import { ANIMATIONS } from "@/constants"

interface TrashItem {
  id: string
  name: string
  type: 'file' | 'folder' | 'image'
  size: string
  dateDeleted: Date
  originalPath: string
}

const SAMPLE_TRASH_ITEMS: TrashItem[] = [
  {
    id: "1",
    name: "Old Project Files",
    type: 'folder',
    size: "45.2 MB",
    dateDeleted: new Date(2025, 0, 23, 14, 30),
    originalPath: "~/Documents/Projects"
  },
  {
    id: "2",
    name: "screenshot-2025-01-20.png",
    type: 'image',
    size: "2.1 MB",
    dateDeleted: new Date(2025, 0, 22, 9, 15),
    originalPath: "~/Desktop"
  },
  {
    id: "3",
    name: "draft-document.txt",
    type: 'file',
    size: "12 KB",
    dateDeleted: new Date(2025, 0, 21, 16, 45),
    originalPath: "~/Documents"
  }
]

export function MacTrash({ onClose, onMinimize, className }: MacTrashProps) {
  const [trashItems, setTrashItems] = useState(SAMPLE_TRASH_ITEMS)
  const [selectedItems, setSelectedItems] = useState<string[]>([])
  const [showEmptyConfirm, setShowEmptyConfirm] = useState(false)

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit'
    })
  }

  const getIcon = (type: string) => {
    switch (type) {
      case 'folder': return Folder
      case 'image': return Image
      case 'file': return FileText
      default: return FileText
    }
  }

  const restoreItems = () => {
    setTrashItems(prev => prev.filter(item => !selectedItems.includes(item.id)))
    setSelectedItems([])
  }

  const deleteForever = () => {
    setTrashItems(prev => prev.filter(item => !selectedItems.includes(item.id)))
    setSelectedItems([])
  }

  const emptyTrash = () => {
    setTrashItems([])
    setSelectedItems([])
    setShowEmptyConfirm(false)
  }

  const toggleSelection = (itemId: string) => {
    setSelectedItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    )
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
              Trash
            </h3>
          </div>
          
          <div className="w-16" />
        </div>
        
        <div className="absolute top-0 left-0 right-0 h-px bg-white/60" />
      </div>

      {/* Toolbar */}
      <div className="flex items-center justify-between px-4 py-2 bg-white/70 border-b border-gray-200/30">
        <div className="flex items-center space-x-2">
          <button
            onClick={restoreItems}
            disabled={selectedItems.length === 0}
            className={`flex items-center space-x-1 px-3 py-1.5 rounded-md transition-colors ${
              selectedItems.length > 0
                ? 'bg-blue-100/60 text-blue-700 hover:bg-blue-200/60'
                : 'text-gray-400 cursor-not-allowed'
            }`}
          >
            <RotateCcw className="w-3 h-3" />
            <span className="text-macos-footnote">Put Back</span>
          </button>
          
          <button
            onClick={deleteForever}
            disabled={selectedItems.length === 0}
            className={`flex items-center space-x-1 px-3 py-1.5 rounded-md transition-colors ${
              selectedItems.length > 0
                ? 'bg-red-100/60 text-red-700 hover:bg-red-200/60'
                : 'text-gray-400 cursor-not-allowed'
            }`}
          >
            <X className="w-3 h-3" />
            <span className="text-macos-footnote">Delete Forever</span>
          </button>
        </div>

        <button
          onClick={() => setShowEmptyConfirm(true)}
          disabled={trashItems.length === 0}
          className={`flex items-center space-x-1 px-3 py-1.5 rounded-md transition-colors ${
            trashItems.length > 0
              ? 'bg-red-100/60 text-red-700 hover:bg-red-200/60'
              : 'text-gray-400 cursor-not-allowed'
          }`}
        >
          <Trash2 className="w-3 h-3" />
          <span className="text-macos-footnote">Empty Trash</span>
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 p-4 overflow-y-auto bg-white/50">
        {trashItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <Trash2 className="w-16 h-16 text-gray-300 mb-4" />
            <h2 className="text-macos-title-3 text-gray-500 mb-2">Trash is Empty</h2>
            <p className="text-macos-body text-gray-400">
              Items you delete will appear here before being permanently removed.
            </p>
          </div>
        ) : (
          <div className="space-y-2">
            {trashItems.map((item) => {
              const Icon = getIcon(item.type)
              const isSelected = selectedItems.includes(item.id)
              
              return (
                <motion.div
                  key={item.id}
                  className={`flex items-center p-3 rounded-lg cursor-pointer transition-colors ${
                    isSelected 
                      ? 'bg-blue-100/60 border border-blue-200/60' 
                      : 'hover:bg-gray-100/60'
                  }`}
                  onClick={() => toggleSelection(item.id)}
                  whileHover={{ x: 2 }}
                >
                  <Icon className={`w-8 h-8 mr-3 ${
                    item.type === 'folder' ? 'text-blue-500' :
                    item.type === 'image' ? 'text-green-500' :
                    'text-gray-500'
                  }`} />
                  
                  <div className="flex-1 min-w-0">
                    <h3 className="text-macos-callout font-medium text-gray-900 truncate">
                      {item.name}
                    </h3>
                    <p className="text-macos-caption-1 text-gray-600">
                      {item.size} • Deleted {formatDate(item.dateDeleted)}
                    </p>
                    <p className="text-macos-caption-2 text-gray-500">
                      Original location: {item.originalPath}
                    </p>
                  </div>
                  
                  {isSelected && (
                    <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                  )}
                </motion.div>
              )
            })}
          </div>
        )}
      </div>

      {/* Empty Trash Confirmation */}
      {showEmptyConfirm && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-60 bg-black/40 backdrop-blur-sm flex items-center justify-center"
          onClick={() => setShowEmptyConfirm(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white/95 backdrop-blur-xl rounded-xl p-6 max-w-md mx-4 border border-gray-200/50"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center mb-4">
              <AlertTriangle className="w-6 h-6 text-red-500 mr-3" />
              <h3 className="text-macos-callout font-medium text-gray-900">
                Empty Trash?
              </h3>
            </div>
            
            <p className="text-macos-footnote text-gray-600 mb-6">
              Are you sure you want to permanently erase {trashItems.length} item{trashItems.length !== 1 ? 's' : ''}? 
              This action cannot be undone.
            </p>
            
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowEmptyConfirm(false)}
                className="px-4 py-2 text-macos-footnote text-gray-600 hover:bg-gray-100/60 rounded-md transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={emptyTrash}
                className="px-4 py-2 text-macos-footnote text-white bg-red-500 hover:bg-red-600 rounded-md transition-colors"
              >
                Empty Trash
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  )
}