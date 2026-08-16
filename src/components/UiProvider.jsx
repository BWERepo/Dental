import { useMemo, useState } from 'react'
import { UiContext } from '../lib/ui-state'

/** Holds which floating panel is open. See lib/ui-state.js for the hooks. */
export default function UiProvider({ children }) {
  const [openPanel, setOpenPanel] = useState(null)

  const value = useMemo(
    () => ({
      openPanel,
      isOpen: (name) => openPanel === name,
      open: (name) => setOpenPanel(name),
      close: () => setOpenPanel(null),
    }),
    [openPanel],
  )

  return <UiContext.Provider value={value}>{children}</UiContext.Provider>
}
