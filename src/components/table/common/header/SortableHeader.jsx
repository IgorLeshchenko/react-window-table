import React from 'react'
import { SortableElement } from 'react-sortable-hoc'

const SortableHeader = SortableElement(({ children, ...props }) => React.cloneElement(children, props))

export default SortableHeader
