// Constants for the macOS portfolio application

// Image files data - using as const for better type inference
export const IMAGE_FILES = [
  {
    name: "Vincent Van Gogh, _Starry Night_ (1889) 29_ × 36-1_4_.jpg",
    path: "/Vincent Van Gogh, _Starry Night_ (1889) 29_ × 36-1_4_.jpg",
    size: "2.8 MB",
    type: "JPEG Image"
  },
  {
    name: "starry-night.jpg", 
    path: "/starry-night.jpg",
    size: "1.8 MB",
    type: "JPEG Image"
  }
] as const

// Document files data
export const DOCUMENT_FILES = [
  {
    name: "Resume.pdf",
    path: "/resume",
    size: "245 KB",
    type: "PDF Document"
  }
] as const

// All files combined - cached for performance
export const ALL_FILES = [...IMAGE_FILES, ...DOCUMENT_FILES] as const

// Default folder positions - using lazy initialization function to prevent re-creation
export const createDefaultFolders = () => [
  {
    id: "folder-1",
    name: "livros-pdf-love-2025",
    x: 80,
    y: 520,
    windowId: "projects"
  },
  {
    id: "folder-2",
    name: "newrandrop-2025",
    x: 580,
    y: 200,
    windowId: "about"
  },
  {
    id: "folder-3",
    name: "continuouplay-2025",
    x: 680,
    y: 580,
    windowId: "contact"
  },
  {
    id: "folder-4",
    name: "Documents",
    x: 200,
    y: 200,
    windowId: "finder"
  }
] as const

// Keep static reference for backward compatibility
export const DEFAULT_FOLDERS = createDefaultFolders()

// Animation constants - hoisted for reuse with authentic macOS timing
export const ANIMATIONS = {
  MINIMIZE: {
    duration: 0.6,
    ease: [0.32, 0.72, 0, 1] as const // Apple's signature easing
  },
  WINDOW_OPEN: {
    duration: 0.35,
    ease: [0.25, 0.46, 0.45, 0.94] as const // macOS window open
  },
  SPRING: {
    type: "spring" as const,
    damping: 28,
    stiffness: 320,
    duration: 0.35
  },
  DOCK_HOVER: {
    duration: 0.2,
    ease: [0.25, 0.46, 0.45, 0.94] as const
  },
  GENIE: {
    duration: 0.8,
    ease: [0.23, 1, 0.32, 1] as const // Authentic genie effect
  }
} as const

// Dock configuration - frozen for immutability
export const DOCK_CONFIG = Object.freeze({
  iconSize: 64,
  iconMagnification: 84,
  direction: "middle" as const,
  padding: 8,
  borderRadius: 20
})

// Window constraints - using functions to avoid window access during SSR
export const WINDOW_CONSTRAINTS = {
  minX: 0,
  minY: 28, // Account for authentic macOS menu bar height
  getMaxX: () => typeof window !== 'undefined' ? window.innerWidth - 120 : 1080,
  getMaxY: () => typeof window !== 'undefined' ? window.innerHeight - 120 : 680
} as const

