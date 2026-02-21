import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'macOS Portfolio - Interactive Experience',
    short_name: 'macOS Portfolio',
    description: 'An interactive macOS-style portfolio showcasing modern web development skills',
    start_url: '/',
    display: 'standalone',
    background_color: '#f5f5f7',
    theme_color: '#007AFF',
    icons: [
      {
        src: '/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  }
}
