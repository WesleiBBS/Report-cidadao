import * as React from "react"

const Input = React.forwardRef(({ className, type, ...props }, ref) => {
  const baseStyle = "flex h-10 w-full rounded-md px-3 py-2 text-sm transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
  
  return (
    <input
      type={type}
      className={`${baseStyle} ${className || ''}`}
      style={{
        background: 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(8px)',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        color: 'white',
        borderRadius: '0.5rem',
        ...props.style
      }}
      ref={ref}
      {...props}
    />
  )
})
Input.displayName = "Input"

export { Input }
