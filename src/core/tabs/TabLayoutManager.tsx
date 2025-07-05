import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { TabManager, setupConsoleHelpers } from './TabUtils'
import { useUserSettings } from '../../hooks/useUserSettings'

// Tab configuration types
export interface TabConfig {
  id: string
  name: string
  component: string // Component identifier to load
  icon?: string
  closable?: boolean
  props?: Record<string, any>
  gridLayoutEnabled?: boolean // Enable fluid grid layout for this tab
  gridLayout?: any[] // Store react-grid-layout configuration
}

export interface TabLayout {
  id: string
  name: string
  tabs: TabConfig[]
  isDefault?: boolean
  createdAt: string
  updatedAt: string
}

interface TabLayoutContextValue {
  // Current state
  currentLayout: TabLayout | null
  activeTabId: string | null
  
  // Layout management
  layouts: TabLayout[]
  defaultLayout: TabLayout | null
  userLayouts: TabLayout[]
  
  // Actions
  setActiveTab: (tabId: string) => void
  addTab: (tab: Omit<TabConfig, 'id'>) => TabConfig
  removeTab: (tabId: string) => void
  updateTab: (tabId: string, updates: Partial<TabConfig>) => void
  reorderTabs: (newTabs: TabConfig[]) => void
  
  // Layout actions
  saveCurrentLayout: (name: string) => void
  loadLayout: (layoutId: string) => void
  deleteLayout: (layoutId: string) => void
  resetToDefault: () => void
  
  // Grid layout actions
  updateTabGridLayout: (tabId: string, gridLayout: any[]) => void
  toggleTabGridLayout: (tabId: string, enabled: boolean) => void
}

// Default tabs configuration - Portfolio and Analytics
const DEFAULT_TABS: TabConfig[] = [
  {
    id: 'portfolio',
    name: 'Portfolio',
    component: 'Portfolio',
    icon: 'briefcase',
    closable: false
  },
  {
    id: 'analytics',
    name: 'Analytics',
    component: 'Analytics',
    icon: 'bar-chart-2',
    closable: false,
    gridLayoutEnabled: true
  }
]

const DEFAULT_LAYOUT: TabLayout = {
  id: 'default',
  name: 'Default Layout',
  tabs: DEFAULT_TABS,
  isDefault: true,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString()
}

const TabLayoutContext = createContext<TabLayoutContextValue | undefined>(undefined)

export function useTabLayout() {
  const context = useContext(TabLayoutContext)
  if (!context) {
    throw new Error('useTabLayout must be used within TabLayoutProvider')
  }
  return context
}

interface TabLayoutProviderProps {
  children: ReactNode
}

