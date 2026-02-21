import { ImageResponse } from 'next/og'

// Image metadata
export const alt = 'macOS Portfolio - Interactive Experience'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

// Image generation
export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 60,
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontFamily: 'system-ui, -apple-system, sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: 20 }}>
          <div
            style={{
              width: 80,
              height: 80,
              borderRadius: 20,
              background: 'rgba(255, 255, 255, 0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: 20,
              fontSize: 48,
            }}
          >
            🖥️
          </div>
          <div style={{ fontSize: 72, fontWeight: 'bold' }}>macOS Portfolio</div>
        </div>
        <div style={{ fontSize: 32, opacity: 0.9 }}>
          Interactive Experience
        </div>
        <div style={{ fontSize: 24, opacity: 0.7, marginTop: 20 }}>
          Modern Web Development Showcase
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
