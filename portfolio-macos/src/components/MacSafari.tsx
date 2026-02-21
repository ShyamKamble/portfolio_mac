"use client"

import { useState } from "react"
import { motion } from "motion/react"
import { 
  ArrowLeft, 
  ArrowRight, 
  RotateCcw, 
  Share, 
  Bookmark,
  Plus,
  X,
  Minus,
  Square,
  Search,
  Shield,
  Download
} from "lucide-react"
import { MacSafariProps } from "@/types"
import { MacOSWindow } from "@/components/ui/MacOSWindow"

interface Tab {
  id: string
  title: string
  url: string
  favicon?: string
  isActive: boolean
}

const SAMPLE_TABS: Tab[] = [
  {
    id: "1",
    title: "Portfolio - macOS Experience",
    url: "https://portfolio.example.com",
    isActive: true
  },
  {
    id: "2", 
    title: "Apple Developer",
    url: "https://developer.apple.com",
    isActive: false
  }
]

import { ANIMATIONS } from "@/constants"

export function MacSafari({ onClose, onMinimize, className }: MacSafariProps) {
  const [tabs, setTabs] = useState<Tab[]>(SAMPLE_TABS)
  const [activeTab, setActiveTab] = useState(tabs.find(t => t.isActive) || tabs[0])
  const [urlInput, setUrlInput] = useState(activeTab.url)
  const [isLoading, setIsLoading] = useState(false)

  const addNewTab = () => {
    const newTab: Tab = {
      id: Date.now().toString(),
      title: "New Tab",
      url: "https://www.apple.com",
      isActive: true
    }
    setTabs(prev => prev.map(t => ({ ...t, isActive: false })).concat(newTab))
    setActiveTab(newTab)
    setUrlInput(newTab.url)
  }

  const closeTab = (tabId: string) => {
    if (tabs.length === 1) return
    const newTabs = tabs.filter(t => t.id !== tabId)
    setTabs(newTabs)
    if (activeTab.id === tabId) {
      const newActiveTab = newTabs[0]
      setActiveTab(newActiveTab)
      setUrlInput(newActiveTab.url)
    }
  }

  const switchTab = (tab: Tab) => {
    setTabs(prev => prev.map(t => ({ ...t, isActive: t.id === tab.id })))
    setActiveTab(tab)
    setUrlInput(tab.url)
  }

  return (
    <MacOSWindow
      title="Safari"
      onClose={onClose}
      onMinimize={onMinimize}
      className={className}
    >

      {/* Tab Bar */}
      <div className="flex items-center bg-[#f6f6f6]/90 border-b border-black/8 px-4">
        <div className="flex items-center flex-1 overflow-x-auto">
          {tabs.map((tab) => (
            <motion.div
              key={tab.id}
              className={`flex items-center min-w-0 max-w-48 px-3 py-1.5 cursor-pointer transition-colors ${
                tab.isActive 
                  ? 'bg-white/90 border-b border-blue-500' 
                  : 'hover:bg-white/50'
              }`}
              onClick={() => switchTab(tab)}
              whileHover={{ y: -0.5 }}
            >
              <span className="text-[13px] text-[#333333] truncate flex-1 font-medium">
                {tab.title}
              </span>
              {tabs.length > 1 && (
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    closeTab(tab.id)
                  }}
                  className="ml-2 p-0.5 hover:bg-black/10 rounded-full transition-colors"
                >
                  <X className="w-3 h-3 text-[#666666]" />
                </button>
              )}
            </motion.div>
          ))}
          <button
            onClick={addNewTab}
            className="p-1.5 hover:bg-white/50 rounded-md transition-colors ml-2"
          >
            <Plus className="w-3 h-3 text-[#666666]" />
          </button>
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex items-center px-4 py-2 bg-[#f6f6f6]/80 border-b border-black/8">
        <div className="flex items-center space-x-1">
          <button className="p-1.5 hover:bg-black/5 rounded-md transition-colors">
            <ArrowLeft className="w-4 h-4 text-[#666666]" />
          </button>
          <button className="p-1.5 hover:bg-black/5 rounded-md transition-colors">
            <ArrowRight className="w-4 h-4 text-[#666666]" />
          </button>
          <button className="p-1.5 hover:bg-black/5 rounded-md transition-colors">
            <RotateCcw className="w-4 h-4 text-[#666666]" />
          </button>
        </div>

        {/* Address Bar */}
        <div className="flex-1 mx-4">
          <div className="relative">
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 flex items-center space-x-2">
              <Shield className="w-3 h-3 text-green-600" />
            </div>
            <input
              type="text"
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              className="w-full pl-10 pr-8 py-2 bg-white/90 border border-black/10 rounded-md text-[13px] text-[#333333] focus:outline-none focus:ring-1 focus:ring-blue-500/50 focus:border-blue-500/60"
              placeholder="Search or enter website name"
            />
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-3 h-3 text-[#999999]" />
          </div>
        </div>

        <div className="flex items-center space-x-1">
          <button className="p-1.5 hover:bg-black/5 rounded-md transition-colors">
            <Download className="w-4 h-4 text-[#666666]" />
          </button>
          <button className="p-1.5 hover:bg-black/5 rounded-md transition-colors">
            <Bookmark className="w-4 h-4 text-[#666666]" />
          </button>
          <button className="p-1.5 hover:bg-black/5 rounded-md transition-colors">
            <Share className="w-4 h-4 text-[#666666]" />
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 bg-white p-8 overflow-y-auto">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-[34px] font-light text-[#1d1d1f] mb-4 tracking-[-0.01em]">
              Welcome to Safari
            </h1>
            <p className="text-[17px] text-[#86868b] leading-relaxed">
              Browse the web with privacy and performance in mind
            </p>
          </div>

          {/* Favorites Grid */}
          <div className="grid grid-cols-4 gap-4 mb-8">
            {[
              { name: "Apple", url: "apple.com", color: "bg-[#f5f5f7]" },
              { name: "GitHub", url: "github.com", color: "bg-[#24292f]" },
              { name: "Stack Overflow", url: "stackoverflow.com", color: "bg-[#f48024]" },
              { name: "MDN", url: "developer.mozilla.org", color: "bg-[#005a9c]" }
            ].map((site, index) => (
              <motion.div
                key={site.name}
                className="p-4 bg-white rounded-xl border border-black/8 hover:shadow-md transition-all cursor-pointer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className={`w-12 h-12 ${site.color} rounded-lg mb-3 mx-auto`}></div>
                <h3 className="text-[13px] font-medium text-[#1d1d1f] text-center">
                  {site.name}
                </h3>
                <p className="text-[11px] text-[#86868b] text-center">
                  {site.url}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Privacy Report */}
          <div className="bg-[#007aff]/5 p-6 rounded-xl border border-[#007aff]/10">
            <h3 className="text-[16px] font-medium text-[#1d1d1f] mb-2">
              Privacy Report
            </h3>
            <p className="text-[13px] text-[#86868b] mb-4 leading-relaxed">
              Safari prevented 47 trackers from profiling you across the websites you visited today.
            </p>
            <button className="text-[13px] text-[#007aff] hover:text-[#0056cc] transition-colors">
              View Full Report →
            </button>
          </div>
        </div>
      </div>
    </MacOSWindow>
  )
}