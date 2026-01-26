import React from 'react'

const Car = ({make, model, year, price}) => {
  return (
    <div>
        <h3>{make} {model}</h3>
        <p>Year: {year}</p>
        <p>Price: {price}</p>
    </div>
  )
}

export default Car