export function TabLayoutProvider({ children }: TabLayoutProviderProps) {
  const [layouts, setLayouts] = useState<TabLayout[]>([DEFAULT_LAYOUT])
  const [currentLayout, setCurrentLayout] = useState<TabLayout>(DEFAULT_LAYOUT)
  const [activeTabId, setActiveTabId] = useState<string>('portfolio')

  // Load saved layouts from localStorage on mount
  useEffect(() => {
    const savedLayouts = localStorage.getItem('gzc-intel-layouts')
    if (savedLayouts) {
      try {
        const parsed = JSON.parse(savedLayouts)
        setLayouts([DEFAULT_LAYOUT, ...parsed])
      } catch (e) {
        console.error('Failed to load saved layouts:', e)
      }
    }

    // Load last active layout
    const lastLayoutId = localStorage.getItem('gzc-intel-active-layout')
    if (lastLayoutId && lastLayoutId !== 'default') {
      const savedLayout = layouts.find(l => l.id === lastLayoutId)
      if (savedLayout) {
        setCurrentLayout(savedLayout)
      }
    }
  }, [])

  // Save layouts to localStorage whenever they change
  useEffect(() => {
    const userLayouts = layouts.filter(l => !l.isDefault)
    localStorage.setItem('gzc-intel-layouts', JSON.stringify(userLayouts))
  }, [layouts])

  // Save current layout ID
  useEffect(() => {
    localStorage.setItem('gzc-intel-active-layout', currentLayout.id)
  }, [currentLayout.id])

  const defaultLayout = layouts.find(l => l.isDefault) || DEFAULT_LAYOUT
  const userLayouts = layouts.filter(l => !l.isDefault)

  const addTab = (tab: Omit<TabConfig, 'id'>) => {
    const newTab: TabConfig = {
      ...tab,
      id: uuidv4()
    }
    
    const updatedLayout = {
      ...currentLayout,
      tabs: [...currentLayout.tabs, newTab],
      updatedAt: new Date().toISOString()
    }
    
    setCurrentLayout(updatedLayout)
    
    // Update in layouts array if it's a saved layout
    if (!currentLayout.isDefault) {
      setLayouts(layouts.map(l => l.id === currentLayout.id ? updatedLayout : l))
    }
    
    // Set as active tab
    setActiveTabId(newTab.id)
    
    // Return the new tab
    return newTab
  }

  // Initialize TabManager with addTab function
  useEffect(() => {
    TabManager.setAddTabFunction(addTab)
    setupConsoleHelpers()
  }, [])

  const removeTab = (tabId: string) => {
    // Don't allow removing the last tab or non-closable tabs
    const tab = currentLayout.tabs.find(t => t.id === tabId)
    if (!tab || tab.closable === false || currentLayout.tabs.length === 1) {
      return
    }
    
    const updatedTabs = currentLayout.tabs.filter(t => t.id !== tabId)
    const updatedLayout = {
      ...currentLayout,
      tabs: updatedTabs,
      updatedAt: new Date().toISOString()
    }
    
    setCurrentLayout(updatedLayout)
    
    // Update in layouts array if it's a saved layout
    if (!currentLayout.isDefault) {
      setLayouts(layouts.map(l => l.id === currentLayout.id ? updatedLayout : l))
    }
    
    // If we removed the active tab, switch to first available
    if (activeTabId === tabId && updatedTabs.length > 0) {
      setActiveTabId(updatedTabs[0].id)
    }
  }

  const updateTab = (tabId: string, updates: Partial<TabConfig>) => {
    const updatedLayout = {
      ...currentLayout,
      tabs: currentLayout.tabs.map(t => 
        t.id === tabId ? { ...t, ...updates } : t
      ),
      updatedAt: new Date().toISOString()
    }
    
    setCurrentLayout(updatedLayout)
    
    // Update in layouts array if it's a saved layout
    if (!currentLayout.isDefault) {
      setLayouts(layouts.map(l => l.id === currentLayout.id ? updatedLayout : l))
    }
  }

  const saveCurrentLayout = (name: string) => {
    const newLayout: TabLayout = {
      id: uuidv4(),
      name,
      tabs: currentLayout.tabs,
      isDefault: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    
    setLayouts([...layouts, newLayout])
    setCurrentLayout(newLayout)
  }

  const loadLayout = (layoutId: string) => {
    const layout = layouts.find(l => l.id === layoutId)
    if (layout) {
      setCurrentLayout(layout)
      // Set first tab as active
      if (layout.tabs.length > 0) {
        setActiveTabId(layout.tabs[0].id)
      }
    }
  }

  const deleteLayout = (layoutId: string) => {
    // Can't delete default layout
    const layout = layouts.find(l => l.id === layoutId)
    if (!layout || layout.isDefault) {
      return
    }
    
    setLayouts(layouts.filter(l => l.id !== layoutId))
    
    // If we deleted the current layout, switch to default
    if (currentLayout.id === layoutId) {
      setCurrentLayout(defaultLayout)
      setActiveTabId(defaultLayout.tabs[0]?.id || '')
    }
  }

  const resetToDefault = () => {
    setCurrentLayout(defaultLayout)
    setActiveTabId(defaultLayout.tabs[0]?.id || '')
  }

  const reorderTabs = (newTabs: TabConfig[]) => {
    const updatedLayout = {
      ...currentLayout,
      tabs: newTabs,
      updatedAt: new Date().toISOString()
    }
    
    setCurrentLayout(updatedLayout)
    
    // Update in layouts array if it's a saved layout
    if (!currentLayout.isDefault) {
      setLayouts(layouts.map(l => l.id === currentLayout.id ? updatedLayout : l))
    }
  }

  const updateTabGridLayout = (tabId: string, gridLayout: any[]) => {
    const updatedLayout = {
      ...currentLayout,
      tabs: currentLayout.tabs.map(t => 
        t.id === tabId ? { ...t, gridLayout } : t
      ),
      updatedAt: new Date().toISOString()
    }
    
    setCurrentLayout(updatedLayout)
    
    // Update in layouts array if it's a saved layout
    if (!currentLayout.isDefault) {
      setLayouts(layouts.map(l => l.id === currentLayout.id ? updatedLayout : l))
    }
  }

  const toggleTabGridLayout = (tabId: string, enabled: boolean) => {
    const updatedLayout = {
      ...currentLayout,
      tabs: currentLayout.tabs.map(t => 
        t.id === tabId ? { ...t, gridLayoutEnabled: enabled } : t
      ),
      updatedAt: new Date().toISOString()
    }
    
    setCurrentLayout(updatedLayout)
    
    // Update in layouts array if it's a saved layout
    if (!currentLayout.isDefault) {
      setLayouts(layouts.map(l => l.id === currentLayout.id ? updatedLayout : l))
    }
  }

  const value: TabLayoutContextValue = {
    currentLayout,
    activeTabId,
    layouts,
    defaultLayout,
    userLayouts,
    setActiveTab: setActiveTabId,
    addTab,
    removeTab,
    updateTab,
    reorderTabs,
    saveCurrentLayout,
    loadLayout,
    deleteLayout,
    resetToDefault,
    updateTabGridLayout,
    toggleTabGridLayout
  }

  return (
    <TabLayoutContext.Provider value={value}>
      {children}
    </TabLayoutContext.Provider>
  )
}