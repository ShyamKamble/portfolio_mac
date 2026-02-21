import { useState, useCallback, useMemo } from 'react'
import { WindowState, WindowStateType } from '@/types'

export function useWindowManager() {
  const [windowStates, setWindowStates] = useState<WindowState[]>([])

  // Use useCallback for stable function references to prevent child re-renders
  const getWindowState = useCallback((id: string): WindowStateType => {
    const windowState = windowStates.find(w => w.id === id)
    return windowState?.state || 'closed'
  }, [windowStates])

  const updateWindowState = useCallback((id: string, state: WindowStateType) => {
    setWindowStates(prev => {
      const existing = prev.find(w => w.id === id)
      if (existing) {
        return prev.map(w => w.id === id ? { ...w, state } : w)
      } else {
        return [...prev, { id, state }]
      }
    })
  }, [])

  const openWindow = useCallback((id: string) => {
    const currentState = getWindowState(id)
    if (currentState === 'minimized' || currentState === 'closed') {
      updateWindowState(id, 'open')
    }
  }, [getWindowState, updateWindowState])

  const closeWindow = useCallback((id: string) => {
    updateWindowState(id, 'closed')
  }, [updateWindowState])

  const minimizeWindow = useCallback((id: string) => {
    updateWindowState(id, 'minimized')
  }, [updateWindowState])

  // Derive state during render, not in effects - memoized for performance
  const openWindows = useMemo(() => 
    windowStates
      .filter(w => w.state === 'open')
      .map(w => w.id),
    [windowStates]
  )

  const minimizedWindows = useMemo(() => 
    windowStates
      .filter(w => w.state === 'minimized')
      .map(w => w.id),
    [windowStates]
  )

  return {
    windowStates,
    getWindowState,
    openWindow,
    closeWindow,
    minimizeWindow,
    openWindows,
    minimizedWindows
  }
}