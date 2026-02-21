// Shared types for the macOS portfolio application

export interface FolderData {
  id: string
  name: string
  x: number
  y: number
  windowId: string
}

export interface WindowState {
  id: string
  state: 'open' | 'minimized' | 'closed'
}

export type WindowStateType = 'open' | 'minimized' | 'closed'

export interface ImageFile {
  name: string
  path: string
  size: string
  type: string
}

export interface DocumentFile {
  name: string
  path: string
  size: string
  type: string
}

export type FileItem = ImageFile | DocumentFile

export type ViewMode = 'icon' | 'list' | 'column'

export interface AppConfig {
  id: string
  name: string
  icon: React.ComponentType
}

// Window Manager Props
export interface WindowManagerProps {
  openWindows: string[]
  onClose: (id: string) => void
  onMinimize: (id: string) => void
}

// Dock Props
export interface DockProps {
  onAppClick: (appId: string) => void
  minimizedWindows: string[]
  getWindowState: (id: string) => WindowStateType
}

// MacFinder Props
export interface MacFinderProps {
  onClose: () => void
  onMinimize?: () => void
}

// Folder Props
export interface FolderProps {
  name: string
  x: number
  y: number
  onClick: () => void
  onDrag?: (id: string, x: number, y: number) => void
  id: string
}// MacNo
tes Props
export interface MacNotesProps {
  onClose: () => void
  onMinimize?: () => void
  className?: string
}/
/ MacSafari Props
export interface MacSafariProps {
  onClose: () => void
  onMinimize?: () => void
  className?: string
}

// MacMail Props
export interface MacMailProps {
  onClose: () => void
  onMinimize?: () => void
  className?: string
}

// MacTrash Props
export interface MacTrashProps {
  onClose: () => void
  onMinimize?: () => void
  className?: string
}// MacDoc
uments Props
export interface MacDocumentsProps {
  onClose: () => void
  onMinimize?: () => void
  className?: string
}