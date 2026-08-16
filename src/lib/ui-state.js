import { createContext, useCallback, useContext } from 'react'

/*
 * A very small amount of shared UI state: which floating panel is open.
 * It exists so the contact dock can open the text panel without either
 * component knowing about the other, and without prop-drilling through App.
 *
 * The context and its hooks live here rather than beside the provider so that
 * this file exports no components — which is what keeps fast refresh working.
 */

export const UiContext = createContext(null)

export function useUi() {
  const context = useContext(UiContext)
  if (!context) {
    throw new Error('useUi must be used inside <UiProvider>')
  }
  return context
}

/** Convenience hook for a single named panel. */
export function usePanel(name) {
  const { isOpen, open, close } = useUi()
  return {
    open: isOpen(name),
    onOpen: useCallback(() => open(name), [open, name]),
    onClose: close,
  }
}
