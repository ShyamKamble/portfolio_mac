"use client"

import { useState, useCallback, useMemo, useRef, memo, startTransition } from "react"
import { motion, AnimatePresence } from "motion/react"
import { 
  Plus, 
  Search, 
  MoreHorizontal,
  ChevronLeft,
  Edit3,
  Share,
  Star,
  Bold,
  Italic,
  Underline,
  Code,
  Link,
  Image,
  Hash,
  AlignLeft,
  AlignCenter,
  AlignRight,
  X,
  Minus,
  Square,
  FileText,
  Database,
  Calendar,
  List,
  Grid3X3,
  Eye,
  Archive,
  Trash2,
  Type,
  Palette,
  ChevronDown,
  ChevronRight,
  Filter,
  Settings,
  Clock,
  Users,
  Tag,
  Bookmark,
  MessageSquare,
  Bell,
  Download,
  Upload,
  Copy,
  Move,
  RotateCcw,
  Zap,
  Target,
  TrendingUp,
  BarChart3,
  PieChart,
  Activity,
  Layers,
  Globe,
  Smartphone,
  Monitor,
  Tablet,
  Headphones,
  Camera,
  Video,
  Mic,
  Speaker,
  Wifi,
  Battery,
  Cpu,
  HardDrive,
  MemoryStick,
  Server,
  Cloud,
  Shield,
  Lock,
  Key,
  UserCheck,
  Mail,
  Phone,
  MapPin
} from "lucide-react"
import { MacNotesProps } from "@/types"
import { ANIMATIONS, MACOS_DESIGN_SYSTEM } from "@/constants"

// Enhanced Notion-like interfaces with comprehensive typing
interface NotionBlock {
  id: string
  type: 'paragraph' | 'heading1' | 'heading2' | 'heading3' | 'bulleted_list' | 'numbered_list' | 'to_do' | 'toggle' | 'quote' | 'divider' | 'callout' | 'code' | 'image' | 'video' | 'file' | 'bookmark' | 'table' | 'column_list' | 'embed' | 'equation' | 'breadcrumb' | 'table_of_contents' | 'link_preview' | 'synced_block' | 'template' | 'child_page' | 'child_database'
  content: string
  properties?: {
    title?: string
    checked?: boolean
    language?: string
    caption?: string
    url?: string
    icon?: string
    color?: string
    backgroundColor?: string
  }
  children?: NotionBlock[]
  createdTime: Date
  lastEditedTime: Date
}

interface NotionProperty {
  id: string
  name: string
  type: 'title' | 'rich_text' | 'number' | 'select' | 'multi_select' | 'date' | 'person' | 'files' | 'checkbox' | 'url' | 'email' | 'phone_number' | 'formula' | 'relation' | 'rollup' | 'created_time' | 'created_by' | 'last_edited_time' | 'last_edited_by' | 'status'
  options?: Array<{
    id: string
    name: string
    color: string
  }>
  formula?: {
    expression: string
  }
  relation?: {
    database_id: string
    type: 'single_property' | 'dual_property'
  }
}

interface NotionPage {
  id: string
  title: string
  icon?: string
  cover?: string
  type: 'page' | 'database' | 'template'
  content: NotionBlock[]
  properties: Record<string, any>
  tags: string[]
  lastModified: Date
  createdTime: Date
  isFavorite: boolean
  isArchived: boolean
  parentId?: string
  children?: NotionPage[]
  permissions: {
    read: boolean
    write: boolean
    comment: boolean
    share: boolean
  }
  collaborators: Array<{
    id: string
    name: string
    email: string
    avatar?: string
    role: 'owner' | 'editor' | 'commenter' | 'viewer'
  }>
  comments: Array<{
    id: string
    author: string
    content: string
    createdTime: Date
    resolved: boolean
  }>
  version: number
  templateId?: string
}

interface NotionDatabase {
  id: string
  name: string
  description?: string
  icon: string
  cover?: string
  type: 'table' | 'board' | 'list' | 'calendar' | 'gallery' | 'timeline'
  properties: Record<string, NotionProperty>
  pages: NotionPage[]
  views: Array<{
    id: string
    name: string
    type: 'table' | 'board' | 'list' | 'calendar' | 'gallery' | 'timeline'
    filter?: any
    sort?: any
    groupBy?: string
  }>
  permissions: {
    read: boolean
    write: boolean
    comment: boolean
    share: boolean
  }
  createdTime: Date
  lastEditedTime: Date
}

