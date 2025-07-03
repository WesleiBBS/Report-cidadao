import * as React from "react"

const TabsContext = React.createContext()

const Tabs = ({ defaultValue, value, onValueChange, children, ...props }) => {
  const [activeTab, setActiveTab] = React.useState(value || defaultValue)
  
  const handleTabChange = (newValue) => {
    setActiveTab(newValue)
    onValueChange?.(newValue)
  }
  
  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab: handleTabChange }}>
      <div {...props}>
        {children}
      </div>
    </TabsContext.Provider>
  )
}

const TabsList = React.forwardRef(({ className, children, ...props }, ref) => (
  <div
    ref={ref}
    className={`inline-flex h-10 items-center justify-center rounded-md p-1 ${className || ''}`}
    style={{
      background: 'rgba(255, 255, 255, 0.1)',
      backdropFilter: 'blur(8px)',
      border: '1px solid rgba(255, 255, 255, 0.2)',
    }}
    {...props}
  >
    {children}
  </div>
))
TabsList.displayName = "TabsList"

const TabsTrigger = React.forwardRef(({ className, value, children, ...props }, ref) => {
  const { activeTab, setActiveTab } = React.useContext(TabsContext)
  const isActive = activeTab === value
  
  return (
    <button
      ref={ref}
      className={`inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium transition-all ${className || ''}`}
      style={{
        ...(isActive ? {
          background: 'linear-gradient(45deg, #f97316, #ef4444)',
          color: 'white',
          boxShadow: '0 2px 8px rgba(249, 115, 22, 0.3)'
        } : {
          background: 'transparent',
          color: 'rgba(255, 255, 255, 0.7)',
        })
      }}
      onClick={() => setActiveTab(value)}
      {...props}
    >
      {children}
    </button>
  )
})
TabsTrigger.displayName = "TabsTrigger"

const TabsContent = React.forwardRef(({ className, value, children, ...props }, ref) => {
  const { activeTab } = React.useContext(TabsContext)
  
  if (activeTab !== value) return null
  
  return (
    <div
      ref={ref}
      className={`mt-2 ${className || ''}`}
      {...props}
    >
      {children}
    </div>
  )
})
TabsContent.displayName = "TabsContent"

export { Tabs, TabsList, TabsTrigger, TabsContent }
