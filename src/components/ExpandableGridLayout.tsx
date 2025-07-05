import React, { useState, ReactNode } from 'react'
import { Responsive, WidthProvider, Layout } from 'react-grid-layout'
import { motion, AnimatePresence } from 'framer-motion'
import { quantumTheme as theme } from '../theme/quantum'
import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'

const ResponsiveGridLayout = WidthProvider(Responsive)

interface ExpandableWidget {
  id: string
  title: string
  icon?: ReactNode
  fullContent: ReactNode
  summaryContent: ReactNode
  defaultExpanded?: boolean
  minW?: number
  minH?: number
  defaultW?: number
  defaultH?: number
}

interface ExpandableGridLayoutProps {
  widgets: ExpandableWidget[]
  tabId: string
}

export function ExpandableGridLayout({ widgets, tabId }: ExpandableGridLayoutProps) {
  // Track expanded state for each widget
  const [expandedWidgets, setExpandedWidgets] = useState<Set<string>>(() => {
    const saved = localStorage.getItem(`gzc-expanded-${tabId}`)
    if (saved) {
      return new Set(JSON.parse(saved))
    }
    return new Set(widgets.filter(w => w.defaultExpanded).map(w => w.id))
  })

  // Track fullscreen widget
  const [fullscreenWidget, setFullscreenWidget] = useState<string | null>(null)

  // Grid layouts with persistence
  const [layouts, setLayouts] = useState<any>(() => {
    try {
      const saved = localStorage.getItem(`gzc-layouts-${tabId}`)
      return saved ? JSON.parse(saved) : {}
    } catch {
      return {}
    }
  })

  // Generate default layout
  const defaultLayout: Layout[] = widgets.map((widget, index) => ({
    i: widget.id,
    x: (index % 3) * 4,
    y: Math.floor(index / 3) * 3,
    w: widget.defaultW || 4,
    h: expandedWidgets.has(widget.id) ? (widget.defaultH || 4) : 1,
    minW: widget.minW || 2,
    minH: 1
  }))

  const toggleExpanded = (widgetId: string) => {
    setExpandedWidgets(prev => {
      const newSet = new Set(prev)
      if (newSet.has(widgetId)) {
        newSet.delete(widgetId)
      } else {
        newSet.add(widgetId)
      }
      localStorage.setItem(`gzc-expanded-${tabId}`, JSON.stringify(Array.from(newSet)))
      return newSet
    })
  }

  const toggleFullscreen = (widgetId: string) => {
    setFullscreenWidget(fullscreenWidget === widgetId ? null : widgetId)
  }

  const handleLayoutChange = (layout: Layout[], allLayouts: any) => {
    setLayouts(allLayouts)
    localStorage.setItem(`gzc-layouts-${tabId}`, JSON.stringify(allLayouts))
  }

  // Fullscreen overlay
  if (fullscreenWidget) {
    const widget = widgets.find(w => w.id === fullscreenWidget)
    if (widget) {
      return (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: theme.background,
            zIndex: 1000,
            padding: '16px',
            overflow: 'auto'
          }}
        >
          <div style={{
            background: theme.surface,
            borderRadius: '12px',
            border: `1px solid ${theme.border}`,
            height: '100%',
            display: 'flex',
            flexDirection: 'column'
          }}>
            {/* Fullscreen Header */}
            <div style={{
              background: theme.surfaceAlt,
              padding: '16px',
              borderBottom: `1px solid ${theme.border}`,
              borderRadius: '12px 12px 0 0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                {widget.icon}
                <h3 style={{ fontSize: '16px', fontWeight: '600', color: theme.text }}>
                  {widget.title}
                </h3>
              </div>
              <button
                onClick={() => toggleFullscreen(widget.id)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: theme.textSecondary,
                  cursor: 'pointer',
                  fontSize: '14px'
                }}
              >
                ✕ Close
              </button>
            </div>
            {/* Fullscreen Content */}
            <div style={{ flex: 1, padding: '16px', overflow: 'auto' }}>
              {widget.fullContent}
            </div>
          </div>
        </motion.div>
      )
    }
  }

  return (
    <div style={{ 
      height: '100%',
      width: '100%',
      background: theme.background,
      padding: '16px',
      overflow: 'auto'
    }}>
      <ResponsiveGridLayout
        className="layout"
        layouts={layouts}
        onLayoutChange={handleLayoutChange}
        breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
        cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
        rowHeight={80}
        isDraggable={true}
        isResizable={true}
        margin={[12, 12]}
        containerPadding={[0, 0]}
        compactType="vertical"
        draggableHandle=""
        draggableCancel=""
      >
        {widgets.map(widget => {
          const isExpanded = expandedWidgets.has(widget.id)
          
          return (
            <div key={widget.id} data-grid={{
              ...defaultLayout.find(l => l.i === widget.id),
              h: isExpanded ? (widget.defaultH || 4) : 1
            }}>
              <motion.div
                layout
                animate={{
                  height: '100%'
                }}
                style={{
                  background: theme.surface,
                  border: `1px solid ${theme.border}`,
                  borderRadius: '8px',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  height: '100%'
                }}
                whileHover={{ boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}
              >
                {/* Widget Header - Always visible */}
                <div style={{
                  background: theme.surfaceAlt,
                  padding: '12px 16px',
                  borderBottom: isExpanded ? `1px solid ${theme.border}` : 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  minHeight: '48px',
                  cursor: 'pointer'
                }}
                onClick={() => toggleExpanded(widget.id)}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1 }}>
                    {widget.icon}
                    <h4 style={{ fontSize: '13px', fontWeight: '600', color: theme.text }}>
                      {widget.title}
                    </h4>
                    
                    {/* Summary content when collapsed */}
                    {!isExpanded && (
                      <div style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: '16px',
                        marginLeft: '24px',
                        flex: 1
                      }}>
                        {widget.summaryContent}
                      </div>
                    )}
                  </div>
                  
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    {isExpanded && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          toggleFullscreen(widget.id)
                        }}
                        style={{
                          background: 'transparent',
                          border: 'none',
                          color: theme.textSecondary,
                          cursor: 'pointer',
                          padding: '4px',
                          fontSize: '12px'
                        }}
                        title="Fullscreen"
                      >
                        ⛶
                      </button>
                    )}
                    <motion.div
                      animate={{ rotate: isExpanded ? 180 : 0 }}
                      style={{ color: theme.textSecondary, fontSize: '12px' }}
                    >
                      ▼
                    </motion.div>
                  </div>
                </div>

                {/* Widget Content - Only visible when expanded */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      style={{
                        flex: 1,
                        padding: '16px',
                        overflow: 'auto'
                      }}
                    >
                      {widget.fullContent}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </div>
          )
        })}
      </ResponsiveGridLayout>

      <style>{`
        .react-grid-item {
          transition: all 200ms ease;
          transition-property: left, top, width, height;
          cursor: grab;
        }
        .react-grid-item:active {
          cursor: grabbing;
        }
        .react-grid-item.cssTransforms {
          transition-property: transform, width, height;
        }
        .react-grid-item.resizing {
          z-index: 1;
          will-change: width, height;
        }
        .react-grid-item.react-draggable-dragging {
          transition: none;
          z-index: 3;
          will-change: transform;
          cursor: grabbing !important;
        }
        .react-grid-item.react-grid-placeholder {
          background: ${theme.primary};
          opacity: 0.2;
          transition-duration: 100ms;
          z-index: 2;
          border-radius: 8px;
        }
        .react-resizable-handle {
          background-image: none;
          position: absolute;
          width: 20px;
          height: 20px;
          bottom: 0;
          right: 0;
          cursor: se-resize;
        }
        .react-resizable-handle::after {
          content: '';
          position: absolute;
          right: 3px;
          bottom: 3px;
          width: 5px;
          height: 5px;
          border-right: 2px solid ${theme.primary};
          border-bottom: 2px solid ${theme.primary};
        }
      `}</style>
    </div>
  )
}