// Simple to-do list sample data
const SAMPLE_PAGES: NotionPage[] = [
  {
    id: "1",
    title: "✅ My To-Do List",
    icon: "✅",
    type: "page",
    content: [
      {
        id: "b1",
        type: "heading1",
        content: "My To-Do List",
        properties: {},
        children: [],
        createdTime: new Date(2025, 0, 1),
        lastEditedTime: new Date(2025, 0, 24)
      },
      {
        id: "b2",
        type: "to_do",
        content: "Land my dream UX job",
        properties: { checked: false },
        children: [],
        createdTime: new Date(2025, 0, 1),
        lastEditedTime: new Date(2025, 0, 24)
      },
      {
        id: "b3",
        type: "to_do",
        content: "Drink water",
        properties: { checked: false },
        children: [],
        createdTime: new Date(2025, 0, 1),
        lastEditedTime: new Date(2025, 0, 24)
      },
      {
        id: "b4",
        type: "to_do",
        content: "Move to the US",
        properties: { checked: false },
        children: [],
        createdTime: new Date(2025, 0, 1),
        lastEditedTime: new Date(2025, 0, 24)
      },
      {
        id: "b5",
        type: "to_do",
        content: "Finish grad school without losing my mind",
        properties: { checked: false },
        children: [],
        createdTime: new Date(2025, 0, 1),
        lastEditedTime: new Date(2025, 0, 24)
      },
      {
        id: "b6",
        type: "to_do",
        content: "Get really good at pottery glazing",
        properties: { checked: false },
        children: [],
        createdTime: new Date(2025, 0, 1),
        lastEditedTime: new Date(2025, 0, 24)
      },
      {
        id: "b7",
        type: "to_do",
        content: "World domination",
        properties: { checked: false },
        children: [],
        createdTime: new Date(2025, 0, 1),
        lastEditedTime: new Date(2025, 0, 24)
      },
      {
        id: "b8",
        type: "to_do",
        content: "Eat really good ice cream today",
        properties: { checked: false },
        children: [],
        createdTime: new Date(2025, 0, 1),
        lastEditedTime: new Date(2025, 0, 24)
      },
      {
        id: "b9",
        type: "to_do",
        content: "Travel somewhere new every year",
        properties: { checked: false },
        children: [],
        createdTime: new Date(2025, 0, 1),
        lastEditedTime: new Date(2025, 0, 24)
      }
    ],
    properties: {},
    tags: ["personal", "goals", "life"],
    lastModified: new Date(2025, 0, 24, 14, 30),
    createdTime: new Date(2025, 0, 1),
    isFavorite: true,
    isArchived: false,
    permissions: {
      read: true,
      write: true,
      comment: true,
      share: true
    },
    collaborators: [],
    comments: [],
    version: 1
  }
]

const SAMPLE_DATABASES: NotionDatabase[] = [
  {
    id: "db1",
    name: "📝 Notes",
    description: "Quick notes and ideas",
    icon: "📝",
    type: "list",
    properties: {
      title: { 
        id: "title", 
        name: "Title", 
        type: "title" 
      },
      category: { 
        id: "category", 
        name: "Category", 
        type: "select",
        options: [
          { id: "personal", name: "Personal", color: "blue" },
          { id: "work", name: "Work", color: "green" },
          { id: "ideas", name: "Ideas", color: "purple" }
        ]
      }
    },
    pages: [],
    views: [
      {
        id: "v1",
        name: "All Notes",
        type: "list"
      }
    ],
    permissions: {
      read: true,
      write: true,
      comment: true,
      share: true
    },
    createdTime: new Date(2025, 0, 10),
    lastEditedTime: new Date(2025, 0, 24)
  }
]

