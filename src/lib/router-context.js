import { createContext, useContext } from 'react'

/*
 * Context and hook live apart from the Router component so this file exports
 * no components, which is what keeps fast refresh working.
 */

export const RouterContext = createContext(null)

export function useRouter() {
  const context = useContext(RouterContext)
  if (!context) {
    throw new Error('useRouter must be used inside <Router>')
  }
  return context
}
