import * as React from "react"

const Button = React.forwardRef(({ className, variant, size, asChild = false, children, ...props }, ref) => {
  const baseStyle = "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
  
  const variants = {
    default: "bg-blue-600 text-white hover:bg-blue-700",
    destructive: "bg-red-600 text-white hover:bg-red-700",
    outline: "border border-gray-300 bg-transparent hover:bg-gray-100",
    secondary: "bg-gray-200 text-gray-900 hover:bg-gray-300",
    ghost: "hover:bg-gray-100",
    link: "text-blue-600 underline-offset-4 hover:underline",
    glass: "bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20",
    gradient: "bg-gradient-to-r from-orange-500 to-red-500 text-white hover:from-orange-600 hover:to-red-600 shadow-lg",
  }
  
  const sizes = {
    default: "h-10 px-4 py-2",
    sm: "h-9 rounded-md px-3",
    lg: "h-11 rounded-md px-8",
    icon: "h-10 w-10",
  }
  
  const variantClass = variants[variant] || variants.default
  const sizeClass = sizes[size] || sizes.default
  
  return (
    <button
      className={`${baseStyle} ${variantClass} ${sizeClass} ${className || ''}`}
      ref={ref}
      {...props}
    >
      {children}
    </button>
  )
})
Button.displayName = "Button"

export { Button }
