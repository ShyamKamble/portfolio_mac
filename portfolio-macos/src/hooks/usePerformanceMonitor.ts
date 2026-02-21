import { useEffect, useRef } from 'react'

interface PerformanceMetrics {
  renderTime: number
  componentName: string
}

export function usePerformanceMonitor(componentName: string) {
  const renderStartTime = useRef<number>(0)
  
  // Mark render start
  renderStartTime.current = performance.now()
  
  useEffect(() => {
    const renderEndTime = performance.now()
    const renderTime = renderEndTime - renderStartTime.current
    
    // Only log if render time is significant (> 16ms for 60fps)
    if (renderTime > 16) {
      console.warn(`Slow render detected in ${componentName}: ${renderTime.toFixed(2)}ms`)
    }
    
    // Optional: Send to analytics service
    if (process.env.NODE_ENV === 'production' && renderTime > 100) {
      // sendToAnalytics({ componentName, renderTime })
    }
  })
  
  return {
    markRenderStart: () => {
      renderStartTime.current = performance.now()
    }
  }
}

// Hook for measuring component mount time
export function useMountTime(componentName: string) {
  useEffect(() => {
    const mountTime = performance.now()
    
    return () => {
      const unmountTime = performance.now()
      const totalTime = unmountTime - mountTime
      
      if (totalTime > 1000 && process.env.NODE_ENV === 'development') {
        // Only log in development mode
        console.log(`${componentName} was mounted for ${totalTime.toFixed(2)}ms`)
      }
    }
  }, [componentName])
}