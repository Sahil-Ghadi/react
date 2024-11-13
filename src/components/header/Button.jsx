import React from 'react'

const Button = ({
    children,
    type = 'button',
    bgColor = 'bg-blue-600',
    textColor = 'text-white',
    clssname = '',
    ...props

}) => {
  return (
   <button className={`px-4 py-2 rounded-lg ${classname}  ${bgColor}  ${textColor} `} {...props}>
    {children}
    </button>
  )
}

export default Button