// Memoized components for performance optimization
const BlockRenderer = memo(({ block, onEdit }: { block: NotionBlock; onEdit?: (blockId: string, content: string) => void }) => {
  const handleEdit = useCallback((content: string) => {
    onEdit?.(block.id, content)
  }, [block.id, onEdit])

  switch (block.type) {
    case 'heading1':
      return (
        <h1 className="text-3xl font-bold text-gray-900 mb-4 mt-8 first:mt-0" 
            style={{ 
              fontFamily: MACOS_DESIGN_SYSTEM.typography.fontFamily.system,
              color: block.properties?.color ? `var(--notion-${block.properties.color})` : undefined
            }}>
          {block.content}
        </h1>
      )
    case 'heading2':
      return (
        <h2 className="text-2xl font-semibold text-gray-900 mb-3 mt-6" 
            style={{ 
              fontFamily: MACOS_DESIGN_SYSTEM.typography.fontFamily.system,
              color: block.properties?.color ? `var(--notion-${block.properties.color})` : undefined
            }}>
          {block.content}
        </h2>
      )
    case 'heading3':
      return (
        <h3 className="text-xl font-semibold text-gray-900 mb-2 mt-4" 
            style={{ 
              fontFamily: MACOS_DESIGN_SYSTEM.typography.fontFamily.system,
              color: block.properties?.color ? `var(--notion-${block.properties.color})` : undefined
            }}>
          {block.content}
        </h3>
      )
    case 'paragraph':
      return (
        <p className="text-gray-700 mb-3 leading-relaxed" 
           style={{ fontFamily: MACOS_DESIGN_SYSTEM.typography.fontFamily.system }}>
          {block.content}
        </p>
      )
    case 'bulleted_list':
      return (
        <div className="flex items-start mb-2">
          <span className="text-gray-400 mr-3 mt-1">•</span>
          <span className="text-gray-700 leading-relaxed" 
                style={{ fontFamily: MACOS_DESIGN_SYSTEM.typography.fontFamily.system }}>
            {block.content}
          </span>
        </div>
      )
    case 'numbered_list':
      return (
        <div className="flex items-start mb-2">
          <span className="text-gray-400 mr-3 mt-1 min-w-[20px]">1.</span>
          <span className="text-gray-700 leading-relaxed" 
                style={{ fontFamily: MACOS_DESIGN_SYSTEM.typography.fontFamily.system }}>
            {block.content}
          </span>
        </div>
      )
    case 'to_do':
      return (
        <div className="flex items-start mb-2">
          <input 
            type="checkbox" 
            checked={block.properties?.checked || false}
            className="mr-3 mt-1 rounded border-gray-300 text-blue-500 focus:ring-blue-500"
            readOnly
          />
          <span className={`leading-relaxed ${block.properties?.checked ? 'text-gray-500 line-through' : 'text-gray-700'}`}
                style={{ fontFamily: MACOS_DESIGN_SYSTEM.typography.fontFamily.system }}>
            {block.content}
          </span>
        </div>
      )
    case 'quote':
      return (
        <blockquote className="border-l-4 border-gray-300 pl-4 py-2 mb-4 italic text-gray-600 bg-gray-50 rounded-r-lg">
          <span style={{ fontFamily: MACOS_DESIGN_SYSTEM.typography.fontFamily.system }}>
            {block.content}
          </span>
        </blockquote>
      )
    case 'callout':
      return (
        <div className={`p-4 rounded-lg mb-4 border-l-4 ${
          block.properties?.backgroundColor === 'blue_background' ? 'bg-blue-50 border-blue-400' :
          block.properties?.backgroundColor === 'yellow_background' ? 'bg-yellow-50 border-yellow-400' :
          block.properties?.backgroundColor === 'green_background' ? 'bg-green-50 border-green-400' :
          'bg-gray-50 border-gray-400'
        }`}>
          <div className="flex items-start">
            {block.properties?.icon && (
              <span className="text-xl mr-3 mt-0.5">{block.properties.icon}</span>
            )}
            <span className="text-gray-700 leading-relaxed" 
                  style={{ fontFamily: MACOS_DESIGN_SYSTEM.typography.fontFamily.system }}>
              {block.content}
            </span>
          </div>
        </div>
      )
    case 'code':
      return (
        <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg mb-4 overflow-x-auto">
          <code className="text-sm" style={{ fontFamily: 'Monaco, Menlo, monospace' }}>
            {block.content}
          </code>
        </pre>
      )
    case 'divider':
      return <hr className="border-gray-200 my-6" />
    default:
      return (
        <p className="text-gray-700 mb-3 leading-relaxed" 
           style={{ fontFamily: MACOS_DESIGN_SYSTEM.typography.fontFamily.system }}>
          {block.content}
        </p>
      )
  }
})

BlockRenderer.displayName = 'BlockRenderer'

