"use client"

import { useState, useMemo } from "react"
import { motion, AnimatePresence } from "motion/react"
import { ChevronLeft, ChevronRight, Plus, Calendar as CalendarIcon } from "lucide-react"

interface Event {
  id: string
  title: string
  date: Date
  time: string
  color: string
  duration?: number // in hours
}

interface MacCalendarProps {
  className?: string
}

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
]

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

const EVENT_COLORS = [
  "#FF3B30", // Red
  "#FF9500", // Orange  
  "#FFCC00", // Yellow
  "#34C759", // Green
  "#007AFF", // Blue
  "#5856D6", // Purple
  "#AF52DE", // Pink
  "#FF2D92", // Magenta
]

export function MacCalendar({ className }: MacCalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [view, setView] = useState<"month" | "week" | "day">("month")
  const [events, setEvents] = useState<Event[]>([
    {
      id: "1",
      title: "Team Meeting",
      date: new Date(2025, 0, 25),
      time: "10:00 AM",
      color: "#007AFF",
      duration: 1
    },
    {
      id: "2", 
      title: "Design Review",
      date: new Date(2025, 0, 26),
      time: "2:00 PM",
      color: "#34C759",
      duration: 2
    },
    {
      id: "3",
      title: "Client Call",
      date: new Date(2025, 0, 27),
      time: "11:00 AM", 
      color: "#FF3B30",
      duration: 1
    }
  ])

  const today = new Date()
  
  const monthStart = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1)
  const monthEnd = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0)
  const startDate = new Date(monthStart)
  startDate.setDate(startDate.getDate() - monthStart.getDay())
  
  const endDate = new Date(monthEnd)
  endDate.setDate(endDate.getDate() + (6 - monthEnd.getDay()))

  const calendarDays = useMemo(() => {
    const days = []
    const current = new Date(startDate)
    
    while (current <= endDate) {
      days.push(new Date(current))
      current.setDate(current.getDate() + 1)
    }
    
    return days
  }, [startDate, endDate])

  const getEventsForDate = (date: Date) => {
    return events.filter(event => 
      event.date.toDateString() === date.toDateString()
    )
  }

  const navigateMonth = (direction: "prev" | "next") => {
    const newDate = new Date(currentDate)
    if (direction === "prev") {
      newDate.setMonth(newDate.getMonth() - 1)
    } else {
      newDate.setMonth(newDate.getMonth() + 1)
    }
    setCurrentDate(newDate)
  }

  const isToday = (date: Date) => {
    return date.toDateString() === today.toDateString()
  }

  const isCurrentMonth = (date: Date) => {
    return date.getMonth() === currentDate.getMonth()
  }

  const isSelected = (date: Date) => {
    return selectedDate && date.toDateString() === selectedDate.toDateString()
  }

  return (
    <div className={`w-full h-full bg-white/95 backdrop-blur-xl rounded-xl border border-gray-200/50 shadow-2xl overflow-hidden ${className}`}>
      {/* Calendar Header */}
      <div className="bg-gray-50/80 backdrop-blur-xl border-b border-gray-200/30 px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Month Navigation */}
          <div className="flex items-center space-x-4">
            <motion.button
              className="p-2 hover:bg-gray-200/50 rounded-lg transition-colors"
              onClick={() => navigateMonth("prev")}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ChevronLeft className="w-5 h-5 text-gray-600" />
            </motion.button>
            
            <h2 className="text-macos-title-2 font-semibold text-gray-800 min-w-[200px] text-center">
              {MONTHS[currentDate.getMonth()]} {currentDate.getFullYear()}
            </h2>
            
            <motion.button
              className="p-2 hover:bg-gray-200/50 rounded-lg transition-colors"
              onClick={() => navigateMonth("next")}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ChevronRight className="w-5 h-5 text-gray-600" />
            </motion.button>
          </div>

          {/* View Controls */}
          <div className="flex items-center space-x-2">
            <div className="bg-white/60 backdrop-blur-sm rounded-lg p-1 border border-gray-200/50">
              {["month", "week", "day"].map((viewType) => (
                <motion.button
                  key={viewType}
                  className={`px-3 py-1.5 text-macos-caption-1 font-medium rounded-md transition-all ${
                    view === viewType
                      ? "bg-blue-500 text-white shadow-sm"
                      : "text-gray-600 hover:bg-gray-100/50"
                  }`}
                  onClick={() => setView(viewType as "month" | "week" | "day")}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {viewType.charAt(0).toUpperCase() + viewType.slice(1)}
                </motion.button>
              ))}
            </div>
            
            <motion.button
              className="p-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors shadow-sm"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Plus className="w-4 h-4" />
            </motion.button>
          </div>
        </div>
      </div>

      {/* Calendar Content */}
      <div className="flex-1 p-6">
        {view === "month" && (
          <div className="h-full">
            {/* Day Headers */}
            <div className="grid grid-cols-7 gap-1 mb-4">
              {DAYS.map((day) => (
                <div
                  key={day}
                  className="text-center py-2 text-macos-caption-1 font-medium text-gray-500 uppercase tracking-wider"
                >
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-1 h-[calc(100%-3rem)]">
              <AnimatePresence mode="popLayout">
                {calendarDays.map((date, index) => {
                  const dayEvents = getEventsForDate(date)
                  const isCurrentMonthDay = isCurrentMonth(date)
                  const isTodayDate = isToday(date)
                  const isSelectedDate = isSelected(date)

                  return (
                    <motion.div
                      key={`${date.getMonth()}-${date.getDate()}`}
                      className={`relative p-2 rounded-lg cursor-pointer transition-all duration-200 ${
                        isCurrentMonthDay
                          ? "hover:bg-gray-100/50"
                          : "opacity-40 hover:opacity-60"
                      } ${
                        isTodayDate
                          ? "bg-blue-50 border border-blue-200"
                          : ""
                      } ${
                        isSelectedDate
                          ? "bg-blue-100 border border-blue-300"
                          : ""
                      }`}
                      onClick={() => setSelectedDate(date)}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ delay: index * 0.01 }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {/* Date Number */}
                      <div className={`text-macos-subheadline font-medium mb-1 ${
                        isTodayDate
                          ? "text-blue-600"
                          : isCurrentMonthDay
                          ? "text-gray-800"
                          : "text-gray-400"
                      }`}>
                        {date.getDate()}
                      </div>

                      {/* Events */}
                      <div className="space-y-1">
                        {dayEvents.slice(0, 3).map((event, eventIndex) => (
                          <motion.div
                            key={event.id}
                            className="text-macos-caption-2 px-2 py-0.5 rounded-md text-white font-medium truncate"
                            style={{ backgroundColor: event.color }}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: eventIndex * 0.1 }}
                          >
                            {event.title}
                          </motion.div>
                        ))}
                        
                        {dayEvents.length > 3 && (
                          <div className="text-macos-caption-2 text-gray-500 font-medium">
                            +{dayEvents.length - 3} more
                          </div>
                        )}
                      </div>

                      {/* Today Indicator */}
                      {isTodayDate && (
                        <motion.div
                          className="absolute top-1 right-1 w-2 h-2 bg-blue-500 rounded-full"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 0.5 }}
                        />
                      )}
                    </motion.div>
                  )
                })}
              </AnimatePresence>
            </div>
          </div>
        )}

        {/* Week View */}
        {view === "week" && (
          <div className="h-full">
            <div className="text-center text-macos-body text-gray-600 mt-20">
              Week view coming soon...
            </div>
          </div>
        )}

        {/* Day View */}
        {view === "day" && (
          <div className="h-full">
            <div className="text-center text-macos-body text-gray-600 mt-20">
              Day view coming soon...
            </div>
          </div>
        )}
      </div>

      {/* Selected Date Info */}
      <AnimatePresence>
        {selectedDate && (
          <motion.div
            className="absolute bottom-6 right-6 bg-white/95 backdrop-blur-xl border border-gray-200/50 rounded-xl p-4 shadow-xl max-w-xs"
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
          >
            <div className="flex items-center space-x-2 mb-3">
              <CalendarIcon className="w-4 h-4 text-blue-500" />
              <h3 className="text-macos-callout font-semibold text-gray-800">
                {selectedDate.toLocaleDateString("en-US", {
                  weekday: "long",
                  month: "long", 
                  day: "numeric"
                })}
              </h3>
            </div>
            
            <div className="space-y-2">
              {getEventsForDate(selectedDate).map((event) => (
                <div key={event.id} className="flex items-center space-x-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: event.color }}
                  />
                  <div>
                    <div className="text-macos-subheadline font-medium text-gray-800">
                      {event.title}
                    </div>
                    <div className="text-macos-caption-1 text-gray-500">
                      {event.time}
                    </div>
                  </div>
                </div>
              ))}
              
              {getEventsForDate(selectedDate).length === 0 && (
                <div className="text-macos-subheadline text-gray-500">
                  No events scheduled
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}