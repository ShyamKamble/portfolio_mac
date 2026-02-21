"use client"

import { useState } from "react"
import { motion } from "motion/react"
import { 
  Search, 
  Plus, 
  Archive, 
  Trash2, 
  Reply, 
  ReplyAll,
  Forward,
  Star,
  Paperclip,
  X,
  Minus,
  Square,
  Inbox,
  Send,
  FileText,
  Flag
} from "lucide-react"
import { MacMailProps } from "@/types"
import { MacOSWindow } from "@/components/ui/MacOSWindow"

import { ANIMATIONS } from "@/constants"

interface Email {
  id: string
  from: string
  subject: string
  preview: string
  date: Date
  isRead: boolean
  isStarred: boolean
  hasAttachment: boolean
}

const SAMPLE_EMAILS: Email[] = [
  {
    id: "1",
    from: "Apple Developer",
    subject: "Welcome to the Apple Developer Program",
    preview: "Thank you for joining the Apple Developer Program. You now have access to...",
    date: new Date(2025, 0, 24, 9, 30),
    isRead: false,
    isStarred: true,
    hasAttachment: false
  },
  {
    id: "2",
    from: "GitHub",
    subject: "Your weekly digest",
    preview: "Here's what happened in your repositories this week...",
    date: new Date(2025, 0, 23, 14, 15),
    isRead: true,
    isStarred: false,
    hasAttachment: true
  },
  {
    id: "3",
    from: "Design Team",
    subject: "New design system components",
    preview: "We've added new components to our design system. Check out the latest...",
    date: new Date(2025, 0, 22, 11, 45),
    isRead: true,
    isStarred: false,
    hasAttachment: false
  }
]

