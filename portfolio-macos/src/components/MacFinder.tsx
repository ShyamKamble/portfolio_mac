"use client"

import { motion } from "motion/react"
import { useState } from "react"
import { 
  ChevronLeft, 
  ChevronRight, 
  Grid3X3, 
  List, 
  Columns, 
  Search,
  Eye,
  FileText
} from "lucide-react"
import { MacFinderProps, FileItem, ViewMode } from "@/types"
import { ALL_FILES, ANIMATIONS } from "@/constants"
import { ResumePreview } from "@/components/ResumePreview"

export function MacFinder({ onClose, onMinimize }: MacFinderProps) {
  const [selectedFile, setSelectedFile] = useState<FileItem | null>(null)
  const [viewMode, setViewMode] = useState<ViewMode>('icon')
  const [previewImage, setPreviewImage] = useState<string | null>(null)
  const [showResumePreview, setShowResumePreview] = useState(false)

  const handleFileClick = (file: FileItem) => {
    setSelectedFile(file)
  }

  const handleFileDoubleClick = (file: FileItem) => {
    if (file.type === "PDF Document") {
      setShowResumePreview(true)
    } else {
      setPreviewImage(file.path)
    }
  }

  const handlePreviewClick = (file: FileItem, e: React.MouseEvent) => {
    e.stopPropagation()
    if (file.type === "PDF Document") {
      setShowResumePreview(true)
    } else {
      setPreviewImage(file.path)
    }
  }

  const renderFileIcon = (file: FileItem) => {
    if (file.type === "PDF Document") {
      return (
        <div className="w-full h-24 bg-red-100 rounded-md shadow-sm group-hover:shadow-md transition-shadow flex items-center justify-center">
          <FileText className="w-8 h-8 text-red-600" />
        </div>
      )
    } else {
      return (
        <img
          src={file.path}
          alt={file.name}
          className="w-full h-24 object-cover rounded-md shadow-sm group-hover:shadow-md transition-shadow"
        />
      )
    }
  }

  const renderListIcon = (file: FileItem) => {
    if (file.type === "PDF Document") {
      return (
        <div className="w-6 h-6 bg-red-100 rounded flex items-center justify-center">
          <FileText className="w-4 h-4 text-red-600" />
        </div>
      )
    } else {
      return (
        <img
          src={file.path}
          alt={file.name}
          className="w-6 h-6 object-cover rounded"
        />
      )
    }
  }

  const renderIconView = () => (
    <div className="grid grid-cols-4 gap-4">
      {ALL_FILES.map((file, index) => (
        <motion.div
          key={file.name}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className={`group cursor-pointer p-3 rounded-lg transition-all hover:bg-blue-50/50 ${
            selectedFile?.name === file.name ? 'bg-blue-100/50 ring-2 ring-blue-500/50' : ''
          }`}
          onClick={() => handleFileClick(file)}
          onDoubleClick={() => handleFileDoubleClick(file)}
        >
          <div className="relative mb-2">
            {renderFileIcon(file)}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-md opacity-0 group-hover:opacity-100 transition-opacity" />
            <button
              onClick={(e) => handlePreviewClick(file, e)}
              className="absolute top-2 right-2 p-1 bg-white/80 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white"
            >
              <Eye className="w-3 h-3 text-gray-600" />
            </button>
          </div>
          <div className="text-xs text-gray-700 font-medium truncate">{file.name}</div>
          <div className="text-xs text-gray-500">{file.size}</div>
        </motion.div>
      ))}
    </div>
  )

  const renderListView = () => (
    <div className="space-y-1">
      <div className="grid grid-cols-4 gap-4 px-3 py-2 text-xs font-medium text-gray-500 border-b border-gray-200/30">
        <div>Name</div>
        <div>Size</div>
        <div>Type</div>
        <div>Modified</div>
      </div>
      {ALL_FILES.map((file, index) => (
        <motion.div
          key={file.name}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.05 }}
          className={`grid grid-cols-4 gap-4 px-3 py-2 rounded-md cursor-pointer transition-all hover:bg-blue-50/50 ${
            selectedFile?.name === file.name ? 'bg-blue-100/50' : ''
          }`}
          onClick={() => handleFileClick(file)}
          onDoubleClick={() => handleFileDoubleClick(file)}
        >
          <div className="flex items-center space-x-2">
            {renderListIcon(file)}
            <span className="text-sm text-gray-700 truncate">{file.name}</span>
          </div>
          <div className="text-sm text-gray-500">{file.size}</div>
          <div className="text-sm text-gray-500">{file.type}</div>
          <div className="text-sm text-gray-500">Today</div>
        </motion.div>
      ))}
    </div>
  )

  return (
    <>
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        transition={{ duration: ANIMATIONS.WINDOW_OPEN.duration, ease: ANIMATIONS.WINDOW_OPEN.ease }}
        className="fixed inset-4 z-50 flex flex-col bg-white/95 backdrop-blur-xl rounded-xl shadow-2xl border border-gray-200/50"
        style={{
          background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(248,250,252,0.95) 100%)'
        }}
      >
        {/* Window Chrome */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200/50">
          {/* Traffic Lights */}
          <div className="flex items-center space-x-2">
            <button
              onClick={onClose}
              className="w-3 h-3 bg-red-500 rounded-full hover:bg-red-600 transition-colors shadow-sm"
            />
            <button 
              onClick={onMinimize}
              className="w-3 h-3 bg-yellow-500 rounded-full hover:bg-yellow-600 transition-colors shadow-sm"
            />
            <button className="w-3 h-3 bg-green-500 rounded-full hover:bg-green-600 transition-colors shadow-sm" />
          </div>
          
          {/* Window Title */}
          <div className="absolute left-1/2 transform -translate-x-1/2">
            <span className="text-macos-body font-medium text-gray-800">Files</span>
          </div>
          
          <div className="w-16" /> {/* Spacer */}
        </div>

        {/* Toolbar */}
        <div className="flex items-center justify-between px-4 py-2 border-b border-gray-200/30 bg-gray-50/50">
          {/* Navigation */}
          <div className="flex items-center space-x-1">
            <button className="p-1.5 rounded-md hover:bg-gray-200/50 transition-colors">
              <ChevronLeft className="w-4 h-4 text-gray-600" />
            </button>
            <button className="p-1.5 rounded-md hover:bg-gray-200/50 transition-colors">
              <ChevronRight className="w-4 h-4 text-gray-600" />
            </button>
          </div>

          {/* View Controls */}
          <div className="flex items-center space-x-1 bg-white/60 rounded-lg p-1 shadow-sm">
            <button
              onClick={() => setViewMode('icon')}
              className={`p-1.5 rounded-md transition-colors ${
                viewMode === 'icon' ? 'bg-blue-500 text-white shadow-sm' : 'text-gray-600 hover:bg-gray-200/50'
              }`}
            >
              <Grid3X3 className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded-md transition-colors ${
                viewMode === 'list' ? 'bg-blue-500 text-white shadow-sm' : 'text-gray-600 hover:bg-gray-200/50'
              }`}
            >
              <List className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('column')}
              className={`p-1.5 rounded-md transition-colors ${
                viewMode === 'column' ? 'bg-blue-500 text-white shadow-sm' : 'text-gray-600 hover:bg-gray-200/50'
              }`}
            >
              <Columns className="w-4 h-4" />
            </button>
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search"
              className="pl-9 pr-4 py-1.5 bg-white/60 border border-gray-200/50 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
            />
          </div>
        </div>

        {/* Main Content */}
        <div className="flex flex-1 overflow-hidden">
          {/* Sidebar */}
          <div className="w-48 bg-gray-50/30 border-r border-gray-200/30 p-3">
            <div className="space-y-1">
              <div className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">Favorites</div>
              <button className="w-full text-left px-3 py-1.5 rounded-md hover:bg-gray-200/50 transition-colors text-sm text-gray-700">
                Desktop
              </button>
              <button className="w-full text-left px-3 py-1.5 rounded-md bg-blue-100/50 text-blue-700 text-sm font-medium">
                Files
              </button>
              <button className="w-full text-left px-3 py-1.5 rounded-md hover:bg-gray-200/50 transition-colors text-sm text-gray-700">
                Documents
              </button>
              <button className="w-full text-left px-3 py-1.5 rounded-md hover:bg-gray-200/50 transition-colors text-sm text-gray-700">
                Downloads
              </button>
            </div>
          </div>

          {/* Content Area */}
          <div className="flex-1 p-4 overflow-auto">
            {viewMode === 'icon' && renderIconView()}
            {viewMode === 'list' && renderListView()}
          </div>
        </div>

        {/* Status Bar */}
        <div className="px-4 py-2 border-t border-gray-200/30 bg-gray-50/30">
          <div className="flex items-center justify-between text-xs text-gray-500">
            <span>{ALL_FILES.length} items</span>
            <span>{selectedFile ? `${selectedFile.name} selected` : ''}</span>
          </div>
        </div>
      </motion.div>

      {/* Image Preview Modal */}
      {previewImage && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-60 bg-black/80 backdrop-blur-sm flex items-center justify-center p-8"
          onClick={() => setPreviewImage(null)}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="relative max-w-4xl max-h-full"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={previewImage}
              alt="Preview"
              className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
            />
          </motion.div>
        </motion.div>
      )}

      {/* Resume Preview Modal */}
      {showResumePreview && (
        <ResumePreview onClose={() => setShowResumePreview(false)} />
      )}
    </>
  )
}