// Memoized sidebar item component
const SidebarItem = memo(({ 
  page, 
  isSelected, 
  onSelect, 
  onToggleFavorite 
}: { 
  page: NotionPage
  isSelected: boolean
  onSelect: (page: NotionPage) => void
  onToggleFavorite: (pageId: string) => void
}) => {
  const handleSelect = useCallback(() => {
    onSelect(page)
  }, [page, onSelect])

  const handleToggleFavorite = useCallback((e: React.MouseEvent) => {
    e.stopPropagation()
    onToggleFavorite(page.id)
  }, [page.id, onToggleFavorite])

  return (
    <motion.div
      className={`group flex items-center space-x-3 p-2 rounded-lg cursor-pointer transition-colors mb-1 ${
        isSelected 
          ? 'bg-blue-100 text-blue-700' 
          : 'hover:bg-gray-100 text-gray-700'
      }`}
      onClick={handleSelect}
      whileHover={{ x: 2 }}
      layout
    >
      <span className="text-lg flex-shrink-0">{page.icon}</span>
      <div className="flex-1 min-w-0">
        <span className="text-sm font-medium truncate block">
          {page.title}
        </span>
        <span className="text-xs text-gray-500">
          {page.lastModified.toLocaleDateString()}
        </span>
      </div>
      <button
        onClick={handleToggleFavorite}
        className="opacity-0 group-hover:opacity-100 p-1 hover:bg-gray-200 rounded transition-all flex-shrink-0"
      >
        <Star className={`w-3 h-3 ${page.isFavorite ? 'text-yellow-500 fill-current' : 'text-gray-400'}`} />
      </button>
    </motion.div>
  )
})

SidebarItem.displayName = 'SidebarItem'

// Custom hooks for stable references and performance
const useStableCallback = <T extends (...args: any[]) => any>(callback: T): T => {
  const callbackRef = useRef(callback)
  callbackRef.current = callback
  
  return useCallback(((...args: any[]) => callbackRef.current(...args)) as T, [])
}

const useNotionSearch = (pages: NotionPage[], query: string) => {
  return useMemo(() => {
    if (!query.trim()) return pages
    
    const lowercaseQuery = query.toLowerCase()
    return pages.filter(page => {
      // Search in title
      if (page.title.toLowerCase().includes(lowercaseQuery)) return true
      
      // Search in content blocks
      const hasContentMatch = page.content.some(block => 
        block.content.toLowerCase().includes(lowercaseQuery)
      )
      if (hasContentMatch) return true
      
      // Search in tags
      const hasTagMatch = page.tags.some(tag => 
        tag.toLowerCase().includes(lowercaseQuery)
      )
      if (hasTagMatch) return true
      
      return false
    })
  }, [pages, query])
}

const useNotionState = (initialPages: NotionPage[]) => {
  const [pages, setPages] = useState<NotionPage[]>(initialPages)
  const [selectedPage, setSelectedPage] = useState<NotionPage | null>(initialPages[0] || null)
  const [searchQuery, setSearchQuery] = useState("")
  const [isEditing, setIsEditing] = useState(false)
  const [editContent, setEditContent] = useState<NotionBlock[]>([])

  const filteredPages = useNotionSearch(pages, searchQuery)

  const handlePageSelect = useStableCallback((page: NotionPage) => {
    setSelectedPage(page)
    setEditContent(page.content)
    setIsEditing(false)
  })

  const handleSave = useStableCallback(() => {
    if (selectedPage) {
      startTransition(() => {
        setPages(prev => prev.map(page => 
          page.id === selectedPage.id 
            ? { ...page, content: editContent, lastModified: new Date(), version: page.version + 1 }
            : page
        ))
        setSelectedPage(prev => prev ? { ...prev, content: editContent } : null)
        setIsEditing(false)
      })
    }
  })

  const toggleFavorite = useStableCallback((pageId: string) => {
    startTransition(() => {
      setPages(prev => prev.map(page => 
        page.id === pageId ? { ...page, isFavorite: !page.isFavorite } : page
      ))
    })
  })

  const createNewPage = useStableCallback(() => {
    const newPage: NotionPage = {
      id: Date.now().toString(),
      title: "Untitled",
      icon: "📄",
      type: "page",
      content: [
        {
          id: `b${Date.now()}`,
          type: "heading1",
          content: "Untitled",
          properties: {},
          children: [],
          createdTime: new Date(),
          lastEditedTime: new Date()
        },
        {
          id: `b${Date.now() + 1}`,
          type: "paragraph",
          content: "Start writing...",
          properties: {},
          children: [],
          createdTime: new Date(),
          lastEditedTime: new Date()
        }
      ],
      properties: {},
      tags: [],
      lastModified: new Date(),
      createdTime: new Date(),
      isFavorite: false,
      isArchived: false,
      permissions: {
        read: true,
        write: true,
        comment: true,
        share: true
      },
      collaborators: [],
      comments: [],
      version: 1
    }
    
    startTransition(() => {
      setPages(prev => [newPage, ...prev])
      setSelectedPage(newPage)
      setEditContent(newPage.content)
      setIsEditing(true)
    })
  })

  return {
    pages,
    selectedPage,
    searchQuery,
    isEditing,
    editContent,
    filteredPages,
    setSearchQuery,
    setIsEditing,
    setEditContent,
    handlePageSelect,
    handleSave,
    toggleFavorite,
    createNewPage
  }
}

