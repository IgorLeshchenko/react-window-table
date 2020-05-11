import { useEffect, useRef } from 'react'

// Invalidate the styles cache anytime `data` change
export const useResetCache = data => {
  const ref = useRef()

  useEffect(() => {
    if (ref.current) {
      ref.current.resetAfterIndex(0)
    }
  }, [data])

  return ref
}
