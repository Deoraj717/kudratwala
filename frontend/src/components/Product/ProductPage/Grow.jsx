import React from 'react'
import { useOutletContext } from 'react-router-dom'

function Grow() {
  const {product} = useOutletContext();
  return (
    <div>{product.tips}</div>
  )
}

export default Grow