// Authentic macOS Design System - Ultra-precise recreation
export const MACOS_DESIGN_SYSTEM = {
  // Typography - Exact San Francisco font specifications
  typography: {
    fontFamily: {
      system: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", system-ui, sans-serif',
      mono: 'ui-monospace, "SF Mono", Monaco, "Cascadia Code", "Roboto Mono", Consolas, "Courier New", monospace',
      // Distinctive font choices for different contexts
      display: '"SF Pro Display", -apple-system, BlinkMacSystemFont, system-ui, sans-serif',
      text: '"SF Pro Text", -apple-system, BlinkMacSystemFont, system-ui, sans-serif'
    },
    fontSize: {
      // Exact macOS text sizes with proper scaling
      largeTitle: '34px',    // 34pt in macOS
      title1: '28px',        // 28pt in macOS  
      title2: '22px',        // 22pt in macOS
      title3: '20px',        // 20pt in macOS
      headline: '17px',      // 17pt in macOS
      body: '17px',          // 17pt in macOS
      callout: '16px',       // 16pt in macOS
      subheadline: '15px',   // 15pt in macOS
      footnote: '13px',      // 13pt in macOS
      caption1: '12px',      // 12pt in macOS
      caption2: '11px',      // 11pt in macOS
      // System-specific sizes
      menuBar: '14px',       // Menu bar text
      windowTitle: '13px',   // Window title bar
      controlLabel: '13px',  // Control labels
      smallSystem: '11px'    // Small system text
    },
    fontWeight: {
      ultraLight: 100,
      thin: 200,
      light: 300,
      regular: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
      heavy: 800,
      black: 900
    },
    lineHeight: {
      tight: 1.2,
      normal: 1.4,
      relaxed: 1.6
    },
    // Authentic macOS letter spacing
    letterSpacing: {
      largeTitle: '0.374px',
      title1: '0.364px', 
      title2: '0.352px',
      title3: '0.38px',
      headline: '-0.408px',
      body: '-0.408px',
      callout: '-0.32px',
      subheadline: '-0.24px',
      footnote: '-0.078px',
      caption1: '0px',
      caption2: '0.066px'
    }
  },
  
  // Authentic macOS Colors - Exact system palette
  colors: {
    // System colors that adapt to light/dark mode
    systemBlue: '#007AFF',
    systemGreen: '#34C759', 
    systemIndigo: '#5856D6',
    systemOrange: '#FF9500',
    systemPink: '#FF2D92',
    systemPurple: '#AF52DE',
    systemRed: '#FF3B30',
    systemTeal: '#5AC8FA',
    systemYellow: '#FFCC00',
    
    // Gray scale - Exact macOS grays
    systemGray: '#8E8E93',
    systemGray2: '#AEAEB2',
    systemGray3: '#C7C7CC',
    systemGray4: '#D1D1D6',
    systemGray5: '#E5E5EA',
    systemGray6: '#F2F2F7',
    
    // Label colors - Semantic text colors
    label: '#000000',
    secondaryLabel: '#3C3C43',
    tertiaryLabel: '#3C3C4399',
    quaternaryLabel: '#3C3C432E',
    
    // Background colors - Layered backgrounds
    systemBackground: '#FFFFFF',
    secondarySystemBackground: '#F2F2F7',
    tertiarySystemBackground: '#FFFFFF',
    
    // Grouped background colors
    systemGroupedBackground: '#F2F2F7',
    secondarySystemGroupedBackground: '#FFFFFF',
    tertiarySystemGroupedBackground: '#F2F2F7',
    
    // Fill colors - For buttons and controls
    systemFill: '#78788033',
    secondarySystemFill: '#78788028',
    tertiarySystemFill: '#7676801E',
    quaternarySystemFill: '#74748014',
    
    // Separator colors
    separator: '#3C3C4336',
    opaqueSeparator: '#C6C6C8',
    
    // Window chrome - Exact macOS window colors
    windowBackground: 'rgba(246, 246, 246, 0.85)',
    controlBackground: 'rgba(255, 255, 255, 0.8)',
    menuBarBackground: 'rgba(246, 246, 246, 0.8)',
    titleBarBackground: 'rgba(236, 236, 236, 0.95)',
    
    // Traffic lights - Exact macOS colors
    trafficLightRed: '#FF5F57',
    trafficLightYellow: '#FFBD2E', 
    trafficLightGreen: '#28CA42',
    
    // Dock - Authentic dock styling
    dockBackground: 'rgba(255, 255, 255, 0.25)',
    dockBorder: 'rgba(255, 255, 255, 0.3)',
    
    // Selection and focus
    selectionBackground: '#007AFF',
    focusRing: '#007AFF'
  },
  
  // Spacing system - 8pt grid with macOS-specific values
  spacing: {
    xs: '4px',    // 0.5 * 8
    sm: '8px',    // 1 * 8
    md: '16px',   // 2 * 8
    lg: '24px',   // 3 * 8
    xl: '32px',   // 4 * 8
    '2xl': '48px', // 6 * 8
    '3xl': '64px', // 8 * 8
    // macOS-specific spacing
    menuBarHeight: '28px',
    titleBarHeight: '28px',
    dockHeight: '68px',
    windowBorderRadius: '10px',
    controlBorderRadius: '6px'
  },
  
  // Border radius - macOS corner radius system
  borderRadius: {
    none: '0px',
    sm: '4px',
    md: '6px',
    lg: '8px',
    xl: '10px',
    '2xl': '12px',
    '3xl': '16px',
    full: '9999px',
    // macOS-specific radius
    window: '10px',
    control: '6px',
    dock: '16px'
  },
  
  // Shadows - Authentic macOS depth system
  shadows: {
    // Window shadows - Multi-layer for authentic depth
    window: `
      0 25px 50px -12px rgba(0, 0, 0, 0.25),
      0 0 0 1px rgba(255, 255, 255, 0.05),
      inset 0 1px 0 rgba(255, 255, 255, 0.1)
    `,
    // Dock shadow - Distinctive dock appearance
    dock: `
      0 8px 32px rgba(0, 0, 0, 0.3),
      inset 0 1px 0 rgba(255, 255, 255, 0.2),
      0 0 0 0.5px rgba(255, 255, 255, 0.3)
    `,
    // Menu bar shadow
    menuBar: `
      0 1px 0 rgba(255, 255, 255, 0.8),
      inset 0 1px 0 rgba(255, 255, 255, 0.5)
    `,
    // Button shadows
    button: '0 1px 3px rgba(0, 0, 0, 0.1)',
    buttonPressed: 'inset 0 1px 2px rgba(0, 0, 0, 0.1)',
    // Card shadows
    card: '0 4px 16px rgba(0, 0, 0, 0.1)',
    cardHover: '0 8px 24px rgba(0, 0, 0, 0.15)',
    // Focus shadow
    focus: '0 0 0 3px rgba(0, 122, 255, 0.3)'
  },
  
  // Backdrop filters - Authentic glass morphism
  blur: {
    none: 'none',
    light: 'blur(20px) saturate(1.8)',
    medium: 'blur(30px) saturate(1.8)', 
    heavy: 'blur(40px) saturate(2.0)',
    // macOS-specific blur levels
    menuBar: 'blur(20px) saturate(1.8)',
    window: 'blur(30px) saturate(1.8)',
    dock: 'blur(30px) saturate(1.8)'
  },
  
  // Animation system - Apple's signature timing
  animations: {
    // Easing curves - Exact Apple specifications
    easing: {
      // Standard easing
      ease: 'cubic-bezier(0.25, 0.1, 0.25, 1)',
      easeIn: 'cubic-bezier(0.42, 0, 1, 1)',
      easeOut: 'cubic-bezier(0, 0, 0.58, 1)',
      easeInOut: 'cubic-bezier(0.42, 0, 0.58, 1)',
      // Apple's signature easing
      appleEase: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      appleSpring: 'cubic-bezier(0.32, 0.72, 0, 1)',
      // Specific use cases
      windowOpen: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      dockHover: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      minimize: 'cubic-bezier(0.32, 0.72, 0, 1)'
    },
    // Duration - Apple's timing standards
    duration: {
      instant: '0ms',
      fast: '150ms',
      normal: '250ms',
      slow: '350ms',
      slower: '500ms',
      // Specific animations
      windowOpen: '350ms',
      dockHover: '200ms',
      minimize: '600ms',
      spotlight: '300ms'
    }
  }
} as const

// Common style objects - hoisted to prevent re-creation
export const COMMON_STYLES = {
  MACOS_FONT: {
    fontFamily: MACOS_DESIGN_SYSTEM.typography.fontFamily.system
  },
  GLASS_MORPHISM: {
    backdropFilter: MACOS_DESIGN_SYSTEM.blur.light,
    WebkitBackdropFilter: MACOS_DESIGN_SYSTEM.blur.light
  },
  WINDOW_CHROME: {
    background: MACOS_DESIGN_SYSTEM.colors.windowBackground,
    backdropFilter: MACOS_DESIGN_SYSTEM.blur.medium,
    WebkitBackdropFilter: MACOS_DESIGN_SYSTEM.blur.medium,
    boxShadow: MACOS_DESIGN_SYSTEM.shadows.window
  },
  MENU_BAR: {
    background: MACOS_DESIGN_SYSTEM.colors.menuBarBackground,
    backdropFilter: MACOS_DESIGN_SYSTEM.blur.light,
    WebkitBackdropFilter: MACOS_DESIGN_SYSTEM.blur.light,
    boxShadow: MACOS_DESIGN_SYSTEM.shadows.menuBar
  }
} as const