'use client'

import { AlertTriangle, Home } from 'lucide-react'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html>
      <body>
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-orange-50">
          <div className="text-center px-4">
            <div className="mb-8">
              <div className="inline-flex items-center justify-center w-24 h-24 bg-red-100 rounded-full mb-4">
                <AlertTriangle className="w-12 h-12 text-red-500" />
              </div>
              
              <h1 className="text-4xl font-bold text-gray-800 mb-2">
                Critical Error
              </h1>
              
              <p className="text-gray-600 mb-2">
                A critical error occurred. Please refresh the page or contact support.
              </p>
              
              {error.digest && (
                <p className="text-sm text-gray-500 font-mono">
                  Error ID: {error.digest}
                </p>
              )}
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={reset}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors font-medium"
              >
                Reload Page
              </button>
              
              <a
                href="/"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg transition-colors font-medium"
              >
                <Home className="w-5 h-5" />
                Go Home
              </a>
            </div>
          </div>
        </div>
      </body>
    </html>
  )
}
