import React from 'react'

export default function Modal({ children, open, onClose }: { children: React.ReactNode; open: boolean; onClose: () => void }){
  if (!open) return null
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="bg-white rounded-lg p-4 z-10 w-full max-w-md">{children}</div>
    </div>
  )
}