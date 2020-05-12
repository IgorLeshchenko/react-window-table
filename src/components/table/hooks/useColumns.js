import { useEffect, useRef } from 'react'


const useColumns = columns => {
  const ref = useRef()

  useEffect(() => {
    if (ref.current) {
      ref.current.resetAfterIndex(0)
    }
  }, [data])

  return ref
}

export default useColumns
