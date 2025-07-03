import * as React from "react"

const Alert = React.forwardRef(({ className, variant, ...props }, ref) => {
  const baseStyle = "relative w-full rounded-lg border p-4"
  
  const variants = {
    default: "border-gray-300 bg-white text-gray-900",
    destructive: "border-red-500 bg-red-50 text-red-900",
    glass: "bg-white/10 backdrop-blur-md border-white/20 text-white",
  }
  
  const variantStyle = variants[variant] || variants.default
  
  return (
    <div
      ref={ref}
      role="alert"
      className={`${baseStyle} ${variantStyle} ${className || ''}`}
      style={{
        background: 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(16px)',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        borderRadius: '0.75rem',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
        color: 'white'
      }}
      {...props}
    />
  )
})
Alert.displayName = "Alert"

const AlertTitle = React.forwardRef(({ className, ...props }, ref) => (
  <h5
    ref={ref}
    className={`mb-1 font-medium leading-none tracking-tight ${className || ''}`}
    {...props}
  />
))
AlertTitle.displayName = "AlertTitle"

const AlertDescription = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={`text-sm ${className || ''}`}
    {...props}
  />
))
AlertDescription.displayName = "AlertDescription"

export { Alert, AlertTitle, AlertDescription }
