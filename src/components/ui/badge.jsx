import * as React from "react"

function Badge({ className, variant, children, ...props }) {
  const variants = {
    default: "bg-blue-600 text-white",
    secondary: "bg-gray-200 text-gray-900", 
    destructive: "bg-red-600 text-white",
    outline: "border border-gray-300 text-gray-700",
    glass: "bg-white/10 backdrop-blur-md border border-white/20 text-white",
  }
  
  const variantClass = variants[variant] || variants.default
  
  return (
    <div 
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors ${variantClass} ${className || ''}`} 
      {...props}
    >
      {children}
    </div>
  )
}

export { Badge }