export function MacMail({ onClose, onMinimize, className }: MacMailProps) {
  const [selectedEmail, setSelectedEmail] = useState<Email>(SAMPLE_EMAILS[0])
  const [searchQuery, setSearchQuery] = useState("")
  const [emails, setEmails] = useState(SAMPLE_EMAILS)

  const formatDate = (date: Date) => {
    const now = new Date()
    const diffTime = Math.abs(now.getTime() - date.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    
    if (diffDays === 1) return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })
    if (diffDays === 2) return "Yesterday"
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  }

  const toggleStar = (emailId: string) => {
    setEmails(prev => prev.map(email => 
      email.id === emailId ? { ...email, isStarred: !email.isStarred } : email
    ))
  }

  return (
    <MacOSWindow
      title="Mail"
      onClose={onClose}
      onMinimize={onMinimize}
      className={className}
    >

      {/* Toolbar */}
      <div className="flex items-center px-4 py-2 bg-[#f6f6f6]/80 border-b border-black/8">
        <div className="flex items-center space-x-1">
          <button className="p-1.5 hover:bg-black/5 rounded-md transition-colors">
            <Archive className="w-4 h-4 text-[#666666]" />
          </button>
          <button className="p-1.5 hover:bg-black/5 rounded-md transition-colors">
            <Trash2 className="w-4 h-4 text-[#666666]" />
          </button>
          <button className="p-1.5 hover:bg-black/5 rounded-md transition-colors">
            <Reply className="w-4 h-4 text-[#666666]" />
          </button>
          <button className="p-1.5 hover:bg-black/5 rounded-md transition-colors">
            <Forward className="w-4 h-4 text-[#666666]" />
          </button>
        </div>

        <div className="flex-1 mx-4">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-3 h-3 text-[#999999]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 bg-white/90 border border-black/10 rounded-md text-[13px] text-[#333333] focus:outline-none focus:ring-1 focus:ring-blue-500/50"
              placeholder="Search Mail"
            />
          </div>
        </div>

        <button className="p-1.5 hover:bg-black/5 rounded-md transition-colors">
          <Plus className="w-4 h-4 text-[#666666]" />
        </button>
      </div>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className="w-48 bg-[#f6f6f6]/90 border-r border-black/8 flex flex-col">
          <div className="p-3">
            <div className="space-y-1">
              {[
                { icon: Inbox, label: "Inbox", count: 3, active: true },
                { icon: Send, label: "Sent", count: 0, active: false },
                { icon: FileText, label: "Drafts", count: 1, active: false },
                { icon: Trash2, label: "Trash", count: 0, active: false }
              ].map((item) => (
                <div
                  key={item.label}
                  className={`flex items-center justify-between px-3 py-2 rounded-md cursor-pointer transition-colors ${
                    item.active ? 'bg-[#007aff]/10 text-[#007aff]' : 'hover:bg-black/5 text-[#333333]'
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <item.icon className="w-4 h-4" />
                    <span className="text-[13px]">{item.label}</span>
                  </div>
                  {item.count > 0 && (
                    <span className="text-[11px] text-[#86868b] bg-black/5 px-1.5 py-0.5 rounded-full">
                      {item.count}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Email List */}
        <div className="w-80 border-r border-black/8 flex flex-col">
          <div className="flex-1 overflow-y-auto">
            {emails.map((email) => (
              <motion.div
                key={email.id}
                className={`p-4 border-b border-black/8 cursor-pointer transition-colors ${
                  selectedEmail.id === email.id 
                    ? 'bg-[#007aff]/10 border-l-2 border-l-[#007aff]' 
                    : 'hover:bg-black/5'
                }`}
                onClick={() => setSelectedEmail(email)}
                whileHover={{ x: 1 }}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1 min-w-0">
                    <h3 className={`text-[13px] truncate ${
                      email.isRead ? 'text-[#666666]' : 'text-[#1d1d1f] font-medium'
                    }`}>
                      {email.from}
                    </h3>
                    <p className={`text-[13px] truncate ${
                      email.isRead ? 'text-[#86868b]' : 'text-[#333333] font-medium'
                    }`}>
                      {email.subject}
                    </p>
                  </div>
                  <div className="flex items-center space-x-1 ml-2">
                    {email.hasAttachment && (
                      <Paperclip className="w-3 h-3 text-[#86868b]" />
                    )}
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        toggleStar(email.id)
                      }}
                      className="p-0.5 hover:bg-black/10 rounded transition-colors"
                    >
                      <Star className={`w-3 h-3 ${
                        email.isStarred ? 'text-[#ffcc02] fill-current' : 'text-[#86868b]'
                      }`} />
                    </button>
                  </div>
                </div>
                <p className="text-[13px] text-[#86868b] mb-2 line-clamp-2">
                  {email.preview}
                </p>
                <span className="text-[11px] text-[#86868b]">
                  {formatDate(email.date)}
                </span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Email Content */}
        <div className="flex-1 flex flex-col bg-white">
          <div className="p-4 border-b border-black/8">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h1 className="text-[16px] font-medium text-[#1d1d1f] mb-1">
                  {selectedEmail.subject}
                </h1>
                <p className="text-[13px] text-[#86868b]">
                  From: {selectedEmail.from}
                </p>
                <p className="text-[11px] text-[#86868b]">
                  {selectedEmail.date.toLocaleString()}
                </p>
              </div>
              <div className="flex items-center space-x-1">
                <button className="p-1.5 hover:bg-black/5 rounded-md transition-colors">
                  <Reply className="w-4 h-4 text-[#666666]" />
                </button>
                <button className="p-1.5 hover:bg-black/5 rounded-md transition-colors">
                  <ReplyAll className="w-4 h-4 text-[#666666]" />
                </button>
                <button className="p-1.5 hover:bg-black/5 rounded-md transition-colors">
                  <Forward className="w-4 h-4 text-[#666666]" />
                </button>
              </div>
            </div>
          </div>

          <div className="flex-1 p-4 overflow-y-auto">
            <div className="prose prose-gray max-w-none">
              <div className="text-[17px] text-[#1d1d1f] leading-relaxed">
                {selectedEmail.preview}
                <br /><br />
                This is a sample email content for the macOS Mail app demonstration. 
                The interface follows Apple's Human Interface Guidelines with proper 
                typography, spacing, and interaction patterns.
                <br /><br />
                Best regards,<br />
                {selectedEmail.from}
              </div>
            </div>
          </div>
        </div>
      </div>
    </MacOSWindow>
  )
}