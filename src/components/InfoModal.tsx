import { X } from 'lucide-react'
import type { ReactNode } from 'react'

export function InfoModal({
  title,
  onClose,
  children,
}: {
  title: string
  onClose: () => void
  children: ReactNode
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <button aria-label="Close" onClick={onClose} className="absolute inset-0 bg-charcoal/60" />
      <div className="relative bg-cream rounded-2xl max-w-lg w-full max-h-[85vh] overflow-y-auto shadow-xl">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gold/30 sticky top-0 bg-cream">
          <h2 className="font-display text-xl font-bold text-burgundy-dark">{title}</h2>
          <button onClick={onClose} aria-label="Close" className="p-1 hover:text-burgundy">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="px-6 py-5 text-sm text-charcoal/80 space-y-3 leading-relaxed">
          {children}
        </div>
      </div>
    </div>
  )
}