export function MacNotion({ onClose, onMinimize, className }: MacNotesProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [databases] = useState<NotionDatabase[]>(SAMPLE_DATABASES)
  const [activeView, setActiveView] = useState<'pages' | 'databases'>('pages')
  
  const {
    pages,
    selectedPage,
    searchQuery,
    isEditing,
    editContent,
    filteredPages,
    setSearchQuery,
    setIsEditing,
    setEditContent,
    handlePageSelect,
    handleSave,
    toggleFavorite,
    createNewPage
  } = useNotionState(SAMPLE_PAGES)

  // Memoized handlers for performance
  const handleSidebarToggle = useStableCallback(() => {
    setSidebarCollapsed(!sidebarCollapsed)
  })

  const handleEditToggle = useStableCallback(() => {
    setIsEditing(!isEditing)
  })

  const handleBlockEdit = useStableCallback((blockId: string, content: string) => {
    setEditContent(prev => prev.map(block => 
      block.id === blockId ? { ...block, content, lastEditedTime: new Date() } : block
    ))
  })

  // Memoized components for better performance
  const favoritePages = useMemo(() => 
    pages.filter(page => page.isFavorite), 
    [pages]
  )

  const recentPages = useMemo(() => 
    [...pages].sort((a, b) => b.lastModified.getTime() - a.lastModified.getTime()).slice(0, 5),
    [pages]
  )

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: 20 }}
      transition={{ duration: ANIMATIONS.WINDOW_OPEN.duration, ease: ANIMATIONS.WINDOW_OPEN.ease }}
      className={`fixed inset-4 z-50 flex flex-col bg-white rounded-xl shadow-2xl border border-gray-200/50 overflow-hidden ${className}`}
      style={{
        background: 'linear-gradient(135deg, rgba(255,255,255,0.98) 0%, rgba(248,250,252,0.98) 100%)',
        boxShadow: MACOS_DESIGN_SYSTEM.shadows.window
      }}
    >
      {/* macOS Title Bar */}
      <div className="relative border-b"
           style={{
             background: MACOS_DESIGN_SYSTEM.colors.windowBackground,
             backdropFilter: MACOS_DESIGN_SYSTEM.blur.light,
             WebkitBackdropFilter: MACOS_DESIGN_SYSTEM.blur.light,
             borderBottomColor: MACOS_DESIGN_SYSTEM.colors.separator
           }}>
        
        <div className="absolute inset-0 bg-gradient-to-b from-white/30 to-transparent pointer-events-none" />
        
        <div className="flex items-center justify-between px-5 py-4 relative z-10">
          <div className="flex items-center space-x-2">
            <motion.button 
              className="w-3 h-3 rounded-full relative group flex items-center justify-center"
              style={{ backgroundColor: MACOS_DESIGN_SYSTEM.colors.trafficLightRed }}
              onClick={onClose}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <X className="w-1.5 h-1.5 text-black/60 opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.button>
            
            <motion.button 
              className="w-3 h-3 rounded-full relative group flex items-center justify-center"
              style={{ backgroundColor: MACOS_DESIGN_SYSTEM.colors.trafficLightYellow }}
              onClick={onMinimize}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Minus className="w-1.5 h-1.5 text-black/60 opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.button>
            
            <motion.button 
              className="w-3 h-3 rounded-full relative group flex items-center justify-center"
              style={{ backgroundColor: MACOS_DESIGN_SYSTEM.colors.trafficLightGreen }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Square className="w-1.5 h-1.5 text-black/60 opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.button>
          </div>
          
          <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <h3 className="text-gray-700 tracking-wide"
                style={{
                  fontFamily: MACOS_DESIGN_SYSTEM.typography.fontFamily.system,
                  fontSize: MACOS_DESIGN_SYSTEM.typography.fontSize.footnote,
                  fontWeight: MACOS_DESIGN_SYSTEM.typography.fontWeight.medium
                }}>
              Notion
            </h3>
          </div>
          
          <div className="w-16" />
        </div>
        
        <div className="absolute top-0 left-0 right-0 h-px bg-white/80" />
      </div>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <motion.div 
          className="border-r bg-gray-50/80 backdrop-blur-sm flex flex-col"
          style={{ 
            borderColor: MACOS_DESIGN_SYSTEM.colors.separator,
            width: sidebarCollapsed ? '60px' : '280px'
          }}
          animate={{ width: sidebarCollapsed ? '60px' : '280px' }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          {/* Sidebar Header */}
          <div className="p-4 border-b" style={{ borderColor: MACOS_DESIGN_SYSTEM.colors.separator }}>
            <div className="flex items-center justify-between">
              {!sidebarCollapsed && (
                <h2 className="font-semibold text-gray-900"
                    style={{
                      fontFamily: MACOS_DESIGN_SYSTEM.typography.fontFamily.system,
                      fontSize: MACOS_DESIGN_SYSTEM.typography.fontSize.callout
                    }}>
                  My Workspace
                </h2>
              )}
              <button
                onClick={handleSidebarToggle}
                className="p-1 hover:bg-gray-200/60 rounded transition-colors"
              >
                <ChevronLeft className={`w-4 h-4 text-gray-600 transition-transform ${sidebarCollapsed ? 'rotate-180' : ''}`} />
              </button>
            </div>
            
            {!sidebarCollapsed && (
              <div className="mt-3 flex items-center space-x-2">
                <button
                  onClick={createNewPage}
                  className="flex items-center space-x-2 px-3 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors flex-1"
                >
                  <Plus className="w-4 h-4" />
                  <span className="text-sm font-medium">New Page</span>
                </button>
              </div>
            )}
          </div>

          {/* Search */}
          {!sidebarCollapsed && (
            <div className="p-4 border-b" style={{ borderColor: MACOS_DESIGN_SYSTEM.colors.separator }}>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search pages..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                  style={{ fontFamily: MACOS_DESIGN_SYSTEM.typography.fontFamily.system }}
                />
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="flex-1 overflow-y-auto">
            {!sidebarCollapsed && (
              <>
                {/* Favorites */}
                {favoritePages.length > 0 && (
                  <div className="p-4">
                    <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-3">
                      ⭐ Favorites
                    </h3>
                    {favoritePages.map((page) => (
                      <SidebarItem
                        key={page.id}
                        page={page}
                        isSelected={selectedPage?.id === page.id}
                        onSelect={handlePageSelect}
                        onToggleFavorite={toggleFavorite}
                      />
                    ))}
                  </div>
                )}

                {/* All Pages */}
                <div className="p-4">
                  <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-3">
                    📄 Pages
                  </h3>
                  {filteredPages.map((page) => (
                    <SidebarItem
                      key={page.id}
                      page={page}
                      isSelected={selectedPage?.id === page.id}
                      onSelect={handlePageSelect}
                      onToggleFavorite={toggleFavorite}
                    />
                  ))}
                </div>

                {/* Databases */}
                <div className="p-4">
                  <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-3">
                    📚 Collections
                  </h3>
                  {databases.map((db) => (
                    <motion.div
                      key={db.id}
                      className="flex items-center space-x-3 p-2 rounded-lg cursor-pointer hover:bg-gray-100 text-gray-700 transition-colors mb-1"
                      whileHover={{ x: 2 }}
                    >
                      <span className="text-lg">{db.icon}</span>
                      <div className="flex-1 min-w-0">
                        <span className="text-sm font-medium truncate block">
                          {db.name}
                        </span>
                        <span className="text-xs text-gray-500">
                          {db.description}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </>
            )}
          </div>
        </motion.div>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col">
          {selectedPage && (
            <>
              {/* Page Header */}
              <div className="p-6 border-b bg-white/50" style={{ borderColor: MACOS_DESIGN_SYSTEM.colors.separator }}>
                {/* Cover Image */}
                {selectedPage.cover && (
                  <div className="mb-6 -mx-6 -mt-6">
                    <div 
                      className="h-32 bg-cover bg-center relative"
                      style={{ backgroundImage: `url(${selectedPage.cover})` }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{selectedPage.icon}</span>
                    <h1 className="font-bold text-gray-900"
                        style={{
                          fontFamily: MACOS_DESIGN_SYSTEM.typography.fontFamily.system,
                          fontSize: MACOS_DESIGN_SYSTEM.typography.fontSize.title2
                        }}>
                      {selectedPage.title}
                    </h1>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={handleEditToggle}
                      className={`p-2 rounded-lg transition-colors ${
                        isEditing 
                          ? 'bg-blue-100 text-blue-600' 
                          : 'hover:bg-gray-100 text-gray-600'
                      }`}
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                      <Share className="w-4 h-4 text-gray-600" />
                    </button>
                    <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                      <MoreHorizontal className="w-4 h-4 text-gray-600" />
                    </button>
                  </div>
                </div>

                {/* Page Meta */}
                <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
                  <span>Last updated {selectedPage.lastModified.toLocaleDateString()}</span>
                  <span>•</span>
                  <span>Version {selectedPage.version}</span>
                  {selectedPage.collaborators.length > 0 && (
                    <>
                      <span>•</span>
                      <div className="flex items-center space-x-1">
                        <Users className="w-4 h-4" />
                        <span>{selectedPage.collaborators.length} collaborator{selectedPage.collaborators.length !== 1 ? 's' : ''}</span>
                      </div>
                    </>
                  )}
                </div>

                {/* Tags */}
                {selectedPage.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {selectedPage.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs font-medium"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Editor Toolbar */}
              {isEditing && (
                <div className="p-4 border-b bg-gray-50/50" style={{ borderColor: MACOS_DESIGN_SYSTEM.colors.separator }}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-1">
                      <div className="flex items-center space-x-1 mr-4">
                        <button className="p-2 hover:bg-gray-200 rounded transition-colors">
                          <Bold className="w-4 h-4 text-gray-600" />
                        </button>
                        <button className="p-2 hover:bg-gray-200 rounded transition-colors">
                          <Italic className="w-4 h-4 text-gray-600" />
                        </button>
                        <button className="p-2 hover:bg-gray-200 rounded transition-colors">
                          <Underline className="w-4 h-4 text-gray-600" />
                        </button>
                        <button className="p-2 hover:bg-gray-200 rounded transition-colors">
                          <Code className="w-4 h-4 text-gray-600" />
                        </button>
                      </div>
                      
                      <div className="flex items-center space-x-1 mr-4">
                        <button className="p-2 hover:bg-gray-200 rounded transition-colors">
                          <AlignLeft className="w-4 h-4 text-gray-600" />
                        </button>
                        <button className="p-2 hover:bg-gray-200 rounded transition-colors">
                          <AlignCenter className="w-4 h-4 text-gray-600" />
                        </button>
                        <button className="p-2 hover:bg-gray-200 rounded transition-colors">
                          <AlignRight className="w-4 h-4 text-gray-600" />
                        </button>
                      </div>
                      
                      <div className="flex items-center space-x-1">
                        <button className="p-2 hover:bg-gray-200 rounded transition-colors">
                          <Link className="w-4 h-4 text-gray-600" />
                        </button>
                        <button className="p-2 hover:bg-gray-200 rounded transition-colors">
                          <Image className="w-4 h-4 text-gray-600" />
                        </button>
                        <button className="p-2 hover:bg-gray-200 rounded transition-colors">
                          <Hash className="w-4 h-4 text-gray-600" />
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => setIsEditing(false)}
                        className="px-3 py-1 text-gray-600 hover:bg-gray-200 rounded transition-colors text-sm"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleSave}
                        className="px-3 py-1 text-white bg-blue-500 hover:bg-blue-600 rounded transition-colors text-sm"
                      >
                        Save Changes
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Content Area */}
              <div className="flex-1 p-6 overflow-y-auto bg-white">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={isEditing ? "editor" : "viewer"}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="max-w-none"
                  >
                    {selectedPage.content.map((block) => (
                      <BlockRenderer
                        key={block.id}
                        block={block}
                        onEdit={isEditing ? handleBlockEdit : undefined}
                      />
                    ))}
                  </motion.div>
                </AnimatePresence>
              </div>
            </>
          )}
        </div>
      </div>
    </motion.div>
  )
}