// Dock app icon components
import { MacFolderIcon, MacSafariIcon, MacTrashIcon, MacCalendarIcon, MacMailIcon, MacDocumentsIcon } from "@/components/icons"

export const FinderIcon = () => (
  <div className="w-14 h-14 rounded-xl overflow-hidden shadow-lg">
    <MacFolderIcon size={56} className="w-full h-full" />
  </div>
)

export const SafariIcon = () => (
  <div className="w-14 h-14 rounded-xl overflow-hidden shadow-lg">
    <MacSafariIcon size={56} className="w-full h-full" />
  </div>
)

export const MailIcon = () => (
  <div className="w-14 h-14 rounded-xl overflow-hidden shadow-lg">
    <MacMailIcon size={56} className="w-full h-full" />
  </div>
)

export const CalendarIcon = () => (
  <div className="w-14 h-14 rounded-xl overflow-hidden shadow-lg">
    <MacCalendarIcon size={56} day={24} className="w-full h-full" />
  </div>
)

export const NotesIcon = () => (
  <div className="w-14 h-14 rounded-xl overflow-hidden shadow-lg">
    <img
      src="/notes_macos_bigsur_icon_189901-removebg-preview.png"
      alt="Notes"
      className="w-full h-full object-cover"
      draggable={false}
    />
  </div>
)

export const DocumentsIcon = () => (
  <div className="w-14 h-14 rounded-xl overflow-hidden shadow-lg">
    <MacDocumentsIcon size={56} className="w-full h-full" />
  </div>
)

export const NotionIcon = () => (
  <div className="w-14 h-14 rounded-xl overflow-hidden shadow-lg">
    <img
      src="/02a016568a1a55c287f7ee70ce1b7a61-removebg-preview.png"
      alt="Notion"
      className="w-full h-full object-cover"
      draggable={false}
    />
  </div>
)

export const TrashIcon = () => (
  <div className="w-14 h-14 rounded-xl overflow-hidden shadow-lg">
    <MacTrashIcon size={56} className="w-full h-full" />
  </div>
)